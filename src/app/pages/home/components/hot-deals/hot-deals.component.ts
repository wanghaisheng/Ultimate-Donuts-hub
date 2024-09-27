import { Component } from '@angular/core';
import { ContainerComponent } from '../../../../components/container/container.component';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CardComponent } from '../../../../components/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarouselArrowButtonsComponent } from '../../../../components/carousel-arrow-buttons/carousel-arrow-buttons.component';

@Component({
  selector: 'app-hot-deals',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CarouselModule,
    ContainerComponent,
    CardComponent,
    CarouselArrowButtonsComponent,
  ],
  templateUrl: './hot-deals.component.html',
  styleUrl: './hot-deals.component.scss',
})
export class HotDealsComponent {
  cards = [
    {
      id: '1',
      title: 'Cinnamon Bliss',
      desc: 'A classic glazed donut with a cinnamon sugar',
      img: 'assets/images/card-donut-1.png',
    },
    {
      id: '2',
      title: 'Chocolate Dream',
      desc: 'An Oven-baked doughnut, perfectly dipped in a glossy chocolate glaze that melts in your mouth.',
      img: 'assets/images/card-donut-2.png',
    },
    {
      id: '3',
      title: 'Berry Burst',
      desc: 'A fruity donut filled with a fresh berry jam and topped with a tangy glaze',
      img: 'assets/images/card-donut-3.png',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
    nav: false,
  };
}
