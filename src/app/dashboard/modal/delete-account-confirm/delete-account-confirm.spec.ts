import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountConfirm } from './delete-account-confirm';

describe('DeleteAccountConfirm', () => {
  let component: DeleteAccountConfirm;
  let fixture: ComponentFixture<DeleteAccountConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAccountConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
