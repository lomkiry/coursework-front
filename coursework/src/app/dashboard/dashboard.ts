import { Component } from '@angular/core';
import { History } from "./components/history/history";

@Component({
  selector: 'app-dashboard',
  imports: [History],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
