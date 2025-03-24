import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LoginStore } from '../../store/login.store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  readonly store = inject(LoginStore);
  private router = inject(Router);

  menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Employees', path: '/employees' },
    { label: 'Payroll', path: '/payroll' },
    { label: 'Leave Management', path: '/leave' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Reports', path: '/reports' },
  ];

  logout() {
    this.router.navigate(['/']);
    this.store.logout();
  }
}
