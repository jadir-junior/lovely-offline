import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFormComponent } from './notes-form.component';

describe('NotesFormComponent', () => {
  let component: NoteFormComponent;
  let fixture: ComponentFixture<NoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
