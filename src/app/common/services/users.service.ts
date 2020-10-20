import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { UsersServiceModule } from './users.service.module';
import { GithubService } from 'src/app/core/services/github.service';
import { GithubUser } from 'src/app/common/models/github-user.model';

@Injectable({
	providedIn: UsersServiceModule
})
export class UsersService {
	public foundUsersBS: BehaviorSubject<GithubUser[]> = new BehaviorSubject([]);

	get foundUsers(): Observable<GithubUser[]> {
		return this.foundUsersBS.asObservable();
	}

	constructor(private githubService: GithubService) { }

	public async searchUsersAndAdd(query: string): Promise<void> {
		const githubUsers: GithubUser[] = await this.githubService.searchAndParseUsers(`${query}`);
		this.foundUsersBS.next(githubUsers);
	}
}
