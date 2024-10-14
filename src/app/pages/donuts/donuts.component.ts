import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgFor, NgIf } from '@angular/common';
import { DonutFullCardComponent } from './components/donut-full-card/donut-full-card.component';
import { DonutFlavouredCardComponent } from './components/donut-flavoured-card/donut-flavoured-card.component';

@Component({
  selector: 'app-donuts',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ContainerComponent,
    DonutCardComponent,
    DonutFullCardComponent,
    DonutFlavouredCardComponent,
  ],
  templateUrl: './donuts.component.html',
  styleUrl: './donuts.component.scss',
})
export class DonutsComponent {
  isGridView = true;
  donuts = [
    {
      name: 'Chocolate Glazed Donut',
      description: 'A classic donut topped with rich chocolate glaze.',
      price: 2.5,
      quantity: 15,
      isAddedToWishlist: true,
      isAddedToCart: true,
      image: 'assets/images/thumbs/chocolate_glazed_donut.png',
    },
    {
      name: 'Red Velvet Donut',
      description: 'Soft red velvet donut with cream cheese icing.',
      price: 3.4,
      quantity: 4,
      isAddedToWishlist: false,
      isAddedToCart: false,
      isFlavoured: true,
      image: 'assets/images/thumbs/red_velvet_donut.png',
    },
    {
      name: 'Vanilla Cream-Filled Donut',
      description: 'Soft donut filled with creamy vanilla custard.',
      price: 3.5,
      quantity: 5,
      isAddedToWishlist: false,
      isAddedToCart: false,
      image: 'assets/images/thumbs/vanilla_cream_filled_donut.png',
    },
    {
      name: 'Lemon Zest Donut',
      description: 'Zesty lemon-flavored donut topped with lemon glaze.',
      price: 2.9,
      quantity: 12,
      isAddedToWishlist: true,
      isAddedToCart: false,
      isFlavoured: true,
      image: 'assets/images/thumbs/lemon_zest_donut.png',
    },
    {
      name: 'Powdered Sugar Donut',
      description: 'Light and fluffy donut dusted with powdered sugar.',
      price: 2.0,
      quantity: 18,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/powdered_sugar_donut.png',
    },
    {
      name: 'Caramel Apple Donut',
      description: 'Delicious apple-flavored donut drizzled with caramel.',
      price: 3.1,
      quantity: 6,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/caramel_apple_donut.png',
    },
    {
      name: 'Cookies and Cream Donut',
      description: 'Chocolate donut topped with cookies and cream frosting.',
      price: 3.2,
      quantity: 11,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/cookies_and_cream_donut.png',
    },
    {
      name: 'Matcha Green Tea Donut',
      description: 'Unique donut flavored with matcha green tea.',
      price: 3.0,
      quantity: 10,
      isAddedToWishlist: true,
      isAddedToCart: false,
      isFlavoured: true,
      image: 'assets/images/thumbs/matcha_green_tea_donut.png',
    },
    {
      name: 'Almond Joy Donut',
      description: 'Coconut and almond-flavored donut with chocolate icing.',
      price: 3.25,
      quantity: 5,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/almond_joy_donut.png',
    },
    {
      name: 'Peanut Butter Chocolate Donut',
      description: 'Rich peanut butter frosting topped with chocolate.',
      price: 3.3,
      quantity: 8,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/peanut_butter_chocolate_donut.png',
    },
    {
      name: 'Pistachio Donut',
      description: 'Delicious pistachio-flavored donut with a nutty glaze.',
      price: 3.15,
      quantity: 9,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/pistachio_donut.png',
    },
    {
      name: 'Mint Chocolate Chip Donut',
      description: 'Refreshing mint donut with chocolate chips.',
      price: 3.05,
      quantity: 7,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/mint_chocolate_chip_donut.png',
    },
    {
      name: 'Carrot Cake Donut',
      description:
        'Spiced carrot cake donut topped with cream cheese frosting.',
      price: 3.4,
      quantity: 6,
      isAddedToWishlist: true,
      isAddedToCart: false,
      isFlavoured: true,
      image: 'assets/images/thumbs/carrot_cake_donut.png',
    },
    {
      name: 'Honey Glazed Donut',
      description: 'Sweet honey glaze on a fluffy donut.',
      price: 2.8,
      quantity: 14,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/honey_glazed_donut.png',
    },
    {
      name: 'Maple Bar Donut',
      description: 'Delicious bar donut with a sweet maple glaze.',
      price: 3.0,
      quantity: 8,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/maple_bar_donut.png',
    },
  ];
  flavouredDonuts = this.donuts.filter((d) => d.isFlavoured);
}
