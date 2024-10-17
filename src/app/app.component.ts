import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ContainerComponent } from './components/container/container.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SignInUpComponent } from './pages/sign-in-up/sign-in-up.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { CartWishlistComponent } from './pages/cart-wishlist/cart-wishlist.component';
import { DonutsComponent } from './pages/donuts/donuts.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    SignInUpComponent,
    DrawerComponent,
    CartWishlistComponent,
    DonutsComponent,
    MatSnackBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
