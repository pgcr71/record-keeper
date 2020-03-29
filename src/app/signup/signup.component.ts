import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isPhoneNumberValid = false;
  phonenumber = '';
  countryCode = '91';
  options = ['91', '92', '93'];
  lastname = '';
  firstname = '';
  username = '';
  password1 = '';
  password2 = '';
  isUserNameValid = false;


  constructor(private ss: SignupService,private router:Router) { }

  ngOnInit() {
  }

  validatePhoneNumber() {
    this.ss.validatePhoneNumber(this.phonenumber).subscribe((obj) => {
      this.isPhoneNumberValid = obj['isPhoneNumberValid'];
    })
  }

  validateUserName() {
    this.ss.validateUsername(this.username).subscribe((obj) => {
      this.isUserNameValid = obj['valid'];

    })
  }

  onSubmit(form) {
    if (form.valid) {
      if (form.value.password1 == form.value.password2) {
        form.value.password = form.value.password1;
        this.ss.signup(form.value).subscribe((obj) => {
          if (obj['signup']) {
            localStorage.setItem('token', obj['token']);
            this.router.navigateByUrl('/index')
          }
        })
      }
    }
  }
}

