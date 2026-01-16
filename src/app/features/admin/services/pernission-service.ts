import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';



export interface Permission{
  id : number | null;
  name : string;
  description : string;
}
@Injectable({
  providedIn: 'root'
})
export class PernissionService {

  private apiUrl = environment.API_URL + '/permissions';

  constructor(
    private http : HttpClient
  ) {}

  getPermissions(): Observable<Permission> {
    return this.http.get<Permission>(`${this.apiUrl}`, {withCredentials: true});
  }

  createPermission(req : Permission) : Observable<Permission> {
    return this.http.post<Permission>(`${this.apiUrl}`, req, {withCredentials: true})
  }

  updatePermission(id:number, req : Permission) : Observable<Permission> {
    return this.http.post<Permission>(`${this.apiUrl}/${id}`, req, {withCredentials: true})
  }

  deletePermission(id:number) : Observable<Permission> {
    return this.http.post<Permission>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }






}
