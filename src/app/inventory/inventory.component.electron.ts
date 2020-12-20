import { Component, OnInit } from '@angular/core';
import { InventoryServiceElectron } from './inventory.service.electron';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponentElectron implements OnInit {
  row
  name = '';
  quantity = 0;
  price = 0;
  inventory = [];
  headings = ['Name', 'Quantity', 'Price', 'Others'];
  settings = {
    Quantity: {
      contenteditable: 'true',
      htmlOnContentEdit: 'true',
      html: `<p> Ganesh</p>`,
      componentName:DropdownComponent
    }
  };

  constructor(
    private is: InventoryServiceElectron
    ) { }

  ngOnInit() {
    this.is.get().subscribe(result => {
      this.inventory = [...result];
    })
  }

  onSubmit(form) {
    console.log(form)
    if (form.valid) {
      this.is.add(form.value).subscribe((res) => {
        if(res)
          this.inventory.push([this.name,this.quantity,this.price]);
      },error =>{
        console.log(error)
      })
    }
  }

  // playPingPong() {
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
