import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  query: string;
  poke: any = [];
  pokeName: any;
  pokeSprite: any;
  constructor(private httpC: HttpClient) {
  }

  getPoke() {
    this.query = 'https://pokeapi.co/api/v2/pokemon/1';

    this.httpC.get(this.query).subscribe(data => {
      this.poke = data;
      this.pokeName = this.poke.name.charAt(0).toUpperCase() + this.poke.name.slice(1);
      this.pokeSprite = this.poke.sprites.front_default;
      console.log(this.poke);
    }, err => {
      console.log(err);
    });
  }




}
