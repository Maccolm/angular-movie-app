import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractYearFromDate',
  standalone: true
})
export class ExtractYearFromDatePipe implements PipeTransform {

  transform(value: string): string {
    return value ? value.substring(0, 4) : '';
  }
}
