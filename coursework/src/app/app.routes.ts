import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Transactions } from './transactions/transactions-list';
import { History } from './history/history';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },

    { path: 'transactions', component: Transactions},

    { path: 'history', component: History},

    { path: '**', redirectTo: 'dashboard' }
];
