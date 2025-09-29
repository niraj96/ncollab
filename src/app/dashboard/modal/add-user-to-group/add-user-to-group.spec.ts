import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToGroup } from './add-user-to-group';

describe('AddUserToGroup', () => {
  let component: AddUserToGroup;
  let fixture: ComponentFixture<AddUserToGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserToGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
