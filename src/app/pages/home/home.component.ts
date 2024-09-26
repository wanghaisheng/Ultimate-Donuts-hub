import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { ValueAndProductComponent } from "./components/value-and-product/value-and-product.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContainerComponent, HeroComponent, FeaturesComponent, ValueAndProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
