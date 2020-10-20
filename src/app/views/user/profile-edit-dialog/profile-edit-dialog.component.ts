import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GithubUser } from 'src/app/common/models/github-user.model';

interface ProfileEditField {
	name: string;
	pattern: string;
}

const PROFILE_FIELDS: ProfileEditField[] = [
	{ name: 'name', pattern: '[a-zA-Z ]*' },
	{ name: 'username', pattern: '[a-zA-Z ]*' },
	{ name: 'repos', pattern: '[0-9 ]*' },
	{ name: 'followers', pattern: '[0-9 ]*' },
	{ name: 'following', pattern: '[0-9 ]*' },
	{ name: 'location', pattern: null },
	{ name: 'company', pattern: null },
	{ name: 'blog', pattern: null },
	{ name: 'twitter', pattern: '[a-zA-Z ]*' },
];

@Component({
	selector: 'app-profile-edit-dialog',
	templateUrl: 'profile-edit-dialog.component.html',
	styleUrls: ['profile-edit-dialog.component.scss'],
})
export class ProfileEditDialogComponent {
	public profileEditForm: FormGroup = new FormGroup({});
	public profileFields: ProfileEditField[] = PROFILE_FIELDS;

	constructor(
		@Inject(MAT_DIALOG_DATA) public user: GithubUser,
		public dialogRef: MatDialogRef<ProfileEditDialogComponent>) {
		this.profileFields.forEach(field => {
			this.profileEditForm.addControl(field.name, new FormControl(user[field.name]));
		});
	}

}
