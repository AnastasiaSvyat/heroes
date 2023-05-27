import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroActionComponent } from 'src/app/components/hero-action/hero-action.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog,
    public overlay: Overlay,
  ) { }

  createHero() {
    this.dialog.open(HeroActionComponent, {
      width: '600px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      height: '670px',
      disableClose: true,
      data: { head: 'Create' }
    });
  }
}
