import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIShellModule } from 'carbon-components-angular';
import { NotificationModule } from '@carbon/icons-angular';
import { UserAvatarModule } from '@carbon/icons-angular';
import { AppSwitcherModule } from '@carbon/icons-angular';

import { HeaderComponent } from './hoc/header/header.component';
import { LayoutComponent } from './hoc/layout/layout.component';

@NgModule({
	declarations: [HeaderComponent, LayoutComponent],
	imports: [
		CommonModule,
		UIShellModule,
		NotificationModule,
		UserAvatarModule,
		AppSwitcherModule,
	],
	exports: [
		LayoutComponent,
		UIShellModule,
	],
})
export class CoreModule { }
