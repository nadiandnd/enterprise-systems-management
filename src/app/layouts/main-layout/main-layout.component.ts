import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Employees', path: '/employees' },
    { label: 'Payroll', path: '/payroll' },
    { label: 'Leave Management', path: '/leave' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Reports', path: '/reports' },
  ];

  private router = inject(Router);

  logout() {
    this.router.navigate(['/login']); // กลับไปหน้า login
  }
}
