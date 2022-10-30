import { clearOutput } from "./ui.ts";

export const exit = (
  { shouldClear }: { shouldClear: boolean } = { shouldClear: true }
) => {
  shouldClear && clearOutput();
  Deno.exit();
};
