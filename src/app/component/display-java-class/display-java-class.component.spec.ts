import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayJavaClassComponent } from './display-java-class.component';

describe('DisplayJavaClassComponent', () => {
  let component: DisplayJavaClassComponent;
  let fixture: ComponentFixture<DisplayJavaClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayJavaClassComponent]
    });
    fixture = TestBed.createComponent(DisplayJavaClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
