import { Component } from '@angular/core';
import { ContainerComponent } from '../../../../components/container/container.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [RouterModule, ContainerComponent, MatIconModule, MatButtonModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
})
export class OfferComponent {}
