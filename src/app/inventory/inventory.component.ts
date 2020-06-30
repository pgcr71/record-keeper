import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from './inventory.service';
import { ToasterService } from '../toaster/toaster.service';
import { DropdownComponent } from '../_forms/dropdown/dropdown.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

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

  constructor(private is: InventoryService,private ts:ToasterService) { }

  ngOnInit() {
    this.is.get().subscribe(result => {
      this.inventory = [...result['data']];
      this.ts.success(result['message'])
    })
  }

  onSubmit(form) {
    if (form.valid) {
      this.is.add(form.value ).subscribe((res) => {
        if(res['done']){
          this.inventory.push([this.name,this.quantity,this.price]);
          this.ts.success(res['message'])
        }
      },error =>{
        this.ts.danger(error.error.message)
      })
    }
  }
}
