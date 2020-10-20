import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-user-search-field',
	templateUrl: './user-search-field.component.html',
	styleUrls: ['./user-search-field.component.scss'],
})
export class UserSearchFieldComponent implements OnInit {
	@Output() onUserSearchReq: EventEmitter<string> = new EventEmitter();

	public userSearchForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.userSearchForm = this.fb.group({
			query: [''],
		});
	}

	public ngOnInit(): void { }

	public onSubmit(form: FormGroup): void {
		const query: string = form.value.query;
		if (query && form.valid) {
			this.onUserSearchReq.emit(query);
		}
	}
}
