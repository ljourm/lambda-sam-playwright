import fs from "fs";
import yaml from "js-yaml";
import ejs from "ejs";
import { WebClient } from "@slack/web-api";
import { getSafeEnv } from "@/lib/env";

type SlackMessageKey = "success" | "test" | "unknown";
type SlackMessage = {
  channel: string;
  srcText: string;
};
type SlackMessages = Record<SlackMessageKey, SlackMessage>;

// SNSメッセージの型は何が来るかわからないためanyを許容する
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SnsMessage = any;

const YAML_FILE_PATH = "./message.yml";

const getMessageConfigs = (): SlackMessages => {
  const fileContents = fs.readFileSync(YAML_FILE_PATH, "utf8");
  return yaml.load(fileContents) as SlackMessages;
};

export const getMessageType = (snsMessage: SnsMessage): SlackMessageKey => {
  try {
    const record = snsMessage["Records"][0]; // 1件目で判定する

    if (record["eventSource"] === "aws:s3") {
      return "success";
    }

    return "unknown";
  } catch {
    return "unknown";
  }
};

export const sendToSlack = async (
  slackMessageType: SlackMessageKey,
  snsMessage: SnsMessage,
): Promise<void> => {
  const { srcText, channel } = getMessageConfigs()[slackMessageType];
  const text = ejs.render(srcText, snsMessage);

  console.log("Sending Slack message", { channel, text });

  const slackNoSend = getSafeEnv("SLACK_NO_SEND") === "true";
  if (slackNoSend) {
    console.log("SLACK_NO_SEND is true, skipping sending message");
    return;
  }

  const slackToken = getSafeEnv("SLACK_TOKEN");
  const webClient = new WebClient(slackToken);

  await webClient.chat.postMessage({
    channel,
    text,
  });

  console.log("Sent Slack message");
};
