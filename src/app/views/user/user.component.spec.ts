import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersService } from 'src/app/common/services/users.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;
	let usersService: UsersService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ MatDialogModule, MatSnackBarModule, RouterTestingModule, HttpClientTestingModule ],
			declarations: [ UserComponent ],
			providers: [ UsersService ],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		usersService = TestBed.inject(UsersService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('getting the avatar backgroundImage', () => {
		it('should return a compiled backgroundImage url after passing in the avatar url', () => {
			const outcome = `url('https://material.angular.io/assets/img/examples/shiba1.jpg')`;
			expect(component.getUserAvatarStyle('https://material.angular.io/assets/img/examples/shiba1.jpg')).toEqual(outcome);
		});
	});
});
