import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { ButtonsModule } from '../buttons/buttons.module';



@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    ButtonsModule
  ],
  entryComponents: [DialogComponent]
})
export class DialogModule { }
