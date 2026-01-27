import { Component } from '@angular/core';
import { Heading } from '../../../../shared/components/heading/heading';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { TableColumn, TableComponent } from "../../../../shared/components/table/table";
import Table from '@mui/material/Table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { Permission, Role, RoleService, RoleWithPermission } from '../../services/role-service';




@Component({
  selector: 'app-roles',
  imports: [Heading, MatTableModule, TableComponent, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles {
  title : string = "";
  roles : Role[] = []
  permissions: RoleWithPermission[] = []
  constructor(private route : ActivatedRoute, private roleService : RoleService){
    const data = route.snapshot.data;
    this.title = data['title'];
  }

  columns : TableColumn[] = [
    {
      columnDef: "id",
      header: "ID"
    },
    {
      columnDef: "name",
      header: "Name",
      format: (value: string) => value.replace("ROLE_", "").replaceAll("_", " ").toLowerCase()
    },
    {
      columnDef: "permissions",
      header: "Permissions",
 format: (value: Permission[], row: RoleWithPermission) => {
      if (!row.permissions || row.permissions.length === 0) return '-';
      return row.permissions.map(p => p.name).join(', '); // simple text
    }    },
    {
      columnDef: 'actions',
      header: '',
      actions: [
        {
          label: 'Edit role',
          icon: 'edit',
          action: (role) => this.editRole(role)
        },
        {
          label: 'Delete role',
          icon: 'delete',
          visible: (role) => role.name !== 'ROLE_SUPER_ADMIN',
          action: (role) => this.deleteRole(role)
        }
      ]
    }


  ]

  ngOnInit(){
    this.getRoles()
  }

  getRoles()  {
    this.roleService.getRolesWithPermissions().subscribe({
      next : (response) => {
        console.log(response)
  this.roles = [...response]; // new reference

      },
      error : (error) => {
        console.log(error)
      }
    })
  }
editRole(role: Role) {
  console.log("Edit", role);
}

deleteRole(role: Role) {
  console.log("Delete", role);
}



}
