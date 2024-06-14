import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberDurationFormat',
  standalone: true
})
export class NumberDurationFormatPipe implements PipeTransform {

  transform(value: number): string {
	
	const hours = Math.floor(value / 60);
	const minutes = Math.floor(value % 60);
	const seconds = Math.floor((value * 60) % 60)

	const hoursString = hours.toString().padStart(2,'0');
	const minutesString = minutes.toString().padStart(2, '0');
	const secondsString = seconds.toString().padStart(2,'0')
   
	return `${hoursString}:${minutesString}:${secondsString}`;
  }

}
