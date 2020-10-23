import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const SEARCH_DELAY_MS: number = environment.SEARCH_DELAY_MS;

@Component({
	selector: 'app-user-search-field',
	templateUrl: './user-search-field.component.html',
	styleUrls: ['./user-search-field.component.scss'],
})
export class UserSearchFieldComponent implements OnInit, OnDestroy {
	@Output() onUserSearchReq: EventEmitter<string> = new EventEmitter();

	public userSearchForm: FormGroup;
	private searchSubject: Subject<boolean> = new Subject<boolean>();
	private searchDelayMs = SEARCH_DELAY_MS;
	private searchDelaySubscription: Subscription;

	constructor(private fb: FormBuilder) {
		this.userSearchForm = this.fb.group({
			query: [''],
		});
	}

	public ngOnInit(): void {
		this.searchDelaySubscription = this.searchSubject.pipe(debounceTime(this.searchDelayMs))
			.subscribe(search => {
				if (search) { this.onSubmit(this.userSearchForm); }
			});
	}

	public ngOnDestroy(): void {
		this.searchDelaySubscription.unsubscribe();
	}

	public onSubmit(form: FormGroup): void {
		const query: string = form.value.query;
		if (query && form.valid) {
			this.onUserSearchReq.emit(query);
		}
	}

	public onInputChange(): void {
		this.searchSubject.next(true);
	}

	public onClearSearch(): void {
		this.userSearchForm.reset();
	}
}
