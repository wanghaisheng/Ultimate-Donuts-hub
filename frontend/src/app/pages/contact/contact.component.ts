import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { imageReveal, reveal } from '../../shared/animations/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatListModule, MatIconModule, ContainerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [imageReveal, reveal],
})
export class ContactComponent {}
