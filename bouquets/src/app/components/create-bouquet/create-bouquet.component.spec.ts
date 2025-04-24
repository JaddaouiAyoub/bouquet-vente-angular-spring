import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBouquetComponent } from './create-bouquet.component';

describe('CreateBouquetComponent', () => {
  let component: CreateBouquetComponent;
  let fixture: ComponentFixture<CreateBouquetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBouquetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBouquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
