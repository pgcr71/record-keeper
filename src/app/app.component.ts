import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  row: any;

  constructor(private readonly _electronService: ElectronService) {


  }
}
