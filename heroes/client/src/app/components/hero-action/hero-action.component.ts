import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface DiLOG_DATA {
  head: string,
  hero: Hero
}

@Component({
  selector: 'app-hero-action',
  templateUrl: './hero-action.component.html',
  styleUrls: ['./hero-action.component.scss']
})
export class HeroActionComponent implements OnInit, OnDestroy {

  heroForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  imageData: string = '';

  constructor(
    public dialogRef: MatDialogRef<HeroActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiLOG_DATA,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.imageData = this.data.hero?.image;
    this.heroForm = new FormGroup({
      id: new FormControl(this.data.hero?.id),
      nickname: new FormControl(this.data.hero?.nickname, [Validators.required]),
      real_name: new FormControl(this.data.hero?.real_name, [Validators.required]),
      superpowers: new FormControl(this.data.hero?.superpowers, [Validators.required]),
      origin_description: new FormControl(this.data.hero?.origin_description),
      catch_phrase: new FormControl(this.data.hero?.catch_phrase),
      image: new FormControl(this.data.hero?.image),
    });
  }

  get nickname() { return this.heroForm.get('nickname'); }
  get real_name() { return this.heroForm.get('real_name'); }
  get superpowers() { return this.heroForm.get('superpowers'); }

  close() {
    this.dialogRef.close()
  }

  apply(heroForm: FormGroup) {
    if (heroForm.valid) {
      if (this.data.head == 'Create') {
        this.createHero(heroForm.value)
      } else {
        this.updateHero(heroForm.value);
      }
    }
  }

  updateHero(hero: Hero) {
    this.heroService.UpdateHero(hero)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close();
        }
      })
  }

  createHero(hero: Hero) {
    this.heroService.CreateNewHero(hero)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close();
        }
      })
  }


  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/pdf'];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
          this.heroForm.patchValue({ image: this.imageData });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}