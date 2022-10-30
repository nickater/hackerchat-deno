import { ensureFile } from "../deps.ts";
import { err, ok, Result } from "../types/result.ts";

export const readTextFromFile = async (
  filePath: string
): Promise<Result<string, Error>> => {
  try {
    const decoder = new TextDecoder("utf-8");
    await ensureFile(filePath);
    const jsonString = await Deno.readFile(filePath);
    const decodedData = decoder.decode(jsonString);
    if (!decodedData) return err(new Error("Data couldn't be decoded"));
    return ok(decodedData);
  } catch (error) {
    return err(error);
  }
};

export const writeTextToFile = async (
  filePath: string,
  text: string
): Promise<Result<void, Error>> => {
  try {
    const encoder = new TextEncoder();
    const encodedText = encoder.encode(text);
    await Deno.writeFile(filePath, encodedText);
    return ok(undefined);
  } catch (error) {
    return err(error);
  }
};

export const writeJsonToFile = async (
  filePath: string,
  object: Record<string, string>
): Promise<void> => {
  const previousJson = readJsonFromFile(filePath);
  if (previousJson) {
    const newValue = {
      ...previousJson,
      object,
    };

    const stringified = JSON.stringify(newValue);
    const response = await writeTextToFile(filePath, stringified);
    if (response.ok) {
      return;
    }
  }
};

export const readJsonFromFile = async <T>(
  filePath: string
): Promise<T | null> => {
  const result = await readTextFromFile(filePath);
  if (!result.ok) {
    return null;
  }

  const parsedData = JSON.parse(result.value);
  return parsedData;
};
