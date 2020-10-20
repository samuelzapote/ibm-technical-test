import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { GithubUser } from 'src/app/common/models/github-user.model';
import { environment } from 'src/environments/environment';

interface PartialUserMetadata {
	id: number;
	login: string;
}

interface UsersSearchResult {
	total_count: number;
	incomplete_results: boolean;
	items: PartialUserMetadata[];
}

interface PartialRawUserData {
	id: number;
	name: string;
	login: string;
	public_repos: number;
	followers: number;
	following: number;
	avatar_url: string;
	location: string;
	company: string;
	blog: string;
	twitter: string;
}

const BASE_API_URL = environment.BASE_GITHUB_API_URL;

@Injectable({
	providedIn: 'root',
})
export class GithubService {
	private baseApiUrl: string = BASE_API_URL;
	private currentPageBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject(1);
	private currentQueryBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject('');

	get currentPage(): number {
		return this.currentPageBehaviorSubject.value;
	}

	get currentQuery(): string {
		return this.currentQueryBehaviorSubject.value;
	}

	constructor(private http: HttpClient) { }

	public async searchAndParseUsers(query: string, nextPage?: number): Promise<GithubUser[]> {
		if (this.currentQuery !== query) {
			this.currentQueryBehaviorSubject.next(query);
			this.currentPageBehaviorSubject.next(1);
		}
		const url = `${this.baseApiUrl}/search/users?q=${this.currentQuery}&per_page=20&page=${nextPage ? nextPage : this.currentPage}`;
		const result: UsersSearchResult = await this.http.get(url).toPromise() as UsersSearchResult;
		let parsedFoundUsers: GithubUser[] = [];

		parsedFoundUsers = await Promise.all(
			result.items.map(
				async meta => {
					const userData: PartialRawUserData = await this.getUserByUsername(meta.login);
					const githubUser: GithubUser = {
						uid: userData.id,
						name: userData.name,
						username: userData.login,
						repos: userData.public_repos,
						followers: userData.followers,
						following: userData.following,
						avatarUrl: userData.avatar_url,
						location: userData.location,
						company: userData.company,
						blog: userData.blog,
						twitter: userData.twitter,
					};
					return githubUser;
				}
			)
		);

		if (nextPage) {
			this.currentPageBehaviorSubject.next(nextPage);
		}

		return parsedFoundUsers;
	}

	public loadNextPageOfUsers(): Promise<GithubUser[]> {
		const nextPage: number = this.currentPage + 1;
		return this.searchAndParseUsers(this.currentQuery, nextPage);
	}

	private getUserByUsername(username: string): Promise<PartialRawUserData> {
		const url = `${this.baseApiUrl}/users/${username}`;
		return this.http.get(url).toPromise() as Promise<PartialRawUserData>;
	}
}
