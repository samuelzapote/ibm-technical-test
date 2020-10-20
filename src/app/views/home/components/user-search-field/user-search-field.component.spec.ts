import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchFieldComponent } from './user-search-field.component';

describe('UserSearchFieldComponent', () => {
	let component: UserSearchFieldComponent;
	let fixture: ComponentFixture<UserSearchFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ UserSearchFieldComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserSearchFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
