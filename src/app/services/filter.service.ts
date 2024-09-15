import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filteredAttributes } from '../models/filter.models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
	private filtersSubject = new BehaviorSubject<filteredAttributes>({});
	$filteredAttributes = this.filtersSubject.asObservable();

	setFilters(filters: any){
		this.filtersSubject.next(filters);
	}
}
