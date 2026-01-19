import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AddressRequest, ClientRequest, ClientService } from '../../services/client/client-service';
import { Observable } from 'rxjs';
import { Role, RoleService } from '../../features/admin/services/role-service';
import { PermissionDTO, PermissionService } from '../../features/admin/services/permission-service';

@Component({
  selector: 'app-waiting-screen',
  imports: [CommonModule],
  templateUrl: './waiting-screen.html',
  styleUrl: './waiting-screen.scss',
})
export class WaitingScreen {
  message : string = '';
  userStatus: string = '';
  userId: number = 0 ;
  constructor(private authService: AuthService,
              private roleService: RoleService,
              private router: Router,
              private http: HttpClient,
              private clientService: ClientService,
              private permissionService: PermissionService
            ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user=> {
      console.log('Current user status:', user);
      this.userStatus = user?.userStatus || '';
      this.userId = user?.id || 0;
    });


  }


  logout() {
    this.authService.logout().subscribe({
      next : (response)=>{
        this.router.navigate(['/auth/login']);
      },
      error : (error) =>{
        console.error('Logout failed:', error);
        this.message = error.error.error || 'Logout failed. Please try again.';
      }
    })
  }

  isUserInactive(): boolean {
    return this.userStatus === 'INACTIVE';
  }

  isUserActive(): boolean {
    return this.userStatus === 'ACTIVE';
  }
  isUserSuspended(): boolean {
    return this.userStatus === 'SUSPENDED';
  }
  isUserBlocked():boolean {
    return this.userStatus === 'BLOCKED'
  }
  testClientService(){
    this.http.get(`http://localhost:8083/api/me`, {withCredentials: true}).subscribe({
      next: (response) => {
        console.log(response)
      },

      error: (error) =>{
        console.log(error)
      }
    })
  }

  assignRole() {
    const body = {
      roleId: 5, // ID du rôle à attribuer
      userId: 4  // ID de l'utilisateur
    };
    this.http.post<any>('http://localhost:8082/api/users/roles/assign-role', body, {withCredentials: true} ).subscribe({
      next: (res) => console.log('Succès:', res),
      error: (err) => console.error('Erreur:', err)
    });
  }
  permission : PermissionDTO = {
    "name": "VIEW_CUSTOMERS",
    "description": "Consulter les informations des clients, lecture seule."
  }
  createClient(){
    this.permissionService.createPermission(this.permission).subscribe({
      next: (response) =>{
        console.log("Permissions: ", response)
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }
}
