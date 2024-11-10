import { Component, inject, OnInit } from '@angular/core';
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
import { DonutService } from '../../shared/services/donut.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Donut } from '../../shared/types/donut.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../shared/services/payment.service';
import { DonutDialogComponent } from './components/donut-dialog/donut-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  donuts: Donut[] | null = [];
  flavouredDonuts: Donut[] | null = [];
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  sessionDetails: any;
  readonly dialog = inject(MatDialog);

  constructor(
    private donutService: DonutService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadDonuts();
    const { data: flavouredDonuts } = await this.donutService.read({
      filter: 'isFlavoured',
    });
    this.flavouredDonuts = flavouredDonuts;

    this.route.queryParams.subscribe((params) => {
      const sessionId = params['session_id'];
      if (sessionId) {
        this.paymentService.getSessionDetails(sessionId).subscribe((res) => {
          this.sessionDetails = res;
          this.openDialog('300ms', '300ms', true);
        });
      }
    });

    this.route.url.subscribe((url) => {
      if (url[1]?.path === 'cancel') {
        this.openDialog('300ms', '300ms', false);
      }
    });

    this.router.navigate(['/donuts'], { replaceUrl: true });
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

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    successPayment: boolean
  ): void {
    this.dialog.open(DonutDialogComponent, {
      data: {
        paymentSessionDetails: this.sessionDetails,
        successPayment,
      },
      width: '828px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
