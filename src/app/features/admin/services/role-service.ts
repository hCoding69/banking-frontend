import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PermissionDTO } from './permission-service';

export interface Role {
  id : number | null;
  name : string;
  description : string
}

export interface Permission {
  id : number;
  name : string;
  description : string
}

export interface RoleWithPermission extends Role {
  permissions : Permission[]
}
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = environment.API_URL + '/roles';

  constructor(private http: HttpClient) {}

  getRoles() : Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}`, {withCredentials : true})
  }

  getRoleWithPermissions(roleId: number): Observable<RoleWithPermission> {
    return this.http.get<RoleWithPermission>(`${this.apiUrl}/with-permissions/${roleId}`, {withCredentials: true})
  }
  getRolesWithPermissions(): Observable<RoleWithPermission[]> {
    return this.http.get<RoleWithPermission[]>(`${this.apiUrl}/with-permissions`, {withCredentials: true})
  }

  createRole(roleReq: Role) : Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}`, roleReq, {withCredentials: true})
  }

  updateRole(roleId: number, roleReq: Role) : Observable<Role>{
    return this.http.put<Role>(`${this.apiUrl}/${roleId}`, roleReq, {withCredentials: true})
  }

  deleteRole(roleId: number): Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/${roleId}`)
  }

  addPermissionsToRole(permissions: PermissionDTO[], roleId: number){
    return this.http.post<string>(`${this.apiUrl}/${roleId}/permissions`, permissions, {withCredentials: true})
  }

  removePermissionFromRole(roleId: number, permissionId: number): Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/${roleId}/permissions/${permissionId}`, {withCredentials: true})
  }


}
