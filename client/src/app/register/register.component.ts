import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() UsersFromHomeComponent;
  @Output() ChangeRegistrationStatus = new EventEmitter();
  model: any = {};
  constructor(private accountService:AccountsService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    // console.log(this.model);
    this.accountService.register(this.model).subscribe( response => {
      console.log('successful registration');
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  cancel() {
    //console.log('cancelled');
    this.ChangeRegistrationStatus.emit(false);
  }
}
