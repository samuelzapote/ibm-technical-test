import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { UsersTableService } from './services/users-table.service';
import { GithubUser } from 'src/app/common/models/github-user.model';

interface TableColumn {
	label: string;
	name: string;
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
	private foundUsersSubscription: Subscription;

	constructor(private usersTableService: UsersTableService, private snackBar: MatSnackBar) {
		this.foundUsersSubscription =
			this.usersTableService.foundUsers
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
		this.searching = true;
		this.usersTableService
			.searchUsersAndAdd(query)
				.then(() => { this.searching = false; })
					.catch((error: { statusText: string; }) => {
						console.log(error);
						this.searching = false;
						this.triggerErrorSnackbar(error);
					});
	}

	private triggerErrorSnackbar(error: { statusText: string; }): void {
		this.snackBar.open(
			`Github API has failed with the following error message: "${error.statusText}"`,
			'Ok',
			{ duration: 5000, verticalPosition: 'top' },
		);
	}
}
