import { Component, Inject } from '@angular/core';
import { AutoID, AUTOID } from './auto-id.provide';
import { Database } from 'sqlite3';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  row: any;

  constructor() {


  }

  // public playPingPong() {
  //   console.log(this._electronService.isElectronApp);
  //   const db = new Database(`${__dirname}/assets/database.db`, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Connected to the in-memory SQlite database.');
  //     }
  //   });
  //   const sql = 'SELECT * FROM interest_defaults';
  //   console.log(db)
  //   return db.get(sql, {}, (err, row) => {
  //     if (row) {
  //       this.row = row
  //     } else {
  //       throw new Error('Expected to find 1 Hero. Found 0.');
  //     }
  //   })
  // }
}
