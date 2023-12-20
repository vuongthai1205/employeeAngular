import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyToEmployeeComponent } from './add-company-to-employee.component';

describe('AddCompanyToEmployeeComponent', () => {
  let component: AddCompanyToEmployeeComponent;
  let fixture: ComponentFixture<AddCompanyToEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCompanyToEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCompanyToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
