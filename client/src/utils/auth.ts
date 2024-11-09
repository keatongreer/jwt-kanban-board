import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // return the decoded token
    const jwtToken = this.getToken();
    const decodedToken: JwtPayload = jwtDecode(jwtToken);
    return decodedToken;
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const jwtToken = this.getToken();
    return jwtToken;
  }

  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    if (!token) {
      return true;
    } else {
      const data = jwtDecode<JwtPayload>(token);
      const curTime = Date.now() / 1000;
      return data?.exp && data.exp < curTime;
    }
  }

  getToken(): string {
    // return the token
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  login(idToken: string) {
    // set the token to localStorage
    localStorage.setItem("id_token", idToken);

    // redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem("id_token");

    // redirect to the login page
    window.location.assign("/");
  }
}

export default new AuthService();
