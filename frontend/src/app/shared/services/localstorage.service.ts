import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string |null{
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }
  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  // test aal lwaket mtaa expiration wfee 1day or whatever
  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
