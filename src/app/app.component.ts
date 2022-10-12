import { Component, OnInit } from '@angular/core';

const nullRow = [null, null, null];

enum markOptions {
  X = "X",
  O = "O"
 }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  ngOnInit(){}

}
