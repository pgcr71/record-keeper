import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ls: LoginService, private router: Router) { }

  phonenumber = null;
  password = '';

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      this.ls.login(this.phonenumber, this.password)
        .subscribe((value) => {
          if (value['isAuthorized']) {
            localStorage.setItem('token', value['token']);
            this.router.navigate(['index'])
          }
        }, () => {

        });
    }
  }
}
