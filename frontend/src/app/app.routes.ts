import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DonutsComponent } from './pages/donuts/donuts.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartWishlistComponent } from './pages/cart-wishlist/cart-wishlist.component';
import { SignInUpComponent } from './pages/sign-in-up/sign-in-up.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SignInUpGuard, UserProfileGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'donuts',
    title: 'Donuts - Ultimate Donuts',
    component: DonutsComponent,
  },
  {
    path: 'donuts/:status',
    title: 'Donuts - Ultimate Donuts',
    component: DonutsComponent,
  },
  {
    path: 'about',
    title: 'About - Ultimate Donuts',
    component: AboutComponent,
  },
  {
    path: 'contact',
    title: 'Contact - Ultimate Donuts',
    component: ContactComponent,
  },
  {
    path: 'shopping-cart',
    title: 'Shopping Cart - Ultimate Donuts',
    component: CartWishlistComponent,
  },
  {
    path: 'wishlist',
    title: 'Wishlist - Ultimate Donuts',
    component: CartWishlistComponent,
  },
  {
    path: 'sign-up',
    title: 'Signup',
    component: SignInUpComponent,
    canActivate: [SignInUpGuard],
  },
  {
    path: 'sign-in',
    title: 'Sign In',
    component: SignInUpComponent,
    canActivate: [SignInUpGuard],
  },
  {
    path: 'profile',
    title: 'Profile',
    component: UserProfileComponent,
    canActivate: [UserProfileGuard],
  },
  { path: '**', redirectTo: '' },
];
