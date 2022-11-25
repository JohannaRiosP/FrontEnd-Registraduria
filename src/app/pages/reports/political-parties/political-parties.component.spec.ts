import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalPartiesComponent } from './political-parties.component';

describe('PoliticalPartiesComponent', () => {
  let component: PoliticalPartiesComponent;
  let fixture: ComponentFixture<PoliticalPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticalPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
