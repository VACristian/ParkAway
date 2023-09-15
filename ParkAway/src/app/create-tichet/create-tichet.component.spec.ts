import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTichetComponent } from './create-tichet.component';

describe('CreateTichetComponent', () => {
  let component: CreateTichetComponent;
  let fixture: ComponentFixture<CreateTichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTichetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
