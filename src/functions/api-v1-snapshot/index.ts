import type { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { format } from "date-fns";
import { getSafeEnv } from "@/lib/env";

type RequestBody = {
  baseUrl: string;
  targets: { path: string; width: number }[];
};

// リクエストのバリデーションのためanyを許容
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateRequestBody = (body: any): body is RequestBody => {
  if (typeof body !== "object" || body === null) return false;
  if (typeof body.baseUrl !== "string") return false;
  if (!Array.isArray(body.targets)) return false;
  for (const target of body.targets) {
    if (typeof target.path !== "string" || typeof target.width !== "number") {
      return false;
    }
  }
  return true;
};

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log("event:", JSON.stringify(event));

  const body = JSON.parse(event.body || "{}");

  if (!validateRequestBody(body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request body" }),
    };
  }

  const lambdaClient = new LambdaClient({});
  const functionName = getSafeEnv("PLAYWRIGHT_RUNNER_FUNCTION_NAME");

  const payload = {
    baseUrl: body.baseUrl,
    targets: body.targets,
    timestamp: format(new Date(), "yyyyMMddHHmmss"),
  };

  await lambdaClient.send(
    new InvokeCommand({
      FunctionName: functionName,
      InvocationType: "Event", // 非同期実行
      Payload: Buffer.from(JSON.stringify(payload)),
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "ok" }),
  };
};
