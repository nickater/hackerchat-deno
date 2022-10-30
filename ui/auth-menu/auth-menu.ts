import { Select } from "../../deps.ts";
import { AuthMenuChoice } from "./types.ts";

export const authMenu = async () => {
  const answer = (await Select.prompt({
    message: "Choose your path:",
    options: [
      { name: "Sign In", value: "sign-in" },
      { name: "Sign Up", value: "sign-up" },
      Select.separator("--------"),
      { name: "Exit", value: "exit" },
    ],
  })) as AuthMenuChoice;

  return answer;
};
