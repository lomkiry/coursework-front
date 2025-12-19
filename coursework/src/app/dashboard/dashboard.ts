import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardHistory } from './components/dashboard-history/dashboard-history';
import { DashboardDiagram } from "./components/dashboard-diagram/dashboard-diagram";
import { DashboardSummary } from './components/dashboard-summary/dashboard-summary';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHistory, MatGridListModule, DashboardDiagram, DashboardSummary],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
