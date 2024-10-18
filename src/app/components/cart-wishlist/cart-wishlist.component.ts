import { Component } from '@angular/core';
import { DrawerService } from '../../shared/drawer.service';
import { NgFor, NgIf } from '@angular/common';
import { DrawerCardComponent } from './components/drawer-card/drawer-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-wishlist',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatBadgeModule,
    DrawerCardComponent,
  ],
  templateUrl: './cart-wishlist.component.html',
  styleUrl: './cart-wishlist.component.scss',
})
export class CartWishlistComponent {
  isCartDrawer = false;
  isWishlistDrawer = false;
  wishListProducts = [
    {
      name: 'Chocolate Glazed Donut',
      description: 'A classic donut topped with rich chocolate glaze.',
      price: 2.5,
      quantity: 15,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/chocolate_glazed_donut.png',
    },
    {
      name: 'Red Velvet Donut',
      description: 'Soft red velvet donut with cream cheese icing.',
      price: 3.4,
      quantity: 4,
      isAddedToWishlist: true,
      isAddedToCart: false,
      image: 'assets/images/thumbs/red_velvet_donut.png',
    },
    {
      name: 'Vanilla Cream-Filled Donut',
      description: 'Soft donut filled with creamy vanilla custard.',
      price: 3.5,
      quantity: 5,
      isAddedToWishlist: true,
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
  cartProducts = [
    {
      name: 'Strawberry Sprinkled Donut',
      description:
        'Fluffy donut topped with strawberry icing and colorful sprinkles.',
      price: 2.75,
      quantity: 10,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/strawberry_sprinkled_donut.png',
    },
    {
      name: 'Cinnamon Sugar Donut',
      description: 'Warm donut coated in cinnamon sugar.',
      price: 2.25,
      quantity: 20,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/cinnamon_sugar_donut.png',
    },
    {
      name: 'Raspberry Cream Donut',
      description: 'Light and fluffy donut filled with raspberry cream.',
      price: 3.15,
      quantity: 4,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/raspberry_cream_donut.png',
    },
    {
      name: 'Boston Cream Donut',
      description: 'Deliciously filled with rich chocolate and custard.',
      price: 3.25,
      quantity: 7,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/boston_cream_donut.png',
    },
    {
      name: 'Glazed Jelly Donut',
      description: 'Classic glazed donut filled with sweet fruit jelly.',
      price: 2.8,
      quantity: 9,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/glazed_jelly_donut.png',
    },
    {
      name: "S'mores Donut",
      description:
        'Chocolate donut topped with marshmallow and graham cracker.',
      price: 3.0,
      quantity: 8,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/smores_donut.png',
    },
    {
      name: 'Coconut Cream Donut',
      description: 'Creamy coconut filling with a toasted coconut topping.',
      price: 3.1,
      quantity: 5,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/coconut_cream_donut.png',
    },
    {
      name: 'Chocolate Frosted Donut',
      description: 'Delicious donut with a rich chocolate frosting.',
      price: 2.9,
      quantity: 12,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/chocolate_frosted_donut.png',
    },
    {
      name: 'Peanut Butter Jelly Donut',
      description: 'Delicious peanut butter donut filled with jelly.',
      price: 3.4,
      quantity: 6,
      isAddedToWishlist: false,
      isAddedToCart: true,
      image: 'assets/images/thumbs/peanut_butter_jelly_d.png',
    },
  ];

  constructor(private drawerService: DrawerService, private router: Router) {
    this.drawerService.activeDrawer$.subscribe((activeDrawer) => {
      this.isCartDrawer = activeDrawer.isCartDrawer;
      this.isWishlistDrawer = activeDrawer.isWishlistDrawer;
    });
  }

  calculateCartTotal() {
    return this.cartProducts.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  navigateToPage(flag: boolean) {
    this.router.navigate([`${flag ? '/shopping-cart' : 'wishlist'}`]);
    this.drawerService.toggleDrawer();
  }
}
