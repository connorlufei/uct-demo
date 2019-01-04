import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail.component';

const routes: Routes = [
  { path: 'new', component: DetailComponent },
  { path: 'duplicate/:id', component: DetailComponent },
  { path: 'edit/:id', component: DetailComponent },
  { path: '', component: DetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DetailRoutingModule { }
