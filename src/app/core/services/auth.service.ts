import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // 🔥 เปลี่ยนเป็น URL ของ JSON Server

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(
    username: string,
    password: string
  ): Observable<{ username: string; token: string }> {
    return this.http.post<{ username: string; token: string }>(
      `${this.apiUrl}/auth`,
      { username, password }
    );
  }

  setToken(token: string) {
    this.cookieService.set('token', token, { expires: 1, path: '/' });
  }

  setUser(username: string) {
    this.cookieService.set('username', username);
  }

  getToken() {
    return this.cookieService.get('token');
  }

  getUser() {
    return this.cookieService.get('username');
  }

  removeToken() {
    this.cookieService.delete('token', '/');
  }
}
