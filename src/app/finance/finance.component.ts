import { Component, OnInit } from '@angular/core';
import { FinanceService } from './finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
products = [];
phoneNumber = '';
email = '';
name = '';
quantity = '';
selectedProduct = '';

  
  constructor(private fs:FinanceService) { }

  ngOnInit() {
    this.fs.getProducts().subscribe((res) =>{
      this.products = res['data'];
    })
  }

  onSubmit(form){

    var data = {
      productId: this.selectedProduct[3],
      productName: this.selectedProduct[0],
      quantity: this.quantity,
      price: +this.quantity * +this.selectedProduct[2],
      phoneNumber: this.phoneNumber,
      email: this.email,
      productGivenTo: this.name
    }
    if(form.valid)
    {
      this.fs.postFinanceData(data)
    }
     
    
  }

}
