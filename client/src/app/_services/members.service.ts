//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HostBinding, Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// // This is a temp solution, will be better 
// const httpOptions = {
//   headers: new HttpHeaders ({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() // : Observable<Member[]>  you don't need to specify the return type it will be redundant here.
  {
    // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
    // After using JWT interceptor we don't need httpOptions anymore ... 
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/'+username);
  }

}
