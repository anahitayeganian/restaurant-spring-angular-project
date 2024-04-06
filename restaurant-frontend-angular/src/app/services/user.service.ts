import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl;
  private httpOptions: any;
  private httpClient: HttpClient;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.httpClient = http;
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.retrieveToken() }) };
  }

  signup(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/users/signup", data, this.httpOptions);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/users/login", data, this.httpOptions);
  }

  checkToken(): Observable<any> {
    return this.httpClient.get(this.url + "/users/checkToken", this.httpOptions);
  }

  forgotPassword(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/users/forgotPassword", data, this.httpOptions);
  }

}