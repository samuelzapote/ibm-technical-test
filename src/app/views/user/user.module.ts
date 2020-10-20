import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileEditDialogComponent } from './profile-edit-dialog/profile-edit-dialog.component';

@NgModule({
	declarations: [UserComponent, ProfileEditDialogComponent],
	imports: [
		CommonModule,
		FormsModule,
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatDividerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		ReactiveFormsModule,
		UserRoutingModule,
	]
})
export class UserModule { }
