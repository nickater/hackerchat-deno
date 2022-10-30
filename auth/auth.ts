import { Session, SupabaseClient, User } from "../deps.ts";
import { UserCredentials } from "../types/auth.ts";
import { err, ok, Result } from "../types/result.ts";

export const signUpUser = async (
  { auth }: SupabaseClient,
  userCredentials: UserCredentials
): Promise<Result<User, Error>> => {
  const result = await auth.signUp(userCredentials);
  if (result.error) {
    return err(new Error(result.error.message));
  }

  if (result.user) {
    return ok(result.user);
  }

  return err(new Error("Sign up return unexpected result"));
};

export const signInUser = async (
  { auth }: SupabaseClient,
  userCredentials: UserCredentials
): Promise<Result<Session, Error>> => {
  const result = await auth.signIn(userCredentials);
  if (result.error) {
    return err(new Error(result.error.message));
  }

  if (result.session) {
    return ok(result.session);
  }

  return err(new Error("Sign up return unexpected result"));
};
