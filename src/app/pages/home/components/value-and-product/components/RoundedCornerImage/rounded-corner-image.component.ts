import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-corner-image',
  standalone: true,
  imports: [],
  templateUrl: './rounded-corner-image.component.html',
  styleUrl: './rounded-corner-image.component.scss',
})
export class RoundedCornerImageComponent {
  @Input() imgSource!: string;
}
