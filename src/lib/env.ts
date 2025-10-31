export const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const getEnvs = (keys: string[]): Record<string, string | undefined> => {
  const envs: Record<string, string | undefined> = {};

  keys.forEach((key) => {
    envs[key] = process.env[key];
  });

  return envs;
};

export const getSafeEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};

export const getSafeEnvs = (keys: string[]): Record<string, string> => {
  const envs: Record<string, string> = {};

  keys.forEach((key) => {
    if (process.env[key]) {
      envs[key] = process.env[key];
    }
  });

  const errorKeys = Object.keys(envs).filter((key) => !envs[key]);

  if (errorKeys.length > 0) {
    throw new Error(`Environment variables ${errorKeys.join(", ")} are not set`);
  }

  return envs;
};
