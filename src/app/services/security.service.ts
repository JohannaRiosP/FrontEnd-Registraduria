import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  user = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient,
              private router: Router) { 
      this.verifyCurrentSession();
  }

  public get userCurrentSession(): User{
    return this.user.value;
  }

  public getUser(){
    return this.user.asObservable();
  }
  public setUser(user_: User){
    this.user.next(user_);
  }
  public validateLogin(user: User): Observable<User>{
    return this.http.post<User>(`${environment.url_api_gateway}/login`, user);
  }
  public saveSessionData(sessionData: any){
    console.log(sessionData);
    let userData: User = {
      id: sessionData.user_id,
      token: sessionData.token, 
    };
    localStorage.setItem('session', JSON.stringify(userData));
    this.setUser(userData);
  }
  public getSessionData(): any {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }
  public verifyCurrentSession(){
    let currentSession = this.getSessionData();
    if(currentSession)
      this.setUser(JSON.parse(currentSession));

  }
  public isThereSession(): boolean{
    let currentSession = this.getSessionData();
    return (currentSession) ? true : false;
  }
  public logout(){
    localStorage.removeItem('session');
    this.setUser(new User());
  }
  
}
