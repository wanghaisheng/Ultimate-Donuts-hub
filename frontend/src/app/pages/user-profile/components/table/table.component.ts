import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { fadeInUp } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [fadeInUp],
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() orders: any;
  @Input() user: any;
  @Output() cancelOrder = new EventEmitter();
  @Output() handleSignOut = new EventEmitter();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orders'] && changes['orders'].currentValue) {
      this.dataSource.data = changes['orders'].currentValue;
    }
  }

  ngAfterViewInit() {
    this.displayedColumns = [
      'amount',
      'payment_intent',
      'status',
      'created',
      'canceledAt',
      'cancel',
    ];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  convertDate(date: number) {
    const dateObject = new Date(date * 1000);
    return dateObject.toLocaleString();
  }

  onCancelOrder(order: any) {
    this.cancelOrder.emit(order);
  }

  signOut() {
    this.handleSignOut.emit();
  }
}
