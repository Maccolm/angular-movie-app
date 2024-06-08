import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
	movies = [
		{
			link: 'https://www.imdb.com/title/tt17279496/',
			backdrop_path: "/assets/img/civil-war.webp",
			back_img: "/assets/img/background/back-civil-war.jpeg",
			id: 653346,
			overview: "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
			release_date: "2024-04-10",
			title: "Civil War",
			minutes: '117 min',
			type: "Action, Crime, Fantasy",
			rating: 8.5
		},
		{
			link: 'https://www.imdb.com/title/tt1630029/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_avatar%25202',
			backdrop_path: '/assets/img/avatar2.jpg',
			back_img: '/assets/img/background/back-avatar2.jpg',
			id: 141052,
			overview: 'Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet.',
			release_date: '2022-12-16',
			title: 'Avatar: The Way of Water',
			minutes: '192 min',
			type: 'Action, Adventure, Fantasy',
			rating: 7.6
		},
		{
			link: 'https://www.imdb.com/title/tt5090568/?ref_=nv_sr_srsg_0_tt_7_nm_1_q_Transformers%253A%2520Rise%2520of%2520the%2520Beasts',
			backdrop_path: '/assets/img/transformers.jpg',
			back_img: '/assets/img/background/back-transformers.jpg',
			id: 300668,
			overview: 'In 1987, a battle-scarred and broken Optimus Prime turns to Bumblebee for help as he struggles to hold the Autobots together.',
			release_date: '2023-06-09',
			title: 'Transformers: Rise of the Beasts',
			minutes: '117 min',
			type: 'Action, Adventure, Sci-Fi',
			rating: 6.8
		},
		{
			link: 'https://www.imdhttps://www.imdb.com/title/tt3480822/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_black%2520widb.com/title/tt6146586/',
			backdrop_path: '/assets/img/black-widow.jpg',
			back_img: '/assets/img/background/back-black-widow.jpg',
			id: 497698,
			overview: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.',
			release_date: '2021-07-09',
			title: 'Black Widow',
			minutes: '134 min',
			type: 'Action, Adventure, Sci-Fi',
			rating: 6.7
		},
		{
			link: 'https://www.imdb.com/title/tt10872600/',
			backdrop_path: '/assets/img/spider-man.jpg',
			back_img: '/assets/img/background/back-spider-man.jpg',
			id: 634649,
			overview: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
			release_date: '2021-12-17',
			title: 'Spider-Man: No Way Home',
			minutes: '148 min',
			type: 'Action, Adventure, Fantasy',
			rating: 8.4
		},
		{
			link: 'https://www.imdb.com/title/tt2382320/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_No%2520Time%2520to%2520Die',
			backdrop_path: '/assets/img/no-time-to-die.jpg',
			back_img: '/assets/img/background/back-no-time-to-die.jpg',
			id: 379686,
			overview: 'James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.',
			release_date: '2021-10-08',
			title: 'No Time to Die',
			minutes: '163 min',
			type: 'Action, Adventure, Thriller',
			rating: 7.3
		}
	]
}
