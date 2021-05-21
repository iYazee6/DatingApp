import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  registerForm : FormGroup;
  maxDate: Date;
  validationErrors : string [] = [];

  constructor(private accountService:AccountsService, private toastr:ToastrService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {

    this.intilizeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  intilizeForm() {
    this.registerForm = this.fb.group({
      gender:           ['male'],
      username:         ['', Validators.required ],
      knownAs:          ['', Validators.required ],
      dateOfBirth:      ['', Validators.required ],
      city:             ['', Validators.required ],
      country:          ['', Validators.required ],
      password:         ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8) ] ],
      confirmPassword:  ['', [ Validators.required, this.matchValues('password') ] ]
    });

    // When the password changes
    //      recheck confirm password validity
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string) : ValidatorFn {
    return (control : AbstractControl ) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true } 
    }
  }

  register() {
    // console.log(this.registerForm.value);
    // console.log(this.model);

    // this.registerform.value ~> because this is a reactive form now.
    this.accountService.register(this.registerForm.value).subscribe( response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
    });
  }

  cancel() {
    //console.log('cancelled');
    this.ChangeRegistrationStatus.emit(false);
  }
}
