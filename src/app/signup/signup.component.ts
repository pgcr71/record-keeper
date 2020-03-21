import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isPhoneNumberValid = false;
  phonenumber = '';
  constructor(private ss: SignupService) { }

  ngOnInit() {
  }

  validatePhoneNumber() {
    this.ss.validatePhoneNumber(this.phonenumber).subscribe((obj) => {
      this.isPhoneNumberValid = obj['isPhoneNumberValid'];
    })
  }
}
