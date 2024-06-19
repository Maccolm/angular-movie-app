import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule],
  templateUrl: './movie-sidebar.component.html',
  styleUrl: './movie-sidebar.component.scss'
})
export class MovieSidebarComponent {
	visibleSidebar: boolean = true
}
