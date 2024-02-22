import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { JavaComponent } from './component/java/java.component';
import { AngularComponent } from './component/angular/angular.component';
import { CheatComponent } from './component/cheat/cheat.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'java', component: JavaComponent },
  {path: 'angular', component: AngularComponent },
  {path: 'cheat', component: CheatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
