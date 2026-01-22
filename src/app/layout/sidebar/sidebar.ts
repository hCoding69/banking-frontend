import {MediaMatcher} from '@angular/cdk/layout';
import {Component, OnDestroy, inject, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

/** @title Responsive sidenav */
interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
}
@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    CommonModule,
    MatButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

readonly navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/layout'
    },
    {
      label: 'Identity & Access',
      icon: 'security',
      children: [
        { label: 'Users', icon: 'person', route: '/users' },
        { label: 'Roles', icon: 'badge', route: '/roles' },
        { label: 'Permissions', icon: 'vpn_key', route: '/permissions' }
      ]
    },
    {
      label: 'Organization',
      icon: 'apartment',
      children: [
        { label: 'Companies', icon: 'business', route: '/companies' },
        { label: 'Teams', icon: 'groups', route: '/teams' }
      ]
    },
    {
      label: 'Audit & Security',
      icon: 'fact_check',
      route: '/audit'
    },
    {
      label: 'Administration',
      icon: 'settings',
      route: '/admin'
    }
  ];

protected readonly isMobile = signal(false);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(private router : Router) {
    const media = inject(MediaMatcher);



    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

isActive(item: any): boolean {
  return this.router.url === item.route;
}
}
