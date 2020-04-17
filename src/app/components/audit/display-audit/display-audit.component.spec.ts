import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAuditComponent } from './display-audit.component';

describe('DisplayAuditComponent', () => {
  let component: DisplayAuditComponent;
  let fixture: ComponentFixture<DisplayAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
