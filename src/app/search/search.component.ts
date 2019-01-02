import { Component, OnInit } from '@angular/core';
import { AliensService, Alien } from '../+core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private alienService: AliensService) { }

  aliens: Alien[];

  ngOnInit() {
    this.getAliens();
  }

  getAliens() {
    this.alienService.getAliens().subscribe(aliens => {
      this.aliens = aliens;
    });
  }

}

