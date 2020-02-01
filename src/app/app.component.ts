import { Component } from '@angular/core';
import { DialogService } from './_Modules/dialog/dialog.service';
import { HeaderComponent } from './header/header.component';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
 
  constructor(private _ds: DialogService,private _as:AppService) {

  }

  openDialog() {
    this._ds.open(DialogTemplateComponent).subscribe((data) => {
      console.log(data)
    })
  }

  getData(){
    this._as.getData().subscribe(data => {console.log(data)});
  }
}