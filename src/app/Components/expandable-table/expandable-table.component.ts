import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { PeriodicElement } from 'src/app/Common/Models/PeriodicElement';
import { FakeApiService } from 'src/app/Common/Services/fakeApi.service';

@Component({
  selector: 'expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandableTableComponent implements OnInit, AfterViewInit {

  isLoading : boolean = true;
  searchTxt : String = "";

  unfilteredList! : PeriodicElement[];

  dataSource = new MatTableDataSource<PeriodicElement>();


  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  
  expandedElement: PeriodicElement | null | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  modelChanged: Subject<string> = new Subject<string>();

  constructor(private router: Router, private fakeApiService: FakeApiService) {
    this.modelChanged.pipe(
      debounceTime(600), 
      distinctUntilChanged())
      .subscribe((model) => {
        if(model == null || model == undefined || model.trim() == ""){
          this.dataSource = new MatTableDataSource(this.unfilteredList);
        }else{
          var filteredList = this.unfilteredList.filter(a => a.name.includes(model))
          this.dataSource = new MatTableDataSource(filteredList);
        }
      });
  }

  ngOnInit(): void {
    this.getElements();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addNewElement(){
    this.router.navigate(['/addelement']);
  }


  getElements(){
    this.fakeApiService.getElements().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.unfilteredList = data;
      this.isLoading = false;
    });
  }
  
  sortData() {
    this.dataSource.sort = this.sort;
  }

  onSearch(searchedText: string){
    this.modelChanged.next(searchedText);
  }

}
