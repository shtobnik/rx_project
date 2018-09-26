import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'rx-project';

  email_text:  string;
  pass_text:   string;
  repass_text: string;

  mail_error:  string;
  pass_eror:   string;
  repas_error: string;

  isButtonActive = false;

@ViewChild('repassField') repassField: ElementRef;

@ViewChild("mailField") mailField: ElementRef;

@ViewChild("passField") passField: ElementRef;

@ViewChild("testForm") testForm: ElementRef;


  ngAfterViewInit(): void {

    const formSubmit  = fromEvent(this.testForm.nativeElement, 'submit');


    const mail = fromEvent(this.mailField.nativeElement, 'blur').pipe(
      tap((e: any) => {

        if ( validateEmail((<HTMLTextAreaElement>e.target).value) ) {
          this.mail_error = '';
          this.email_text = (<HTMLTextAreaElement>e.target).value;
        } else {
          this.mail_error = 'Enter correct email';
        }

      })
    );

    const password = fromEvent(this.passField.nativeElement, 'blur').pipe(
      tap((e: any) => {

        if ( (<HTMLTextAreaElement>e.target).value.length > 4  ) {
          this.pass_eror = '';
          this.pass_text = (<HTMLTextAreaElement>e.target).value;
        } else if ( (<HTMLTextAreaElement>e.target).value.length > 0 && (<HTMLTextAreaElement>e.target).value.length < 4 ) {
          this.pass_eror = 'password must be more than 4 characters';
        } else {
          this.pass_eror = 'Enter correct password';
        }

      })
    );

    const rePassword = fromEvent(this.repassField.nativeElement, 'blur').pipe(
      tap((e: any) => {

        if ( (<HTMLTextAreaElement>e.target).value && this.passField.nativeElement.value === (<HTMLTextAreaElement>e.target).value ) {
          this.repas_error = '';
          this.repass_text = (<HTMLTextAreaElement>e.target).value;
        } else {
          this.repas_error = 'Enter correct repass';
        }

      })
    );

    const combineTotal$ = combineLatest(mail, password, rePassword)
      .subscribe((e: any) => {
        if ( this.mail_error === '' && this.pass_eror === '' && this.repas_error === '' ) {
          this.isButtonActive = true;
        }
      });

    const submitSubscribe = formSubmit.subscribe(() => alert([' email: ' + this.email_text, '\n password: ' + this.pass_text, '\n repeat password: ' + this.repass_text]));


    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  }

}
