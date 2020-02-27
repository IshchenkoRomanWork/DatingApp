import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({providedIn: 'root'})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(
        component: MemberEditComponent,
    ): boolean {
        if (component.editForm.dirty) {
            return confirm('Are you sure? Unsaved will be lost.');
        }
        return true;
    }
}
