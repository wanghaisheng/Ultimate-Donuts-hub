import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel-arrow-buttons',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './carousel-arrow-buttons.component.html',
  styleUrl: './carousel-arrow-buttons.component.scss',
})
export class CarouselArrowButtonsComponent {
  @Input() owlCar!: CarouselComponent;
}
