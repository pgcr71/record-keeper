import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { SearchComponent } from '../search/search.component';

@NgModule({
  declarations: [
    DropdownComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownComponent,
    SearchComponent
  ]
})
export class DropdownModule { }
