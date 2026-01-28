import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Home } from './dashboard/home/home';
import { AuthGuard } from './guards/auth.guard';
import { WaitingScreen } from './auth/waiting-screen/waiting-screen';
import { EmptyComponent } from './auth/empty-component/empty-component';
import { RedirectGuard } from './guards/redirect.guard';
import { LoginGuard } from './guards/login.guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { Roles } from './features/admin/pages/roles/roles';
import { Title } from '@angular/platform-browser';
import { CreateRole } from './features/admin/pages/create-role/create-role';


export const routes: Routes = [
  
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/register', component: Register},
    { path: 'auth/login', component: Login, canActivate: [LoginGuard]},
    { path: 'dashboard/home', component: Home, canActivate: [AuthGuard] },
    { path: 'auth/waiting-screen', component: WaitingScreen, canActivate: [AuthGuard] },
    { path: 'auth/redirect', canActivate: [RedirectGuard], component: EmptyComponent},
    { path: 'forbidden', component: EmptyComponent },
    {
    path: 'admin',
    component: MainLayout,
    children: [
      { path: 'roles/create',
        component: CreateRole,
        data : {
          title : "Create role"
        }
      },
      { path: 'roles',
        component: Roles,
        data : {
          title : "Roles & Permissions"
        }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ]
  }





];
