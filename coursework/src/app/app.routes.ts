import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { History } from './history/history';
import { Category } from './category/category';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },

    { path: 'history', component: History},

    { path: 'category', component: Category},

    { path: '**', redirectTo: 'dashboard' }
];
