import { ChangeDetectorRef, Component } from '@angular/core';
import { ContainerComponent } from '../../../../components/container/container.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { fadeInUp } from '../../../../shared/animations/animations';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    MatIconModule,
    MatButtonModule,
    InViewDirective,
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
  animations: [fadeInUp],
})
export class OfferComponent {
  inView = false;
  hasAnimated = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  onElementVisible(): void {
    if (!this.hasAnimated) {
      this.inView = true;
      this.hasAnimated = true;
      this.cdRef.detectChanges();
    }
  }
}
