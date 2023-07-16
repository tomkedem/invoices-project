import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRowComponent } from './edit-row.component';

describe('EditRowComponent', () => {
  let component: EditRowComponent;
  let fixture: ComponentFixture<EditRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRowComponent]
    });
    fixture = TestBed.createComponent(EditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
