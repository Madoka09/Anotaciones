import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelcalcPage } from './duelcalc.page';

describe('DuelcalcPage', () => {
  let component: DuelcalcPage;
  let fixture: ComponentFixture<DuelcalcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelcalcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelcalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
