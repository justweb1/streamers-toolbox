import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
  ],
})

export class DashboardModule {}
