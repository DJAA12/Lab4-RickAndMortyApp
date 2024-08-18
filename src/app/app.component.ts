import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule  
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RickAndMortyApp';
  selectedIndex = 0;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if (this.router.url.includes('personajes')) {
        this.selectedIndex = 0;
      } else if (this.router.url.includes('episodios')) {
        this.selectedIndex = 1;
      }
    });
  }

  onTabChange(event: any): void {
    if (event.index === 0) {
      this.router.navigate(['/personajes']);
    } else if (event.index === 1) {
      this.router.navigate(['/episodios']);
    }
  }
}
