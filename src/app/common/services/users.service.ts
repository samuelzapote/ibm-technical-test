import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { GithubService } from 'src/app/core/services/github.service';
import { GithubUser } from 'src/app/common/models/github-user.model';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	private foundUsersBehaviorSubject: BehaviorSubject<GithubUser[]> = new BehaviorSubject([]);

	get foundUsers(): Observable<GithubUser[]> {
		return this.foundUsersBehaviorSubject.asObservable();
	}

	constructor(private githubService: GithubService) { }

	public async searchUsersAndAdd(query: string): Promise<void> {
		const githubUsers: GithubUser[] = await this.githubService.searchAndParseUsers(`${query}`);
		this.foundUsersBehaviorSubject.next(githubUsers);
	}

	public updateLocalUserData(updatedValues: GithubUser): void {
		const updatedFoundUsers = this.foundUsersBehaviorSubject.value
			.map(oldUser => {
				if (oldUser.uid === updatedValues.uid) {
					const { name, username, repos, followers, following, location, company, blog, twitter } = updatedValues;
					const newUser: GithubUser = {
						uid: oldUser.uid,
						name,
						username,
						repos,
						followers,
						following,
						avatarUrl: oldUser.avatarUrl,
						location,
						company,
						blog,
						twitter,
					};
					return newUser;
				}
			});
		this.foundUsersBehaviorSubject.next(updatedFoundUsers);
	}
}
