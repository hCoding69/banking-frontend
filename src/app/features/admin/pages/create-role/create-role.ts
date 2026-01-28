import { Component } from '@angular/core';
import { Heading } from "../../../../shared/components/heading/heading";
import { ActivatedRoute, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-create-role',
  imports: [Heading],
  templateUrl: './create-role.html',
  styleUrl: './create-role.scss',
})
export class CreateRole {
  title =  ''

  constructor(route: ActivatedRoute) { 
    this.title = route.snapshot.data['title'] 

  }

}
