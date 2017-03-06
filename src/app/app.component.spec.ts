import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { UploadXlsxComponent } from './uploadxlsx/uploadxlsx.component';
import { ServerListComponent } from './server-list/server-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap';
import {SliderModule} from 'primeng/primeng';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UploadXlsxComponent,
        ServerListComponent
      ],
      imports: [
        FormsModule,
        TabsModule,
        SliderModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Servers Filter'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Servers Filter');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Servers Filter');
  }));
});
