import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { UsersService } from 'src/app/common/services/users.service';
import { ProfileEditDialogComponent } from './profile-edit-dialog/profile-edit-dialog.component';
import { GithubUser } from 'src/app/common/models/github-user.model';
import { ProfileField } from './shared/models/profile-field.model';
import { environment } from 'src/environments/environment';

const DEFAULT_AVATAR_URL = environment.DEFAULT_AVATAR_URL;

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
	public user: GithubUser = null;
	public gitStatsFields: ProfileField[];
	public bioFields: ProfileField[];
	private defaultAvatarUrl = DEFAULT_AVATAR_URL;
	private usersSubscription: Subscription;
	private dialogRefSubscription: Subscription;

	constructor(
		public profileEditDialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
		private usersService: UsersService) {
		const uid = +this.route.snapshot.paramMap.get('uid');
		this.usersSubscription = this.usersService.foundUsersObservable
			.subscribe(users => {
				this.user = users.find(u => u.uid === uid);
				if (!uid || !this.user) {
					this.router.navigateByUrl('');
				} else {
					this.setProfileFields(this.user);
				}
			});
	}

	public ngOnInit(): void { }

	public ngOnDestroy(): void {
		this.usersSubscription.unsubscribe();
		if (this.dialogRefSubscription) {
			this.dialogRefSubscription.unsubscribe();
		}
	}

	public getUserAvatarStyle(avatarUrl: string): string {
		return `url('${avatarUrl ? avatarUrl : this.defaultAvatarUrl}')`;
	}

	public onNavigateBack(): void {
		this.router.navigateByUrl('');
	}

	public onEditProfile(): void {
		const dialogRef = this.profileEditDialog.open(ProfileEditDialogComponent, { panelClass: 'profile-edit-dialog', data: this.user });

		this.dialogRefSubscription = dialogRef.afterClosed()
			.subscribe(updatedValues => {
				if (updatedValues) {
					this.usersService.updateLocalUserData({ uid: this.user.uid, ...updatedValues });
				}
			});
	}

	private setProfileFields(user: GithubUser): void {
		this.gitStatsFields = [
			{ icon: 'code', name: 'Repos', value: user.repos },
			{ icon: 'person', name: 'Followers', value: user.followers },
			{ icon: 'people', name: 'Following', value: user.following },
		];
		this.bioFields = [
			{ icon: 'location_on', name: 'Location', value: user.location },
			{ icon: 'domain', name: 'Company', value: user.company },
			{ icon: 'insert_comment', name: 'Blog', value: user.blog },
			{ icon: 'public', name: 'Twitter', value: user.twitter },
		];
	}

}
