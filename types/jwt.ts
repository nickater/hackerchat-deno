export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface JwtPayload {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: unknown;
  role: string;
  session_id: string;
}
