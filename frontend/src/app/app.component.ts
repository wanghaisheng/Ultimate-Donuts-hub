import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SmoothScrollService } from './shared/services/smooth-scroll.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    DrawerComponent,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('scrollContent', { static: false }) scrollContent!: ElementRef;
  showScrollBtn = false;

  constructor(private smoothScrollService: SmoothScrollService) {}

  ngAfterViewInit(): void {
    this.smoothScrollService.initSmoothScrolling(
      this.scrollContent.nativeElement
    );
    this.smoothScrollService.data$.subscribe((data) => {
      this.showScrollBtn = data.isScrollDown;
    });
  }

  scrollToTop() {
    this.smoothScrollService.scrollToTop(600);
  }
}
