import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

	constructor(private http: HttpClient) { }

	public async searchAndParseUsers(query: string): Promise<GithubUser[]> {
		const url = `${this.baseApiUrl}/search/users?q=${query}&per_page=100`;
		const result: UsersSearchResult = await this.http.get(url).toPromise().catch((e) => console.error(e)) as UsersSearchResult;
		let parsedFoundUsers: GithubUser[] = [];

		parsedFoundUsers = await Promise.all(
			result.items.map(
				async meta => {
					const userData = await this.getUserByUsername(meta.login);
					const githubUser: GithubUser = {
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

		return parsedFoundUsers;
	}

	private getUserByUsername(username: string): Promise<PartialRawUserData> {
		const url = `${this.baseApiUrl}/users/${username}`;
		return this.http.get(url).toPromise() as Promise<PartialRawUserData>;
	}
}
