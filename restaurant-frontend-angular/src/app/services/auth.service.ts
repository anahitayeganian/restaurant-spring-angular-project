import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public retrieveToken(): string {
    let token = '';

    if (localStorage.getItem('token')) {
      token = String(localStorage.getItem('token'));
    }
    return token;
  }

}
