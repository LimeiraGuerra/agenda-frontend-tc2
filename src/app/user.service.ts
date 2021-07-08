import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  signUpUser(user: {
    name: string;
    email: string;
    newPassword: string;
  }): Observable<any> {
    let body = new HttpParams();
    body = body.set('name', user.name);
    body = body.set('email', user.email);
    body = body.set('password', user.newPassword);
    return this.http.post(this.baseURL + '/register', body, {
      observe: 'response',
    });
  }

  logout() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
