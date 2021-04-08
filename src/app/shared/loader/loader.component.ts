import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() show: boolean;

  constructor(
    public readonly loaderService: LoaderService
  ) {

  }
}
