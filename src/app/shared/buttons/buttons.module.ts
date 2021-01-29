import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';

@NgModule({
  declarations: [ButtonComponent, CancelButtonComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, CancelButtonComponent],
})
export class ButtonsModule {}
