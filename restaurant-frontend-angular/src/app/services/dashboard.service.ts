import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = environment.apiUrl;
  private httpClient: HttpClient;
  private httpOptions: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.httpClient = http;
    this.httpOptions = {headers:new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.retrieveToken()})};
  }

  getDetails(): Observable<any> {
    return this.httpClient.get(this.url + "/dashboard/details", this.httpOptions);
  }

}