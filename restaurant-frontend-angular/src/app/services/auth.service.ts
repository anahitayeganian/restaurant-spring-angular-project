import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public static retrieveToken(): string {
    let token = '';
    if (localStorage.getItem('token')) {
      token = String(localStorage.getItem('token'));
    }
    return token;
  }

  public static isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    else
      return true;
  }

}