import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProfileEditDialogComponent } from './profile-edit-dialog.component';

describe('ProfileEditDialogComponent', () => {
	let component: ProfileEditDialogComponent;
	let fixture: ComponentFixture<ProfileEditDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ MatDialogModule ],
			declarations: [ ProfileEditDialogComponent ],
			providers: [
				{ provide: MAT_DIALOG_DATA, useValue: {} },
				{ provide: MatDialogRef, useValue: {} },
			],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileEditDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
