import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';

interface AuthResponse {
  auth_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://api.teyca.ru/test-auth-only';
  private token: string;

  constructor(private http: HttpClient) {}

  login(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post<AuthResponse>(this.API_URL, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap((resp) => this.setToken(resp.auth_token)),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      }),
    );
  }

  getCurrentToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    this.token = token;
  }
}
