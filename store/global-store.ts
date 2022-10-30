import { decodeJwt } from "../utils/jwt.ts";
import { getPersistedAccessToken, persistAccessToken } from "./persistence.ts";

export class GlobalStore {
  private static shared: GlobalStore;
  private _userId = "";
  private _userEmail = "";
  private _isAppRunning = true;
  private _isLoggedIn = false;
  private _rememberMe = true;
  private _accessToken = "";

  constructor() {
    this.syncStoreWithPersistence();
  }

  public static getInstance(): GlobalStore {
    if (!GlobalStore.shared) {
      GlobalStore.shared = new GlobalStore();
    }

    return GlobalStore.shared;
  }

  private async syncStoreWithPersistence() {
    const persistedAccessToken = await getPersistedAccessToken();
    this._accessToken = persistedAccessToken || "";
    if (persistedAccessToken) {
      const decodedJwt = decodeJwt(persistedAccessToken);
      this._userId = decodedJwt.sub;
      this._userEmail = decodedJwt.email;
    }
  }

  public setRememberMe = (choice: boolean) => {
    this._rememberMe = choice;
  };

  get shouldRememberMe() {
    return this._rememberMe;
  }

  get userId() {
    if (this._userId) {
      return this._userId;
    }
    this.syncStoreWithPersistence();
    return this._userId;
  }

  get userEmail() {
    if (this._userEmail) {
      return this._userEmail;
    }
    this.syncStoreWithPersistence();
    return this._userEmail;
  }

  private setIsLoggedIn = (isLoggedIn: boolean) => {
    this._isLoggedIn = isLoggedIn;
  };

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  public quitApp = () => {
    this._isAppRunning = false;
  };

  get isAppRunning() {
    return this._isAppRunning;
  }

  setAccessToken(accessToken: string) {
    persistAccessToken(accessToken);
    this.syncStoreWithPersistence();
    this._accessToken = accessToken;
  }

  get accessToken() {
    if (this._accessToken) {
      return this._accessToken;
    }
    this.syncStoreWithPersistence();
    return this._accessToken;
  }
}
