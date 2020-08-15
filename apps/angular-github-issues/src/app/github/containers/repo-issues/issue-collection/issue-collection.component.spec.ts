import { TestBed, async } from '@angular/core/testing';
import { IssueCollectionComponent } from '../../../containers/repo-issues';
import { Actions } from '@ngrx/effects';
import { IssueEffects, RepoEffects } from '../../../store/effects';
import { SharedTestingModuleWithProviders } from '../../../shared';
import { CoreModule } from '../../../../core';
import { RouterTestingModule } from '@angular/router/testing';

describe('IssueCollectionComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedTestingModuleWithProviders,
        CoreModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [IssueCollectionComponent],
      providers: [
        Actions,
        IssueEffects]
    }).compileComponents();
  }));

  it('should create the issue collection component', async(() => {
    const fixture = TestBed.createComponent(IssueCollectionComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
