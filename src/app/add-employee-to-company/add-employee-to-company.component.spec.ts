import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeToCompanyComponent } from './add-employee-to-company.component';

describe('AddEmployeeToCompanyComponent', () => {
  let component: AddEmployeeToCompanyComponent;
  let fixture: ComponentFixture<AddEmployeeToCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeToCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeeToCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
