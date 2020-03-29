import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  name = '';
  quantity = 0;

  constructor(private is: InventoryService) { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form)
    if (form.valid) {
      this.is.add(form.value).subscribe((res) => {
        console.log(res)
      })
    }
  }
}
