import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { GithubError } from 'src/app/core/services/github.service';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {

	constructor(private snackBar: MatSnackBar) { }

	public triggerErrorSnackbar(error: GithubError): void {
		this.snackBar.open(
			`Github API has failed with the following error message: "${error.statusText}"`,
			'Ok',
			{ duration: 5000, verticalPosition: 'top' },
		);
	}
}
