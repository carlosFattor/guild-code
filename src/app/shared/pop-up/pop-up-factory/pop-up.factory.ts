import { Input, ComponentFactoryResolver, Injector, ComponentRef, Injectable } from '@angular/core';
import { UserModel } from '@domain/user.model';
import { UserMapPopupComponent } from '@components/user-map-popup/user-popup/user-map-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpFactory {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  loadComponent(user: UserModel, userUpdatingPosition = false, userNewLocation = null): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserMapPopupComponent);
    const component = componentFactory.create(this.injector);
    component.instance.user = user;
    component.instance.userUpdatingPosition = userUpdatingPosition;
    component.instance.userNewLocation = userNewLocation;
    component.changeDetectorRef.detectChanges();
    return component.location.nativeElement;
  }

}
