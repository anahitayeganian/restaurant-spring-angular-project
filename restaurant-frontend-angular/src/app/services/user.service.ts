import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl;
  private httpOptions: any;
  private httpClient: HttpClient;

  constructor(private http: HttpClient) {
    this.httpClient = http;
    this.httpOptions = {headers:new HttpHeaders({'Content-Type': 'application/json'})};
  }

  signup(data: any) {
    return this.httpClient.post(this.url + "/users/signup", data, this.httpOptions);
  }

}