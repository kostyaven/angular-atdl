import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AtdlFormComponent } from './atdl-form.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AtdlFormComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AtdlFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-atdl'`, () => {
    const fixture = TestBed.createComponent(AtdlFormComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-atdl');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AtdlFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-atdl app is running!');
  });
});
