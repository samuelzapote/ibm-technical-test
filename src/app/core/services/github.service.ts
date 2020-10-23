import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface PartialUserMetadata {
	id: number;
	login: string;
}

export interface UsersSearchResult {
	total_count: number;
	incomplete_results: boolean;
	items: PartialUserMetadata[];
}

export interface GithubError {
	statusText: 'rate limit exceeded';
}

export interface PartialRawUserData {
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

	constructor(private http: HttpClient) { }

	public searchUsers(query: string, page: number): Observable<UsersSearchResult> {
		if (!query) { console.log('invalid query!'); return; }
		const url = this.generateUsersSearchByPageUrl(query, page);
		console.log(`Searching Users Metadata at ${url}`);
		return this.http.get(url) as Observable<UsersSearchResult>;

	}

	public getUserByUsername(username: string): Observable<PartialRawUserData> {
		const url = this.generateUserSearchUrl(username);
		return this.http.get(url) as Observable<PartialRawUserData>;
	}

	private generateUsersSearchByPageUrl(query: string, page: number): string {
		return `${this.baseApiUrl}/search/users?q=${query}&per_page=20&page=${page}`;
	}

	private generateUserSearchUrl(username: string): string {
		return `${this.baseApiUrl}/users/${username}`;
	}

}
