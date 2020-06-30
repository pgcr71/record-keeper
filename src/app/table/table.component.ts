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
  @Input() checkboxToSelect = true;
  @Input() settings: {} ={};

  @Input() tableOptions = {
    delete: this.checkboxToSelect ? true : false,
    orderBy: ['Name', 'Dsc', ''],
    groupBy: ['Name', ''],
  };

  @Input() customizations = {
    orderBy: 'Name'
  };

  displayTableOptions = false;
  dropdown = false;
  checkBoxes = [];
  constructor() { }

  ngOnInit() {

  }

   onSingleCheckBoxToggle(bool, index) {
     console.log(bool);
     if (bool) {
      this.checkBoxes[index] = true;
    } else {
      this.checkBoxes[index] = false;
    }
   }


   onDelete() {

   }


  onSelectAll(value) {
    if (value) {
      let length = this.checkBoxes.length;
      while (length--) {
        this.checkBoxes[length] = true;
      }
    }
    if (!value) {
        let length = this.checkBoxes.length;
        while (length--) {
          this.checkBoxes[length] = false;
        }
    }
  }


  ngOnChanges(simpleChages) {

    if (simpleChages && simpleChages.hasOwnProperty('headers')) {

    }
    if (simpleChages && simpleChages.hasOwnProperty('customizations') && simpleChages.customizations.orderBy ) {

    }
    if (simpleChages && simpleChages.hasOwnProperty('rows')) {

      let length = this.checkBoxes.length = this.rows.length;
      while (length--) {
        this.checkBoxes[length] = false;
      }

      this.rows.sort((a, b) => {
          const x = false;
          if ((a[0] as string).toLowerCase() < (b[0] as string).toLowerCase()) {
         return -1;
         }
          if ((a[0] as string).toLowerCase() > (b[0] as string).toLowerCase()) {
         return 1;
         }
          if ((a[0] as string).toLowerCase() == (b[0] as string).toLowerCase()) {
         return 0;
         }
        });
    }
  }



}
