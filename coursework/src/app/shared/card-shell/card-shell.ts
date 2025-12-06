import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-shell',
  imports: [MatCardModule],
  templateUrl: './card-shell.html',
  styleUrl: './card-shell.scss',
})

export class CardShellComponent {
  @Input() title: string = '';
}