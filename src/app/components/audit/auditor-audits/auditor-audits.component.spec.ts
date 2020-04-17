import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorAuditsComponent } from './auditor-audits.component';

describe('AuditorAuditsComponent', () => {
  let component: AuditorAuditsComponent;
  let fixture: ComponentFixture<AuditorAuditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditorAuditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
