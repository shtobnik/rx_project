import { Component, AfterViewInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rx-project';


  clickCheck(event) {
    console.log('event', event);
    console.log('click', event.target.value);
    console.log('length', event.target.value.length);
    console.log('key', event.key);
  }

}
