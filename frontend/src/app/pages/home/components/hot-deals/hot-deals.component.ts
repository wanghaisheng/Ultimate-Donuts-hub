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
  donuts = [
    {
      id: 25,
      created_at: '2024-10-21 17:54:13.26476+00',
      name: 'Cinnamon Bliss',
      description: 'A classic glazed donut with a cinnamon sugar',
      price: 3.5,
      // image: 'assets/images/card-donut-1.png',
      image:
        'https://btsgadhhjuwuupnolpbz.supabase.co/storage/v1/object/public/donuts_images/card-donut-1.png?t=2024-11-07T22%3A56%3A22.368Z',
      isFlavoured: null,
      isAddedToCart: false,
      isAddedToWishlist: false,
    },
    {
      id: 26,
      created_at: '2024-10-21 17:55:43.779304+00',
      name: 'Chocolate Dream',
      description:
        'An Oven-baked doughnut, perfectly dipped in a glossy chocolate glaze that melts in your mouth.',
      price: 2.75,
      // image: 'assets/images/card-donut-2.png',
      image:
        'https://btsgadhhjuwuupnolpbz.supabase.co/storage/v1/object/public/donuts_images/card-donut-2.png?t=2024-11-07T22%3A56%3A40.560Z',
      isFlavoured: null,
      isAddedToCart: false,
      isAddedToWishlist: false,
    },
    {
      id: 27,
      created_at: '2024-10-21 17:56:20.636531+00',
      name: 'Berry Burst',
      description:
        'A fruity donut filled with a fresh berry jam and topped with a tangy glaze',
      price: 2.9,
      // image: 'assets/images/card-donut-3.png',
      image:
        'https://btsgadhhjuwuupnolpbz.supabase.co/storage/v1/object/public/donuts_images/card-donut-3.png?t=2024-11-07T22%3A56%3A58.658Z',
      isFlavoured: null,
      isAddedToCart: false,
      isAddedToWishlist: false,
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
