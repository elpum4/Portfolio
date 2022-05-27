import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopdfComponent } from './topdf.component';

describe('TopdfComponent', () => {
  let component: TopdfComponent;
  let fixture: ComponentFixture<TopdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
