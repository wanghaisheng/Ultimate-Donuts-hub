import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, MatCardModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  fullCard!: boolean;
  @Input() showHeader!: boolean;
  @Input() showFooter!: boolean;
  @Input() card!: {
    title: string;
    desc: string;
    img: string;
  };

  ngOnInit() {
    this.fullCard = this.showHeader && this.showFooter;
  }
}
