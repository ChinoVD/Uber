import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsperaConductorPage } from './espera-conductor.page';

describe('EsperaConductorPage', () => {
  let component: EsperaConductorPage;
  let fixture: ComponentFixture<EsperaConductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EsperaConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
