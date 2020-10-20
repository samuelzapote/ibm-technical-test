export interface GithubUser {
	name: string;
	username: string;
	repos: number;
	followers: number;
	following: number;
	avatarUrl?: string;
	location?: string;
	company?: string;
	blog?: string;
	twitter?: string;
}
