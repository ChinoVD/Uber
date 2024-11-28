import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnDesarrolloPage } from './en-desarrollo.page';

describe('EnDesarrolloPage', () => {
  let component: EnDesarrolloPage;
  let fixture: ComponentFixture<EnDesarrolloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnDesarrolloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
