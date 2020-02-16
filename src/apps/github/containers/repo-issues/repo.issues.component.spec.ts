import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepoIssuesComponent } from './repo-issues.component';
import { IssueCollectionComponent } from '../../containers/repo-issues';
import { Actions } from '@ngrx/effects';
import { IssueEffects, RepoEffects } from '../../store/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedTestingModuleWithProviders } from '../../shared';
import * as repoActions from '../../store/actions';
import { CoreModule } from '../../../core';

describe('RepoIssuesComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        SharedTestingModuleWithProviders,
        BrowserAnimationsModule,
        CoreModule,
        RouterTestingModule
      ],
      declarations: [RepoIssuesComponent, IssueCollectionComponent],
      providers: [
        Actions,
        IssueEffects]
    }).compileComponents();
  }));

  it('should create the issues component', async(() => {
    const fixture = TestBed.createComponent(RepoIssuesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call the load all issues', ((done: any) => {
    const fixture = TestBed.createComponent(RepoIssuesComponent);
    const comp = fixture.debugElement.componentInstance;

    comp.store.dispatch(new repoActions.LoadAllRepos({ searchName: 'angular' }));
    comp.store.dispatch(new repoActions.SetCurrentRepoId(24195339));
    fixture.detectChanges();
    comp.actionsSubject
      .asObservable()
      .subscribe((data: any) => {
        switch (data.type) {
          case '[Issue] LOAD ALL SUCCESS':
            fixture.detectChanges();
            expect(Object.keys(comp.repoIssueCollection).length).toEqual(100);
            done();
            break;
          default: console.log('default case hit');
        }
      });


  }));
});
