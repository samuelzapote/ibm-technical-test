import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserSearchFieldComponent } from './user-search-field.component';

describe('UserSearchFieldComponent', () => {
	let component: UserSearchFieldComponent;
	let fixture: ComponentFixture<UserSearchFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ MatInputModule, BrowserAnimationsModule ],
			declarations: [ UserSearchFieldComponent ],
			providers: [ FormBuilder ],
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
