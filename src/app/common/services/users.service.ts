import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, forkJoin, Observable, Subscription, of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GithubError, GithubService, PartialRawUserData, UsersSearchResult } from 'src/app/core/services/github.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { GithubUser } from 'src/app/common/models/github-user.model';

@Injectable({
	providedIn: 'root',
})
export class UsersService implements OnDestroy {
	private _foundUsersBehaviorSubject: BehaviorSubject<GithubUser[]> = new BehaviorSubject([]);
	private _isSearchingBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private githubUsersSearchSubscription: Subscription;
	private currentPage = 1;
	private rateLimitExceeded = false;

	get foundUsersObservable(): Observable<GithubUser[]> {
		return this._foundUsersBehaviorSubject.asObservable();
	}

	get isSearchingObservable(): Observable<boolean> {
		return this._isSearchingBehaviorSubject.asObservable();
	}

	constructor(private githubService: GithubService, private snackbarService: SnackbarService) { }

	public ngOnDestroy(): void {
		this.githubUsersSearchSubscription.unsubscribe();
	}

	public handleSearchUsersAndAdd(query: string, loadNextPage?: boolean): void {
		this._isSearchingBehaviorSubject.next(true);
		if (this.rateLimitExceeded) {
			const customError: GithubError = { statusText: 'rate limit exceeded' };
			this.handleGithubError(customError);
			return;
		} else {
			const page = loadNextPage ? (this.currentPage + 1) : this.currentPage;
			this.githubUsersSearchSubscription = this.githubService.searchUsers(`${query}`, page)
				.subscribe(
					(result) => {
						this.currentPage = page;
						this.compileUsersAndAdd(result, loadNextPage);
					},
					(error: GithubError) => {
						this.handleGithubError(error);
					},
				);
		}
	}

	public updateLocalUserData(updatedUser: GithubUser): void {
		const updatedFoundUsers = this._foundUsersBehaviorSubject.value
			.map(oldUser => {
				if (oldUser.uid === updatedUser.uid) {
					const newUser = {...updatedUser};
					newUser.uid = oldUser.uid;
					newUser.avatarUrl = oldUser.avatarUrl;
					return {...newUser};
				}
				return oldUser;
			});
		this._foundUsersBehaviorSubject.next(updatedFoundUsers);
	}

	private compileUsersAndAdd(result: UsersSearchResult, isNextPage?: boolean): void {
		let compiledUsers: GithubUser[] = [];
		const usersObservable = forkJoin(result.items.map(userMeta => this.githubService.getUserByUsername(userMeta.login)));
		usersObservable.pipe(this.catchGithubError())
			.subscribe({
				next: (rawUsers: PartialRawUserData[]) => {
					compiledUsers = this.compileFoundUsers(rawUsers);
				},
				complete: () => {
					if (isNextPage) { compiledUsers = this.addToExistingUsers(compiledUsers); }
					this._foundUsersBehaviorSubject.next(compiledUsers);
					this._isSearchingBehaviorSubject.next(false);
				},
			});
	}

	private compileFoundUsers(rawUsers: PartialRawUserData[]): GithubUser[] {
		return rawUsers.map((rawUser) => {
			const githubUser: GithubUser = {
				uid: rawUser.id,
				name: rawUser.name,
				username: rawUser.login,
				repos: rawUser.public_repos,
				followers: rawUser.followers,
				following: rawUser.following,
				avatarUrl: rawUser.avatar_url,
				location: rawUser.location,
				company: rawUser.company,
				blog: rawUser.blog,
				twitter: rawUser.twitter,
			};
			return githubUser;
		});
	}

	private addToExistingUsers(newUsers: GithubUser[]): GithubUser[] {
		return this._foundUsersBehaviorSubject.value.concat([...newUsers]);
	}

	private catchGithubError(): OperatorFunction<unknown, unknown> {
		return catchError((error: GithubError) => of(this.handleGithubError(error)));
	}

	private handleGithubError(error: GithubError): void {
		this._isSearchingBehaviorSubject.next(false);
		this.rateLimitExceeded = error.statusText === 'rate limit exceeded';
		this.snackbarService.triggerErrorSnackbar(error);
	}
}
