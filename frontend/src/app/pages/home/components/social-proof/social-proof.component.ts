import { ChangeDetectorRef, Component } from '@angular/core';
import { ContainerComponent } from '../../../../components/container/container.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor, NgIf } from '@angular/common';
import { CarouselArrowButtonsComponent } from '../../../../components/carousel-arrow-buttons/carousel-arrow-buttons.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { fadeInUp, reveal } from '../../../../shared/animations/animations';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CarouselModule,
    MatCardModule,
    MatIconModule,
    ContainerComponent,
    CarouselArrowButtonsComponent,
    InViewDirective,
  ],
  templateUrl: './social-proof.component.html',
  styleUrl: './social-proof.component.scss',
  animations: [fadeInUp, reveal],
})
export class SocialProofComponent {
  inView = false;
  hasAnimated = false;

  cards = [
    {
      id: '1',
      rating: 5,
      name: 'Jane S',
      desc: "I've been a customer of this donut shop for years, and I can honestly say they make the best donuts I've ever tasted. Every bite is pure heaven, with just the right amount of sweetness and a melt-in- your-mouth texture.",
      avatar: 'assets/images/testimonial-1.jpg',
    },
    {
      id: '2',
      rating: 4.5,
      name: 'Ralph Edwards',
      desc: "I was blown away by the variety of flavors and styles available at this donut shop. From classic glazed to creative combinations he maple bacon and blueberry lemon, there's something for everyone.",
      avatar: 'assets/images/testimonial-2.jpg',
    },
    {
      id: '3',
      rating: 5,
      name: 'Bessie Cooper',
      desc: 'I ordered donuts for a company event and they were a huge hit. The delivery was fast and the donuts were still warm and fresh when they arrived. Our team loved the unique flavors and fun decorations.',
      avatar: 'assets/images/testimonial-3.jpg',
    },
    {
      id: '4',
      rating: 4.5,
      name: 'Kathryn Murphy',
      desc: "As someone with a gluten allergy, I've struggle to find good gluten-free donuts that actually taste like the real thing. But this donut shop h nailed it their gluten-free donuts are just delicious as their regular ones, with a soft a fully texture and rich flavor",
      avatar: 'assets/images/testimonial-4.jpg',
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
        items: 3,
      },
      1024: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(private cdRef: ChangeDetectorRef) {}

  getStars(rating: number) {
    const halfStar = Math.round(rating) > rating;
    const stars: string[] = [];
    stars.length = Math.floor(rating);
    return { halfStar, stars };
  }

  onElementVisible(): void {
    if (!this.hasAnimated) {
      this.inView = true;
      this.hasAnimated = true;
      this.cdRef.detectChanges();
    }
  }
}
