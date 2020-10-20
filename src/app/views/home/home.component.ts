import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { UsersService } from 'src/app/common/services/users.service';
import { GithubUser } from 'src/app/common/models/github-user.model';

interface TableColumn {
	label: string;
	name: string;
}

interface PageChangeEvent {
	length: number;
	pageIndex: number;
	pageSize: number;
	previousPageIndex: number;
}

interface GithubError {
	statusText: string;
}

const COLUMNS_REG: TableColumn[] = [
	{ label: 'Name', name: 'name' },
	{ label: 'Username', name: 'username' },
	{ label: 'Repos', name: 'repos' },
	{ label: 'Followers', name: 'followers' },
	{ label: 'Following', name: 'following' },
];

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild(MatPaginator) paginator: MatPaginator;

	public columnsReg: TableColumn[] = COLUMNS_REG;
	public displayedColumns: string[] = this.columnsReg.map(c => c.name);
	public dataSource: MatTableDataSource<GithubUser> = new MatTableDataSource();
	public searching = false;
	public searchError = '';
	private rateLimitExceeded = false;
	private foundUsersSubscription: Subscription;

	constructor(private usersService: UsersService, private snackBar: MatSnackBar, private router: Router) {
		this.foundUsersSubscription = this.usersService.foundUsersObservable
			.subscribe(users => { this.dataSource.data = users; });
	}

	public ngOnInit(): void { }

	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	public ngOnDestroy(): void {
		this.foundUsersSubscription.unsubscribe();
	}

	public async onUserSearch(query: string): Promise<void> {
		console.log(this.rateLimitExceeded);
		if (this.rateLimitExceeded) {
			const customError: GithubError = { statusText: 'rate limit exceeded' };
			this.triggerErrorSnackbar(customError);
		} else {
			this.searching = true;
			this.usersService.searchUsersAndAdd(query)
				.then(() => { this.searching = false; })
				.catch((error: GithubError) => { this.handleGithubError(error); });
		}
	}

	public onUserClicked(user: GithubUser): void {
		this.router.navigate([`users/${user.uid}`]);
	}

	public onPageChange(e: PageChangeEvent): void {
		if (this.isOnTheLastPage(e) && !this.rateLimitExceeded) {
			this.searching = true;
			this.usersService.handleLastPageLoad()
				.then(() => { this.searching = false; })
				.catch((error: GithubError) => { this.handleGithubError(error); });
		}
	}

	private handleGithubError(error: GithubError): void {
		this.searching = false;
		if (error.statusText === 'rate limit exceeded') {
			this.rateLimitExceeded = true;
		}
		this.triggerErrorSnackbar(error);
	}

	private isOnTheLastPage(event: PageChangeEvent): boolean {
		const pages = event.length / event.pageSize;
		const isLastPage = (event.pageIndex + 1) === pages;
		return isLastPage;
	}

	private triggerErrorSnackbar(error: GithubError): void {
		this.snackBar.open(
			`Github API has failed with the following error message: "${error.statusText}"`,
			'Ok',
			{ duration: 5000, verticalPosition: 'top' },
		);
	}
}
