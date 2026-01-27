import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-heading',
  imports: [MatToolbarModule],
  templateUrl: './heading.html',
  styleUrl: './heading.scss',
})
export class Heading {
  @Input() title!: string;
}
