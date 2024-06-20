import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-movie-sidebar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, SidebarModule],
  templateUrl: './movie-sidebar.component.html',
  styleUrl: './movie-sidebar.component.scss'
})
export class MovieSidebarComponent {
	sidebarVisible: boolean = false
}
