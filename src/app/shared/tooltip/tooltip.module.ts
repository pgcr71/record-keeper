import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooptipComponent } from './tooptip/tooptip.component';
import { TooptipDirective } from './tooptip.directive';

@NgModule({
  declarations: [TooptipComponent, TooptipDirective],
  imports: [CommonModule],
  exports: [TooptipDirective],
})
export class TooltipModule {}
