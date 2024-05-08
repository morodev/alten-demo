import { Injectable } from '@angular/core';
import {PostDetailDrawerComponent} from "./post-detail-drawer.component";

@Injectable({
    providedIn: 'root'
})
export class PostDetailDrawerService
{
    private _componentRegistry: Map<string, PostDetailDrawerComponent> = new Map<string, PostDetailDrawerComponent>();


    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: PostDetailDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

}
