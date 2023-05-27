import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes-list' },
  { path: 'heroes-list', component: HeroesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
