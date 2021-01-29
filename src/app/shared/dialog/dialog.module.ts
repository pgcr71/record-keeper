import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { HeaderComponent } from 'src/app/header/header.component';
import { FormsModule } from '@angular/forms';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';

@NgModule({
  declarations: [DialogComponent, DialogTemplateComponent],
  imports: [CommonModule, ButtonsModule, FormsModule],
  entryComponents: [DialogComponent, DialogTemplateComponent],
})
export class DialogModule {}
