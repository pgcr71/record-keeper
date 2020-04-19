import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() headers = [];
  @Input() rows = [];
  @Input() customCss = {};

  @Input() customizations = {
    orderBy:'Name'
  }
  dropdown = false;
  checkBoxes = [];
  constructor() { }

  ngOnInit() {

  }

  onSelectAll(value){
    if(value){
      var length = this.checkBoxes.length
      while(length--){
        this.checkBoxes[length] = true;
      }
    }
      if(!value){
        var length = this.checkBoxes.length
        while(length--){
          this.checkBoxes[length] = false;
        }
    }
  }


  ngOnChanges(simpleChages){

    if(simpleChages && simpleChages.hasOwnProperty('headers')){
 
    }
    if(simpleChages && simpleChages.hasOwnProperty('customizations') && simpleChages.customizations.orderBy ){

    }
    if(simpleChages && simpleChages.hasOwnProperty('rows')){

      var length = this.checkBoxes.length = this.rows.length;
      while(length--){
        this.checkBoxes[length] = false;
      }

        this.rows.sort((a,b) =>{
          let x:boolean = false;
         if((a[0] as string).toLowerCase() < (b[0] as string).toLowerCase())
         return -1;
         if((a[0] as string).toLowerCase() > (b[0] as string).toLowerCase())
         return 1;
         if((a[0] as string).toLowerCase() == (b[0] as string).toLowerCase())
         return 0;
        })
    }
  }



}
