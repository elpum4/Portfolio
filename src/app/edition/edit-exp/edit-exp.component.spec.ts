import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpComponent } from './edit-exp.component';

describe('EditExpComponent', () => {
  let component: EditExpComponent;
  let fixture: ComponentFixture<EditExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
