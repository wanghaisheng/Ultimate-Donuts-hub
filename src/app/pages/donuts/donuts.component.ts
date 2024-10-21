import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { DonutFullCardComponent } from './components/donut-full-card/donut-full-card.component';
import { DonutFlavouredCardComponent } from './components/donut-flavoured-card/donut-flavoured-card.component';
import { DonutService } from '../../shared/donut.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-donuts',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    ContainerComponent,
    DonutCardComponent,
    DonutFullCardComponent,
    DonutFlavouredCardComponent,
  ],
  templateUrl: './donuts.component.html',
  styleUrl: './donuts.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '{{ delay }}ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class DonutsComponent implements OnInit {
  isGridView = true;
  donuts: any[] | null = [];
  flavouredDonuts: any[] | null = [];
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;

  constructor(private donutService: DonutService) {}

  async ngOnInit(): Promise<void> {
    this.loadDonuts();
    const { data: flavouredDonuts } = await this.donutService.read({
      filter: 'isFlavoured',
    });
    this.flavouredDonuts = flavouredDonuts;
  }

  async loadDonuts() {
    const { data, total } = await this.donutService.read({
      pagination: {
        page: this.currentPage + 1,
        pageSize: this.pageSize,
      },
    });
    this.donuts = data;
    this.totalItems = total;
  }

  async searchDonuts(donutName: string) {
    if (donutName.trim().length) {
      const { data } = await this.donutService.read({
        search: { field: 'name', value: donutName },
      });
      this.donuts = data;
    } else {
      this.loadDonuts();
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDonuts();
    window.scrollTo(0, 0);
  }
}
