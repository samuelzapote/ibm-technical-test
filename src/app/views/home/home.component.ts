import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

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
	public isSearching: Observable<boolean> = this.usersService.isSearchingObservable;
	private currentQuery: string;
	private foundUsersSubscription: Subscription;

	constructor(private usersService: UsersService, private router: Router) {
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

	public onUserSearch(query: string): void {
		this.currentQuery = query;
		this.usersService.handleSearchUsersAndAdd(this.currentQuery);
	}

	public onUserClicked(user: GithubUser): void {
		this.router.navigate([`users/${user.uid}`]);
	}

	public onPageChange(e: PageChangeEvent): void {
		if (this.isOnTheLastPage(e)) {
			console.log('ON THE LAST PAGE, STARTING SEARCH');
			const loadNextPage = true;
			this.usersService.handleSearchUsersAndAdd(this.currentQuery, loadNextPage);
		}
	}

	private isOnTheLastPage(event: PageChangeEvent): boolean {
		const lastPage = event.length / event.pageSize;
		const activePage = (event.pageIndex + 1);
		return activePage === lastPage;
	}
}
