import { Select } from "../../deps.ts";
import { MainMenuChoice } from "./types.ts";

export const mainMenu = async () => {
  const answer = (await Select.prompt({
    message: "Main menu:",
    options: [
      { name: "Existing Chats", value: MainMenuChoice.ExistingChat },
      { name: "New Chat", value: MainMenuChoice.NewChat },
      Select.separator("--------"),
      { name: "Exit", value: MainMenuChoice.Exit },
    ],
  })) as MainMenuChoice;

  return answer;
};
