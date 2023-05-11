import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/config/guards/auth.guard';

export const MODULE_LAYOUT: Routes = [
    {
        path: '',
        canActivate: [AuthGuard], 
        loadChildren: () => import('../../modules-sgsst.module').then((m) => m.ModulesSgsstModule),
    },
];