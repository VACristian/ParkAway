import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytichetsComponent } from './mytichets.component';

describe('MytichetsComponent', () => {
  let component: MytichetsComponent;
  let fixture: ComponentFixture<MytichetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytichetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytichetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
