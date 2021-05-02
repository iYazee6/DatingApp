//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HostBinding, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';

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
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() // : Observable<Member[]>  you don't need to specify the return type it will be redundant here.
  {
    // return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
    // After using JWT interceptor we don't need httpOptions anymore ... 

    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members; 
        return members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/'+username);
  }

  updateMember(member: Member){

    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number){
    // because it's a PUT we need to send a body and we sent an empty body {}
    return this.http.put(this.baseUrl + 'users/set-main-photo/'+photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'user/delete-photo/'+photoId);
  }

}
