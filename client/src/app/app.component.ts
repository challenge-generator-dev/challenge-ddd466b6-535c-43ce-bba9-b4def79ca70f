import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Sistema de Órdenes en Tiempo Real</h1>
        <nav class="app-nav">
          <a routerLink="/orders" routerLinkActive="active">Órdenes</a>
        </nav>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>© 2024 Sistema de Gestión de Órdenes</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    .app-header h1 {
      margin: 0 0 0.5rem 0;
      font-size: 1.75rem;
      font-weight: 600;
    }

    .app-nav {
      display: flex;
      gap: 1rem;
    }

    .app-nav a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .app-nav a:hover,
    .app-nav a.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .app-main {
      flex: 1;
      padding: 2rem;
      background-color: #f5f7fa;
    }

    .app-footer {
      background-color: #2d3748;
      color: white;
      padding: 1rem 2rem;
      text-align: center;
    }

    .app-footer p {
      margin: 0;
      font-size: 0.875rem;
    }
  `]
})
export class AppComponent {
  title = 'Sistema de Órdenes';
}