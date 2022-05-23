import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <span>ApressNote-PWA</span>
      <span class="space-between"></span>
      <button mat-icon-button [mat-menu-trigger-for]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>
    </mat-toolbar>
    <mat-menu x-position="before" #menu="matMenu">
      <button mat-menu-item routerLink="/notes">Home</button>
      <button mat-menu-item>Profile</button>
      <button mat-menu-item routerLink="/notes/add">Add Note</button>
    </mat-menu>
  `,
  styles: [
    `
      .space-between {
        flex: 1;
      }
    `,
  ],
})
export class HeaderComponent {}
