import { Component } from '@angular/core';
import { ContainerComponent } from '../../../../components/container/container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { breath } from './animations';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    NgFor,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ContainerComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [breath],
})
export class HeroComponent {
  images = [
    {
      src: 'assets/images/donut-2.png',
      width: '273',
      alt: 'Donut',
      class: 'hero-donut-2',
      params: { scale: 1.05, translate: '-10px' },
    },
    {
      src: 'assets/images/crumbs-2.png',
      width: '90',
      alt: 'Donut crumbs',
      class: 'hero-crumbs-2',
      params: { scale: 1.05, translate: '10px' },
    },
    {
      src: 'assets/images/donut-1.png',
      width: '372.5',
      alt: 'Donut',
      class: 'hero-donut-1',
      params: { scale: 1.05, translate: '10px' },
    },
    {
      src: 'assets/images/crumbs-1.png',
      width: '318',
      alt: 'Donut crumbs',
      class: 'hero-crumbs-1',
      params: { scale: 1.05, translate: '-10px' },
    },
  ];
  animationRunningState = true;

  toggleAnimation() {
    this.animationRunningState = !this.animationRunningState;
  }
}
