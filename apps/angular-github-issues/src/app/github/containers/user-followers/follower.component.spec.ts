import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { UserSearchCollectionComponent, SubNavigationComponent } from '../../components';
import { UserFollowerComponent } from './follower.component';

describe('UserFollowerComponent', () => {
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
      declarations: [UserSearchCollectionComponent, UserFollowerComponent, SubNavigationComponent],
      providers: [
        Actions,
        UserEffects]
    }).compileComponents();
  }));

  it('should create the user follower component', ((done: any) => {
    const fixture = TestBed.createComponent(UserFollowerComponent);
    const app = fixture.debugElement.componentInstance;
    app.userCollection = [];
    fixture.detectChanges();
    expect(app).toBeTruthy();
    done();
  }));

  it('should call the search button', ((done: any) => {
    const fixture = TestBed.createComponent(UserFollowerComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.userCollection = [];
    comp.store.dispatch(new userActions.LoadAllFollowers('davestaab'));
    fixture.detectChanges();

    comp.store.select(fromRoot.getFollowers).subscribe(data => {
      if (data) {
        comp.userCollection = data;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(Object.keys(comp.userCollection).length).toBeGreaterThan(0);
          done();
        });
      }
    });
  }));
});
