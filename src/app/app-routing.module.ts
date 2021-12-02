import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpandableTableComponent } from './Components/expandable-table/expandable-table.component';
import { NewElementComponent } from './Components/new-element/new-element.component';

const routes: Routes = [
  
  { path: '', component: ExpandableTableComponent, pathMatch: 'full' },
  { path: 'addelement', component: NewElementComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
