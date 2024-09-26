import { Component } from '@angular/core';
import { CardComponent } from '../../../../components/card/card.component';
import { ContainerComponent } from '../../../../components/container/container.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [NgFor, CardComponent, ContainerComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  cards = [
    {
      title: 'Fastest Delivery',
      desc: 'Get your donuts delivered hot and fresh.',
      img: 'fastest-delivery',
    },
    {
      title: 'Best Quality',
      desc: 'Experience the melt-in-your-mouth goodness of our donuts.',
      img: 'best-quality',
    },
    {
      title: 'Delicious Taste',
      desc: 'Satisfy your sweet cravings with our irresistibly delicious donuts.',
      img: 'delicious-taste',
    },
    {
      title: 'Best Ingredients',
      desc: 'Our donuts are made with the finest and freshest ingredients.',
      img: 'best-ingredients',
    },
  ];
}
