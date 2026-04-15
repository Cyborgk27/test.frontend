import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccounts } from './list-accounts';

describe('ListAccounts', () => {
  let component: ListAccounts;
  let fixture: ComponentFixture<ListAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAccounts],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAccounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
