import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageInMonths'
})
export class AgeInMonthsPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '-';
    if(value == 0) return 'new';

    const years = Math.floor(value / 12);
    const months = value % 12;

    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }

    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }

    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  }
}
