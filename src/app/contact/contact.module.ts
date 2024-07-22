import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLComponent } from './cl/cl.component';
import { CFComponent } from './cf/cf.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[{
  path:'',
  component:CLComponent
}]

@NgModule({
  declarations: [CLComponent, CFComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ContactModule { }
