import { Component } from '@angular/core';
import { CardShellComponent } from "../../../shared/card-shell/card-shell";
import { History } from '../../../history/history';
@Component({
  selector: 'app-dashboard-history',
  imports: [History, CardShellComponent],
  templateUrl: './dashboard-history.html',
  styleUrl: './dashboard-history.scss',
})
export class DashboardHistory {

}
