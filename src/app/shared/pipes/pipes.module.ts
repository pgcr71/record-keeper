import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from './sum.pipe';



@NgModule({
  declarations: [SumPipe],
  imports: [
    CommonModule
  ],
  exports: [SumPipe]
})
export class PipesModule { }
