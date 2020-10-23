import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersService } from './users.service';

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule, MatSnackBarModule ],
		});
		service = TestBed.inject(UsersService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
