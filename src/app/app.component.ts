import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchMemberComponent } from './search-member/search-member.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,  RouterOutlet , SearchMemberComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employees';
}
