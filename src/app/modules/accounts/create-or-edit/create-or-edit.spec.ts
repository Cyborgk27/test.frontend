import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEdit } from './create-or-edit';

describe('CreateOrEdit', () => {
  let component: CreateOrEdit;
  let fixture: ComponentFixture<CreateOrEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
