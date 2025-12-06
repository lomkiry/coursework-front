import { Component, signal } from '@angular/core';
import { Header } from './shared/layout/header/header';
import { Main } from './shared/layout/main/main';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [Header, Main],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('coursework');
}
