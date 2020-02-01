import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { HeaderComponent } from 'src/app/header/header.component';
import {FormsModule} from '@angular/forms';
import { DialogTemplateComponent } from 'src/app/dialog-template/dialog-template.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    ButtonsModule,
    FormsModule
  ],
  entryComponents: [DialogComponent,HeaderComponent,DialogTemplateComponent]
})
export class DialogModule { }
