import { Routes } from '@angular/router';
import { SearchMemberComponent } from './search-member/search-member.component';

export const routes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: 'employees', component: SearchMemberComponent },
    {
        path: '**',
        redirectTo: '',
    },
];
