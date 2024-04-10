import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.apiUrl;
  private httpClient: HttpClient;
  private httpOptions: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.httpClient = this.http;
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  getAllCategories(): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + AuthService.retrieveToken());
    return this.httpClient.get(this.url + "/categories/all", this.httpOptions);
  }

}
