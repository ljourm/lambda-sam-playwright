import ejs from "ejs";
import type { APIGatewayProxyResult } from "aws-lambda";
import { message as slackMessageTemplate } from "./templates/notification";
import { WebClient } from "@slack/web-api";

/**
 * Get Slack Bot Token from environment variables
 */
const getSlackToken = (): string | undefined => {
  return process.env.SLACK_BOT_TOKEN;
};

/**
 * Get Slack Channel ID from environment variables
 */
const getSlackChannel = (): string | undefined => {
  return process.env.SLACK_CHANNEL_ID;
};

/**
 * Render Slack message using EJS template
 */
const renderSlackMessage = (userName = "太郎", items = ["商品A", "商品B"]) => {
  return ejs.render(slackMessageTemplate, { userName, items });
};

/**
 * Send notification to Slack using @slack/web-api
 */
const sendSlackNotification = async (
  token: string,
  channel: string,
  text: string,
) => {
  const web = new WebClient(token);
  return await web.chat.postMessage({ channel, text });
};

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const token = getSlackToken();
  const channel = getSlackChannel();
  if (!token || !channel) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID env variable",
      }),
    };
  }

  const userName = process.env.SLACK_USER_NAME ?? "太郎";
  const items = ["商品A", "商品B"];
  const text = renderSlackMessage(userName, items);

  try {
    const slackRes = await sendSlackNotification(token, channel, text);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Slack notification sent",
        slackResponse: slackRes,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send Slack notification",
        details: String(err),
      }),
    };
  }
};
