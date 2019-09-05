import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCardNewComponent } from './car-card-new.component';

describe('CarCardNewComponent', () => {
  let component: CarCardNewComponent;
  let fixture: ComponentFixture<CarCardNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCardNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
