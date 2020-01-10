import { Component, OnInit, Input } from '@angular/core';
import { BackGroundColors, textColors } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() size?= 'small';
  @Input() type = 'submit';
  @Input() backGroundColor?= BackGroundColors.primary;
  @Input() color?= textColors.withBackGround;

  constructor() { }

  ngOnInit() {

  }

}
