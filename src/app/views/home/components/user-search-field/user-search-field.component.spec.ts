import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

	describe('the user search event', () => {
		it('should only emit if the field has a value and the form is valid', () => {
			spyOn(component.onUserSearchReq, 'emit');
			component.userSearchForm.get('query').setValue('test');

			component.onSubmit(component.userSearchForm);
			fixture.detectChanges();

			expect(component.userSearchForm.valid).toBeTruthy();
			expect(component.onUserSearchReq.emit).toHaveBeenCalledWith('test');
		});
	});

	describe('the user automatic search event', () => {
		it('should only emit if the field has a value and the form is valid', () => {
			spyOn(component.onUserSearchReq, 'emit');
			component.userSearchForm.get('query').setValue('test');

			component.onInputChange();
			fixture.detectChanges();

			expect(component.userSearchForm.valid).toBeTruthy();
			setTimeout(() => {
				expect(component.onUserSearchReq.emit).toHaveBeenCalledWith('test');
			}, 1500);
		});
	});

	describe('the clear input button', () => {
		it('should clear the form when clicked', () => {
			component.userSearchForm.get('query').setValue('test');

			component.onClearSearch();

			expect(component.userSearchForm.value.query).toEqual(null);
		});
	});
});
