import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './customers-landing.component.html',
  styleUrls: ['./customers-landing.component.scss']
})
export class CustomersLandingComponent {
  activeUser: any;

  constructor(
    public readonly as: AppService
  ) {

  }
}
