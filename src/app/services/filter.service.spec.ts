import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { filteredAttributes } from '../models/filter.models';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('it should set and emit filtered attributes', (done) => {
    const testFilters: filteredAttributes = {
		genres: [23,28],
		year: 2023,
		page: 1
	 };
	 service.$filteredAttributes.subscribe((filters) => {
		expect(filters).toEqual(testFilters);
		done();
	 });
	 service.setFilters(testFilters);
  });
});
