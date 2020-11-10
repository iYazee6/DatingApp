import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean;
  users: any;

  constructor() { }

  ngOnInit(): void {
    // this.getUsers();
  }

  toggleRegisterMode(){
    this.registerMode = !this.registerMode;
  }

  // getUsers() {
  //   this.httpClient.get('https://localhost:5001/api/users').subscribe(users => {this.users = users;});
  // }

  changeRegistrationMode(event: boolean){
    this.registerMode = event;
  }

}
