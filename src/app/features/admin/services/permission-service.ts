import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PermissionDTO {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUrl = environment.API_URL + '/permissions';

  constructor(private http: HttpClient) {}

  getAllPermissions(): Observable<PermissionDTO[]> {
    return this.http.get<PermissionDTO[]>(this.apiUrl, {withCredentials: true});
  }

  // ✅ Get permission by id
  getPermissionById(id: number): Observable<PermissionDTO> {
    return this.http.get<PermissionDTO>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  createPermission(permission: PermissionDTO): Observable<PermissionDTO> {
    return this.http.post<PermissionDTO>(this.apiUrl, permission, {withCredentials: true});
  }

  updatePermission(id: number, permission: PermissionDTO): Observable<PermissionDTO> {
    return this.http.put<PermissionDTO>(`${this.apiUrl}/${id}`, permission, {withCredentials: true});
  }

  deletePermission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
}
