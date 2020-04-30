import auth0 from "auth0-js";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "zimmermanzimmerman.eu.auth0.com",
      audience: `${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_PROJECT_URL}/callback`,
      responseType: "token id_token",
      scope: "openid profile",
    });
  }

  signIn = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve(authResult);
      });
    });
  };

  setSession = (authResult) => {
    return new Promise((resolve, reject) => {
      this.idToken = authResult.idToken;
      this.profile = authResult.idTokenPayload;
      // set the time that the id token will expire at
      this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
      localStorage.setItem(
        "iom_portal_auth_access_token",
        authResult.accessToken
      );
      localStorage.setItem("iom_portal_auth_id_token", authResult.idToken);
      localStorage.setItem("iom_portal_auth_expires_at", this.expiresAt);
      resolve();
    });
  };

  signOut = () => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("iom_portal_auth_access_token");
      localStorage.removeItem("iom_portal_auth_id_token");
      localStorage.removeItem("iom_portal_auth_expires_at");
      this.auth0.logout({
        returnTo: process.env.REACT_APP_PROJECT_URL,
        clientID: process.env.REACT_APP_CLIENT_ID,
      });

      resolve();
    });
  };

  silentAuth = () => {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        // if (err) return reject(err);
        if (!err) {
          this.setSession(authResult);
          resolve(authResult);
        }
      });
    });
  };
}

const auth0Client = new Auth();

export default auth0Client;
