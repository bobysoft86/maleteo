import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPagesComponent } from './location-pages.component';

describe('LocationPagesComponent', () => {
  let component: LocationPagesComponent;
  let fixture: ComponentFixture<LocationPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
