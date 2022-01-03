import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapTo, share, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const authenticationRoute = "/authentication"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
    
  login(username: string, password: string): Observable<any> {
      return this.http.post<any>(`${authenticationRoute}/login`, {username: username, password: password}).pipe(
        tap(user => this.setSession(user.token)),
        share(),
        mapTo({})
        );
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${authenticationRoute}`);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${authenticationRoute}/register`, {username: username, password: password});
  }

  private setSession(token: string) {
    localStorage.setItem('organizer-token', token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('organizer-token') != null;
  }

  logout() {
    localStorage.removeItem("organizer-token");
  }
}