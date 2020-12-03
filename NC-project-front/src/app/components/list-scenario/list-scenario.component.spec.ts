import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScenarioComponent } from './list-scenario.component';

describe('ListScenarioComponent', () => {
  let component: ListScenarioComponent;
  let fixture: ComponentFixture<ListScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
