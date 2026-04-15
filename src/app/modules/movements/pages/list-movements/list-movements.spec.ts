import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovements } from './list-movements';

describe('ListMovements', () => {
  let component: ListMovements;
  let fixture: ComponentFixture<ListMovements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMovements],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMovements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
