import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="copyright">Copyright Apress - Jadir Junior</div>
    </footer>
    <div class="addNote">
      <button mat-fab>
        <mat-icon>add_circle</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      footer {
        background: #3f51b5;
        color: #fff;
        display: flex;
        box-sizing: border-box;
        padding: 1rem;
        flex-direction: column;
        align-items: center;
        white-space: nowrap;
      }

      .copyright {
        text-align: center;
      }

      .addNote {
        position: fixed;
        bottom: 2rem;
        right: 1rem;
        color: #fff;
      }
    `,
  ],
})
export class FooterComponent {}
