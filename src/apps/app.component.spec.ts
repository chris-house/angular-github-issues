import { TestBed, } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routes';
import { SharedModule } from './github';
import { CoreModule } from './core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as LogRocket from 'logrocket';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach((() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutes,
        SharedModule.forRoot(),
        CoreModule.forRoot(),
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
      ],
      declarations: [AppComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', ((done: any) => {
    LogRocket.identify('TEST_USER', {
      name: 'Unit Test',
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    done();
  }));
});
