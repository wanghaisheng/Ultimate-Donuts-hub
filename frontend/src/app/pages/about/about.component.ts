import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { imageReveal, reveal } from '../../shared/animations/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [imageReveal, reveal],
})
export class AboutComponent {}
