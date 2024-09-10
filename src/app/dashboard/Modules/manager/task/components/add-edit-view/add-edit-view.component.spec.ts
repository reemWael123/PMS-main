import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditViewComponent } from './add-edit-view.component';

describe('AddEditViewComponent', () => {
  let component: AddEditViewComponent;
  let fixture: ComponentFixture<AddEditViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditViewComponent]
    });
    fixture = TestBed.createComponent(AddEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
