import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPagesComponent } from './detail-pages.component';

describe('DetailPagesComponent', () => {
  let component: DetailPagesComponent;
  let fixture: ComponentFixture<DetailPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
