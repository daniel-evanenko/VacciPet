import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { signInComponent } from './components/login/signIn.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/partials/header/header.component';

const routes: Routes = [
  {
    path:'',component:HeaderComponent
  },
  {
    path:'login',component:signInComponent
  },
  {
    path:'register',component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
