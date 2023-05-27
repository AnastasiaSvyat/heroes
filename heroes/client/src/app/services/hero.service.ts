
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Hero } from '../models/hero';
import { BehaviorSubject, Observable, catchError, delay, of, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { ToastrService } from "ngx-toastr";
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  url: string = 'http://localhost:3000/api';

  private _heroesList$ = new BehaviorSubject<Hero[] | null>(null);
  public heroesList$ = this._heroesList$.asObservable();
  private heroList: Hero[] = [];

  private _loading$ = new BehaviorSubject<boolean>(false);
  loading$ = this._loading$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  GetHeroes(): Observable<Hero[]> {
    this._loading$.next(true)
    return this.httpClient.get<Hero[]>(`${this.url}/heroes`)
      .pipe(
        delay(1000),
        tap((heroes) => {
          this._loading$.next(false);
          this._heroesList$.next(heroes)
          this.heroList = heroes;
        }),
        catchError(this.handleError.bind(this))
      )
  }

  CreateNewHero(newHero: Hero): Observable<Result> {
    const url = `${this.url}/create-hero`
    return this.httpClient.post<Result>(url, newHero)
      .pipe(tap((newHero) => {
        this.heroList.push(newHero.content)
        this._heroesList$.next(this.heroList)
        this.toastr.error(newHero.message);
      }),
        catchError(this.handleError.bind(this))
      )
  }

  UpdateHero(hero: Hero): Observable<Result> {
    const url = `${this.url}/update-hero`;
    return this.httpClient.put<Result>(url, hero)
      .pipe(tap((updatedHero) => {
        this._loading$.next(false);
        const index = this.heroList.findIndex(el => el.id == hero.id)
        this.heroList[index] = { ...updatedHero.content }
        this._heroesList$.next(this.heroList)
        this.toastr.error(updatedHero.message);
      }),
        catchError(this.handleError.bind(this))
      )
  }

  DeleteHero(id: number): Observable<Result> {
    this._loading$.next(true);
    return this.httpClient.delete<Result>(`${this.url}/delete-hero/${id}`)
      .pipe(tap((heroes) => {
        this._heroesList$.next(heroes.content)
        this._loading$.next(false);
        this.heroList = heroes.content;
        this.toastr.error(heroes.message);
      }),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError<T>(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}