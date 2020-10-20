import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
	},
	{
		path: 'users',
		loadChildren: () => import ('./views/user/user.module').then(m => m.UserModule),
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
