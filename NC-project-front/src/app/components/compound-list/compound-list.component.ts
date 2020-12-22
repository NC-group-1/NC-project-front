import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PageModel} from '../../../models/PageModel';
import {CompoundModel} from '../../../models/CompoundModel';

declare var $: any;

@Component({
  selector: 'app-compound-list',
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.css']
})
export class CompoundListComponent implements OnInit {

  created: boolean;
  compoundPage: PageModel<CompoundModel>;
  currentPage: number;
  size: number;
  dataSource: MatTableDataSource<any>;
  columns = ['name', 'description'];
  nameSearch = false;
  descriptionSearch = false;
  sort: MatSort;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.created = !!this.activatedRoute.snapshot.queryParamMap.get('created');
    this.activatedRoute.params.subscribe(value => {
      this.currentPage = value.page;
      this.compoundPage = this.activatedRoute.snapshot.data.compoundPage;
      this.dataSource = new MatTableDataSource<any>(this.compoundPage.list);
    });
    this.activatedRoute.queryParams.subscribe(value => {
      this.size = !value.size ? 10 : value.size;
    });
    this.activatedRoute.data.subscribe(value => {
      this.compoundPage = this.activatedRoute.snapshot.data.compoundPage;
      this.dataSource = new MatTableDataSource<any>(this.compoundPage.list);
    });
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.clearQuery();
  }
  clearQuery(): void{
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {name: null, description: null}, queryParamsHandling: 'merge'});
  }

  pageParamsChange(event: PageEvent): void {
    this.router.navigate(['compounds', event.pageIndex], {
      queryParams: {size: event.pageSize}, queryParamsHandling: 'merge'});
  }

  searchByName(): void {
    this.clearQuery();
    this.descriptionSearch = false;
    this.nameSearch = !this.nameSearch;
  }
  searchByDescription(): void {
    this.clearQuery();
    this.nameSearch = false;
    this.descriptionSearch = !this.descriptionSearch;
  }
  findName(event: any): void{
    this.router.navigate(['../0'], {relativeTo: this.activatedRoute,
      queryParams: {name: event.target.value}, queryParamsHandling: 'merge'});
  }
  findDescription(event: any): void{
    this.router.navigate(['../0'], {relativeTo: this.activatedRoute,
      queryParams: {description: event.target.value}, queryParamsHandling: 'merge'});
  }

  sortBy(event: any): void {
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {orderBy: event.active, direction: event.direction}, queryParamsHandling: 'merge'});
  }

  // npm i jquery!!!!!
  closeAlert(): void {
    $('.alert').alert('close');
  }

}
