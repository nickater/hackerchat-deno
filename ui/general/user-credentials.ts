import { Input, Secret } from "../../deps.ts";
import { UserCredentials } from "../../types/auth.ts";

export const getUserCredentials = async (): Promise<UserCredentials> => {
  const email = await Input.prompt("Email:");
  const password = await Secret.prompt({
    message: "Password:",
  });

  return { email, password };
};
