import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './hoc/header/header.component';
import { LayoutComponent } from './hoc/layout/layout.component';

@NgModule({
	declarations: [HeaderComponent, LayoutComponent],
	imports: [
		CommonModule,
	],
	exports: [
		LayoutComponent,
	],
})
export class CoreModule { }
