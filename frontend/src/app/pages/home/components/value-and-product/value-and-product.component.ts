import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ContainerComponent } from '../../../../components/container/container.component';
import { RoundedCornerImageComponent } from './components/RoundedCornerImage/rounded-corner-image.component';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { imageReveal, reveal } from '../../../../shared/animations/animations';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-value-and-product',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule,
    ContainerComponent,
    RoundedCornerImageComponent,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    InViewDirective,
  ],
  templateUrl: './value-and-product.component.html',
  styleUrl: './value-and-product.component.scss',
  animations: [reveal, imageReveal],
})
export class ValueAndProductComponent {
  @Input() showList: boolean = false;
  inView = false;
  hasAnimated = false;

  default = {
    imgSource: 'assets/images/rounded-image-1.jpg',
    title: 'A brief history of our love affair with donuts!',
    desc: "Our donuts are perfect for any occasion, whether you're grabbing a quick breakfast on the go or ordering a dozen for a special event.",
  };

  list = {
    imgSource: 'assets/images/rounded-image-2.jpg',
    title: 'Quality Commitment to Donut Ingredients.',
    items: [
      'Our Commitment to Quality',
      'The Finest and Freshest Ingredients',
      'Made with only the freshest and highest quality',
    ],
  };

  constructor(private cdRef: ChangeDetectorRef) {}

  onElementVisible(): void {
    if (!this.hasAnimated) {
      this.inView = true;
      this.hasAnimated = true;
      this.cdRef.detectChanges();
    }
  }
}
