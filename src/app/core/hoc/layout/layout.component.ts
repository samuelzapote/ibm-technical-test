import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	@HostBinding('class.bx--header') headerClass = true;

	constructor() { }

	ngOnInit(): void {
	}

}
