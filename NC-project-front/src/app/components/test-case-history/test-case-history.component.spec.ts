import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseHistoryComponent } from './test-case-history.component';

describe('TestCaseHistoryComponent', () => {
  let component: TestCaseHistoryComponent;
  let fixture: ComponentFixture<TestCaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
