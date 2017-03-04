import {ChangeDetectionStrategy, Component} from "@angular/core";
import { UploadResult } from './uploadxlsx/uploadxlsx.component';
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Servers Filter';
}
