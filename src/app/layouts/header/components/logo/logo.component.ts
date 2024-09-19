import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {}
