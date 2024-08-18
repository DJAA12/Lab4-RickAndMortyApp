import { Component, OnInit } from '@angular/core';
import { Personaje } from '../models/personaje.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PersonajesService } from '../services/personajes.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatPaginatorModule],
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})
export class PersonajesComponent implements OnInit {
  personajes: Personaje[] = [];
  totalCharacters = 0;
  currentPage = 0;

  constructor(private personajesService: PersonajesService) {}

  ngOnInit(): void {
    this.getAllCharacters(this.currentPage + 1);
  }

  getAllCharacters(page: number): void {
    this.personajesService.getPersonajesPagina(page).subscribe((data) => {
      this.personajes = data.results;
      this.totalCharacters = data.info.count;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.getAllCharacters(this.currentPage + 1);
  }

  getStatusStyles(status: string) {
    return {
      'background-color': status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'gray',
      'border-radius': '50%',
      'width': '10px',
      'height': '10px',
      'display': 'inline-block',
      'margin-right': '8px'
    };
  }
}
