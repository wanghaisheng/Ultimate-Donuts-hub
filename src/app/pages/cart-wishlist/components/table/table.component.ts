import { CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  @Input() isCart?: boolean;
  @Input() isWishlist?: boolean;
  @Input() donuts: DonutsType[] = [];

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<DonutsType>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.dataSource.data = this.donuts;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDisplayedColumns() {
    if (this.isWishlist)
      return ['image', 'name', 'price', 'purchase', 'remove'];
    return ['image', 'name', 'price', 'quantity', 'total', 'remove'];
  }

  calculateCartTotal() {
    return this.donuts.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}

export interface DonutsType {
  name: string;
  description: string;
  price: number;
  quantity: number;
  isAddedToWishlist: boolean;
  isAddedToCart: boolean;
  image: string;
}
