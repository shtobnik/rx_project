import { Component, AfterViewInit } from '@angular/core';
import { fromEvent, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'rx-project';

  email_text:      string;
  pass_text:       string;
  repass_text:     string;

  mail_error:      string;
  pass_eror:       string;
  repas_error:     string;

  isButtonActive = false;

  ngAfterViewInit() {

    const testForm    = document.getElementById('test_form'),
          mailField   = document.getElementById('mail_field'),
          passField   = document.getElementById('pass_field'),
          repassField = document.getElementById('repass_field');

    const formSubmit  = fromEvent(testForm, 'submit');

    const detectBlurEvent$ = id =>
    fromEvent(document.getElementById(id), 'blur').pipe(
      tap((e) => {
        const elementId = (<HTMLTextAreaElement>e.target).id;

        if ( elementId === 'mail_field' ) {
          if ( validateEmail(this.email_text) ) {
            this.mail_error = '';
          } else {
            this.mail_error = 'Enter correct email';
          }
        } else if ( elementId === 'pass_field' ) {
          if ( (<HTMLTextAreaElement>e.target).value.length > 4  ) {
            this.pass_eror = '';
          } else {
            this.pass_eror = 'Enter correct password';
          }
        } else if ( elementId === 'repass_field' ) {
          if ( this.repass_text && this.pass_text === this.repass_text ) {
            this.repas_error = '';
          } else {
            this.repas_error = 'Enter correct repass';
          }
        }

      })
    );


    const combineTotal$ = combineLatest(detectBlurEvent$('mail_field'), detectBlurEvent$('pass_field'), detectBlurEvent$('repass_field'))
      .subscribe((e: any) => {
        if ( this.mail_error === '' && this.pass_eror === '' && this.repas_error === '' ) {
          this.isButtonActive = true;
        }
      });


    const submitSubscribe = formSubmit.subscribe(() => alert([' email: ' + this.email_text, '\n password: ' + this.pass_text, '\n repeat password: ' + this.pass_text]));


    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  }

}
