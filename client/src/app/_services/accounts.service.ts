import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl = environment.apiUrl; // No hardcoded string ~> Adding it to enviroment (Section 9: 102)
  private currentUser = new ReplaySubject<User>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient){}


  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
   }

   register(model: any) {
     return this.http.post(this.baseUrl + 'account/register', model).pipe(
       map((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.next(user);
       })
     )
   }

   setCurrentUser(user:User)
   {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
   }


   logout(){
     localStorage.removeItem('user');
     this.currentUser.next(null);
   }
}
