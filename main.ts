import { signInUser, signUpUser } from "./auth/auth.ts";
import { Command, createClient, env } from "./deps.ts";
import { GlobalStore } from "./store/global-store.ts";
import { authMenu } from "./ui/auth-menu/auth-menu.ts";
import { AuthMenuChoice } from "./ui/auth-menu/types.ts";
import { getUserCredentials } from "./ui/general/user-credentials.ts";
import { exit } from "./utils/lifecycle.ts";
import { asyncRetry } from "./utils/retry.ts";
import { clearOutput, print } from "./utils/ui.ts";

const store = GlobalStore.getInstance();
const { SUPABASE_URL, SUPABASE_KEY } = env({ safe: true });

const client = createClient(SUPABASE_URL, SUPABASE_KEY, {
  detectSessionInUrl: false,
});

await new Command()
  .name("HackerChat")
  .version("0.1.0")
  .description("Command line messaging tool for Hackers")
  .parse(Deno.args);

clearOutput();
print("Welcome to HackerChat!");

const handleSignIn = async () => {
  const credentials = await getUserCredentials();
  const result = await signInUser(client, credentials);
  if (result.ok) {
    store.setAccessToken(result.value.access_token);
    return true;
  }
  print("Sign up unsuccessful. Please try again.");
  return false;
};

const handleSignUp = async () => {
  const credentials = await getUserCredentials();
  const result = await signUpUser(client, credentials);
  if (result.ok) {
    print(
      "Account created successfully. Please confirm your account in your email, then return to chat."
    );
    exit({ shouldClear: false });
    return true;
  }
  print("Sign up unsuccessful. Please try again.");
  return false;
};

const handleAuthMenuDecision = async (decision: AuthMenuChoice) => {
  switch (decision) {
    case AuthMenuChoice.EXIT:
      exit();
      break;
    case AuthMenuChoice.SIGN_IN:
      await asyncRetry({ funcToTry: handleSignIn });
      break;
    case AuthMenuChoice.SIGN_UP:
      await asyncRetry({ funcToTry: handleSignUp });
      break;
    default:
      break;
  }
};
const authMenuDecision = await authMenu();

await handleAuthMenuDecision(authMenuDecision);

exit();
