import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserReposComponent, SubNavigationComponent } from '../..';
import { SharedModule } from '../../shared';
import * as forApplication from '../../store/reducers';
import { EffectsModule, Actions } from '@ngrx/effects';
import { UserEffects } from '../../store/effects';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedTestingModule } from '../../shared';
import { CoreModule } from '../../../core';
import * as userActions from '../../store/actions';
import * as fromRoot from '../../store/reducers';

describe('UserReposComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedTestingModule.forRoot(),
        SharedModule.forRoot(),
        RouterTestingModule,
        CoreModule.forRoot(),
        StoreModule.forRoot(forApplication.reducers),
        EffectsModule.forRoot([UserEffects])
      ],
      declarations: [UserReposComponent, SubNavigationComponent],
      providers: [
        Actions,
        UserEffects]
    }).compileComponents();
  }));

  it('should create the user repos component', ((done: any) => {
    const fixture = TestBed.createComponent(UserReposComponent);
    const app = fixture.debugElement.componentInstance;
    app.repoCollection = [];
    fixture.detectChanges();
    expect(app).toBeTruthy();
    done();
  }));

  it('should display the user repos', ((done: any) => {
    const fixture = TestBed.createComponent(UserReposComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.repoCollection = [];
    comp.store.dispatch(new userActions.LoadUserRepo('crh225'));
    fixture.detectChanges();

    comp.store.select(fromRoot.getUserRepo).subscribe(data => {
      if (data) {
        comp.repoCollection = data;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(Object.keys(comp.repoCollection).length).toBeGreaterThan(0);
          done();
        });
      }
    });
  }));
});
