import type { SNSEvent } from "aws-lambda";
import { getMessageType, sendToSlack } from "./sendSlack";

export const handler = async (event: SNSEvent): Promise<void> => {
  console.info("Received SNS event:", event);

  try {
    for (const record of event.Records) {
      const snsMessage = JSON.parse(record.Sns.Message);
      const messageType = getMessageType(snsMessage);

      await sendToSlack(messageType, snsMessage);
    }
  } catch (err) {
    console.error("Unexpected error", err);
    await sendToSlack("unknown", {});
  }
};
