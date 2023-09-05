import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string;

  constructor(private http:HttpClient) { 
    this.baseUrl = AppConfig.apiUrl;
  }

  createUser(userDto: any) {
    const url = `${this.baseUrl}/api/v1/users/create`;
    return this.http.post(url, userDto);
  }

  /*getApiUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }*/
}
