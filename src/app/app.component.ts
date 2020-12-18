import { Component } from '@angular/core';
import { Database } from 'sqlite3';
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

  public playPingPong() {
    const db = new Database(`${__dirname}/assets/database.db`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected to the in-memory SQlite database.');
      }
    });
    const sql = 'SELECT * FROM interest_defaults';
    console.log(db)
    return db.get(sql, {}, (err, row) => {
      if (row) {
        this.row = row
      } else {
        throw new Error('Expected to find 1 Hero. Found 0.');
      }
    })
  }
}
