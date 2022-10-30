import { dir, env } from "../deps.ts";
import { readJsonFromFile, writeJsonToFile } from "../utils/file-helper.ts";

const PERSISTENCE = {
  REMEMBER_ME: "remember_me",
  ACCESS_TOKEN: "access_token",
};

type PersistedValues = {
  access_token: string;
};

export const turnOnRememberMe = () => {
  localStorage.setItem(PERSISTENCE.REMEMBER_ME, JSON.stringify(true));
};

export const turnOffRememberMe = () => {
  localStorage.setItem(PERSISTENCE.REMEMBER_ME, JSON.stringify(false));
};

export const getRememberMeStatus = (): boolean => {
  const rememberMe = localStorage.getItem(PERSISTENCE.REMEMBER_ME);
  return Boolean(rememberMe);
};

export const persistAccessToken = async (accessToken: string) => {
  await writeValueToFile("access_token", accessToken);
};

export const getPersistedAccessToken = async () => {
  const value = await getValuesFromFile();
  return value?.access_token;
};
export const configFile = () => {
  const { DEV } = env({ safe: true });

  const isDev = Boolean(DEV);
  const fileName = "com.hackerchat.config";
  const configDirectory = dir("config");
  return isDev ? fileName : `${configDirectory}/${fileName}`;
};

export const getValuesFromFile = async (): Promise<PersistedValues | null> => {
  const filePath = configFile();
  const result = await readJsonFromFile<PersistedValues>(filePath);

  return result;
};

export const writeValueToFile = async (
  key: keyof PersistedValues,
  value: string
) => {
  const filePath = configFile();
  const obj = { [key]: value };

  return await writeJsonToFile(filePath, obj);
};
