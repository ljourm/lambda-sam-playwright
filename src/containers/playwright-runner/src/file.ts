import fs from "fs";
import path from "path";

export const saveToFile = (key: string, buffer: Buffer) => {
  const filePath = path.join("/app/output", key);
  const dir = path.dirname(filePath);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, buffer);

  console.log(`Saved to file://${filePath}`);
};
