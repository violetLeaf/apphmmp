import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartScreenComponent } from './start-screen/component/start-screen.component';
import { PagenotfoundComponent } from './page-not-found/pagenotfound.component';
import { TouractComponent } from './tour-act/component/touract.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: StartScreenComponent},
  { path: 'tour-act', pathMatch: 'full', component: TouractComponent},
  { path: 'update', pathMatch: 'full', component: UpdateComponent},
  { path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
