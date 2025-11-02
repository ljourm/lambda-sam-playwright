// このディレクトリからsrc/lib/env.ts を参照することが困難なため、そちらと重複定義となっている。
export const getSafeEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};
