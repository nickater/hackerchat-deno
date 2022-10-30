import { decode } from "../deps.ts";
import { JwtPayload } from "../types/jwt.ts";

export const decodeJwt = (jwt: string): JwtPayload => {
  const [_, payload] = decode(jwt);

  return payload as JwtPayload;
};
