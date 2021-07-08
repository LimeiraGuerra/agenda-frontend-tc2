import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private handleUser(userData: object, endpoint: string) {
    return this.http
      .post<any>(`${environment.baseUrl}/user${endpoint}`, userData)
      .pipe(
        map((res) => {
          // guarda o usuario e o token da sessao
          const logged = {
            ...res.data,
            token: res.token,
          }
          localStorage.setItem('currentUser', JSON.stringify(logged));
          this.currentUserSubject.next(logged);
          return res.data;
        })
      );
  }

  login(userData: object) {
    return this.handleUser(userData, '/login');
  }

  signup(userData: object) {
    return this.handleUser(userData, '/register');
  }

  logout() {
    // desloga o usuario removendo a sessao
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
