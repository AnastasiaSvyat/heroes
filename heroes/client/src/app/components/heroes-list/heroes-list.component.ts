import { Overlay } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { HeroActionComponent } from '../hero-action/hero-action.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  public loading$: Observable<boolean>;
  public heroes$: Observable<Hero[] | null>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private heroServise: HeroService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {
    this.loading$ = this.heroServise.loading$;
    this.heroes$ = this.heroServise.heroesList$;
  }

  ngOnInit(): void {
    this.heroServise.GetHeroes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  updateHero(hero: Hero) {
    this.dialog.open(HeroActionComponent, {
      width: '600px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      height: '670px',
      disableClose: true,
      data: { head: 'Update', hero: hero }
    });
  }

  deleteHero(id: number) {
    this.heroServise.DeleteHero(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe()
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
