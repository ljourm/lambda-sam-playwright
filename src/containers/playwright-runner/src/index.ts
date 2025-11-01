import type { APIGatewayProxyResult } from "aws-lambda";
import { chromium } from "playwright-core";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const content = await page.content();
  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ content }),
  };
};
