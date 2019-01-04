import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenderOptions } from '../+core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  actionName: string;

  genderOptions = GenderOptions;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.extractInfo();
  }

  extractInfo() {
    this.actionName = this.route.snapshot.url[0].path;
  }

}
