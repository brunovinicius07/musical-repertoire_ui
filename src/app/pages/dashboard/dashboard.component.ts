import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  userName = sessionStorage.getItem("username") || "Usuário";

  sidebarCollapsed = false;
  darkMode = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  goToRepertorios() {
    this.router.navigate(['/musicas']);
  }
  goToAgenda() {
    this.router.navigate(['/agenda']);
  }
  goToMusicos() {
    this.router.navigate(['/musicos']);
  }

  logout() {
    document.body.classList.remove("dark-mode");
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.cdr.detectChanges();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("theme", this.darkMode ? "dark" : "light");
  }

  applyResponsiveSidebar() {
    if (window.innerWidth <= 938) {
      this.sidebarCollapsed = true;
    } else {
      this.sidebarCollapsed = false;
    }
  }

  ngOnInit() {
    this.darkMode = localStorage.getItem('theme') === 'dark';
    document.body.classList.toggle("dark-mode", this.darkMode);

    this.applyResponsiveSidebar();

    window.addEventListener("resize", () => {
      this.applyResponsiveSidebar();
      this.cdr.detectChanges();
    });
  }
}
