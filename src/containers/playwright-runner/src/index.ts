import { Context } from "aws-lambda";
import { chromium } from "playwright-core";
import { PlaywrightRunnerEvent, PlaywrightRunnerTarget } from "./types";
import { snapshots } from "./snapshot";
import { uploadToS3 } from "./s3";
import { getS3Key, getS3KeyPrefix } from "./s3Key";
import { saveToFile } from "./file";
import { processConcurrent } from "./concurrency";
import { callNextLambda } from "./lambda";

export const handler = async (event: PlaywrightRunnerEvent, context: Context): Promise<string> => {
  console.log("PlaywrightRunner started with event:", JSON.stringify(event));

  const browser = await chromium.launch();
  const s3KeyPrefix = getS3KeyPrefix(event.baseUrl, event.timestamp);

  const snapshotAndSave = async (target: PlaywrightRunnerTarget) => {
    const page = await browser.newPage();
    const buffer = await snapshots(page, event.baseUrl, target);
    const s3Key = getS3Key(s3KeyPrefix, target);

    if (process.env.OUTPUT_TYPE === "FILE") {
      // ローカルでのデバッグ用
      await saveToFile(s3Key, buffer);
    } else {
      await uploadToS3(s3Key, buffer);
    }

    await page.close();
  };

  const doContinue = () => {
    return context.getRemainingTimeInMillis() > 1000 * 60; // 60秒以上残っている場合に続行
  };

  const nextTargets = await processConcurrent(snapshotAndSave, event.targets, doContinue);

  await browser.close();

  // 未処理のターゲットがある場合は次のLambda呼び出しをトリガー
  if (nextTargets.remaining.length > 0) {
    console.log(
      `Remaining targets: ${nextTargets.remaining.length}. Triggering next Lambda invocation.`,
    );

    const payload: PlaywrightRunnerEvent = {
      baseUrl: event.baseUrl,
      timestamp: event.timestamp,
      targets: nextTargets.remaining,
    };

    await callNextLambda(payload);
  } else {
    console.log("All targets processed.");
  }

  console.log("PlaywrightRunner completed successfully.");

  return "ok";
};
