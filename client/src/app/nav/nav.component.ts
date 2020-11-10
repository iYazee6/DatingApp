import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  //loggedin: boolean;
  // currentUser$: Observable<User>;
  constructor(public accountService:AccountsService) { }

  ngOnInit(): void {
    //this.getCurrentUser(); ~> Type 1
    // this.currentUser$ = this.accountService.currentUser$; ~> Type 2 
    // then Type 3 when we used the accounts services object directly
  }

  login (){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      //this.loggedin = true;
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
    //this.loggedin = false;
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedin = !!user;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

}
