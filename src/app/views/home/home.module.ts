import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserSearchFieldComponent } from './components/user-search-field/user-search-field.component';

@NgModule({
	declarations: [HomeComponent, UserSearchFieldComponent],
	imports: [
		CommonModule,
		FormsModule,
		HomeRoutingModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatTableModule,
		ReactiveFormsModule,
	],
})
export class HomeModule { }
