import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './common/animations/route-transitions-animation'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [routeTransitionAnimations]
})

export class AuthComponent implements OnInit {

  constructor() {}


  ngOnInit(): void {
  }

  /**
   * Prepares the animation between routes using the AnimationState variable
   * @param outlet RouterOutlet
   * @returns void
   */
  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animationState'];
  }

}
