import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error$ = new Subject<string>();

  constructor(
    private toastr: ToastrService
  ) { }

  handle(message: string) {
    this.error$.next(message);
    this.toastr.error(message);
  }
}
