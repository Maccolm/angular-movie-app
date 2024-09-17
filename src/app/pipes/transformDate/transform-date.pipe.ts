import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate',
  standalone: true
})
export class TransformDatePipe implements PipeTransform {

  transform(value: string): string {
	const date = new Date(value);
	const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

	 const day = date.getDate();
	 const month = months[date.getMonth()];
	 const year = date.getFullYear();

	 let hours = date.getUTCHours();
	 const minutes = date.getUTCMinutes().toString().padStart(2, '0');
	 const ampm = hours >= 12 ? 'PM' : 'AM';

    return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
  }

}
