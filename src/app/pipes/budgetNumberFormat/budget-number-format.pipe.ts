import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'budgetNumberFormat',
  standalone: true
})
export class BudgetNumberFormatPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString();
  }

}
