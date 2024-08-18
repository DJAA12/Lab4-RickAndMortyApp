import { Component, OnInit } from '@angular/core';
import { EpisodiosService } from '../services/episodios.service';
import { Episodio } from '../models/episodio.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.scss']
})
export class EpisodiosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'air_date', 'episode', 'created'];
  episodios: Episodio[] = [];
  totalEpisodes = 0;
  currentPage = 0;

  constructor(private episodiosService: EpisodiosService) {}

  ngOnInit(): void {
    this.getEpisodios(this.currentPage + 1);
  }

 
  getEpisodios(page: number): void {
    this.episodiosService.getEpisodiosPagina(page).subscribe((data) => {
      this.episodios = data.results;
      this.totalEpisodes = data.info.count;
    });
  }


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.getEpisodios(this.currentPage + 1);
  }
}
