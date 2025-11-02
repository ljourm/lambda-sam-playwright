import { chromium } from "playwright-core";
import { PlaywrightRunnerEvent } from "./types";
import { snapshots } from "./snapshot";
import { uploadToS3 } from "./s3";
import { getS3Key, getS3KeyPrefix } from "./s3Key";
import { saveToFile } from "./file";

export const handler = async (event: PlaywrightRunnerEvent): Promise<string> => {
  console.log("PlaywrightRunner started with event:", JSON.stringify(event));

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const s3KeyPrefix = getS3KeyPrefix(event.baseUrl, event.timestamp);

  for (const target of event.targets) {
    const buffer = await snapshots(page, event.baseUrl, target);
    const s3Key = getS3Key(s3KeyPrefix, target);

    if (process.env.OUTPUT_TYPE === "FILE") {
      // ローカルでのデバッグ用
      await saveToFile(s3Key, buffer);
    } else {
      await uploadToS3(s3Key, buffer);
    }
  }

  await browser.close();

  console.log("PlaywrightRunner completed successfully.");

  return "ok";
};
