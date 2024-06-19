import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';


@Component({
  selector: 'app-movie-sidebar',
  standalone: true,
  imports: [SidebarModule ],
  templateUrl: './movie-sidebar.component.html',
  styleUrl: './movie-sidebar.component.scss'
})
export class MovieSidebarComponent {
	visibleSidebar: boolean = true
}
