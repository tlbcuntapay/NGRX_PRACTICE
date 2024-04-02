import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
         path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
