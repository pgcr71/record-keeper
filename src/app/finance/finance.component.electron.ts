import { Component, OnInit } from '@angular/core';
import { FinanceServiceElectron } from './finance.service.electron';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponentElectron implements OnInit {
products = [];
email = '';
name = '';
quantity = '';
selectedProduct = '';
people = [];
selectedName = [];
rows = [];

headings = ['Name', 'Quantity', 'Price', 'Others'];

set search(value){

}
  constructor(private fs:FinanceServiceElectron) { }

  ngOnInit() {
    this.fs.getProducts().subscribe((res) =>{
      this.products = res['data'];
    })

    this.fs.getAllOders().subscribe((res) => {
      this.rows = res['data']
    });
  }

  onSubmit(form){
console.log(this.selectedName)
    var data = {
      productId: this.selectedProduct[3],
      userId: this.selectedName[2],
      quantity: this.quantity
    }
    if(form.valid)
    {
      this.fs.postFinanceData(data)
    }
  }

  onSearch(searchTerm){
    this.fs.getUserDataByPhoneNumberorFirstName(searchTerm).subscribe((result) => {
      this.people = result['data'];
    })
  }

}
