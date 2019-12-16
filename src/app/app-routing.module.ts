import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ useHash: true }),
  ],
  exports: [
    RouterModule,
  ],
})

export class AppRoutingModule {}
