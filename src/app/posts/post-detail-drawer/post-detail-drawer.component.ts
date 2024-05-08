import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {PostDetailDrawerMode, PostDetailDrawerPosition} from "./post-detail-drawer.types";
import {PostDetailDrawerService} from "./post-detail-drawer.service";

@Component({
  selector: 'post-detail-drawer',
  templateUrl: './post-detail-drawer.component.html',
  styleUrls: ['./post-detail-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'postDetailDrawer'
})
export class PostDetailDrawerComponent implements OnChanges, OnInit, OnDestroy {

  @Input() fixed: boolean = false;
  @Input() mode: PostDetailDrawerMode = 'side';
  @Input() name: string = 'default';
  @Input() opened: boolean = false;
  @Input() position: PostDetailDrawerPosition = 'left';
  @Input() transparentOverlay: boolean = false;
  @Output() readonly fixedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readonly modeChanged: EventEmitter<PostDetailDrawerMode> = new EventEmitter<PostDetailDrawerMode>();
  @Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readonly positionChanged: EventEmitter<PostDetailDrawerPosition> = new EventEmitter<PostDetailDrawerPosition>();

  private _animationsEnabled: boolean = false;
  private _hovered: boolean = false;
  private _overlay!: HTMLElement | null;
  private _player!: AnimationPlayer | null;

  /**
   * Constructor
   */
  constructor(
    private _animationBuilder: AnimationBuilder,
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _postDetailDrawerService: PostDetailDrawerService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'post-detail-drawer-animations-enabled': this._animationsEnabled,
      'post-detail-drawer-fixed': this.fixed,
      'post-detail-drawer-hover': this._hovered,
      [`post-detail-drawer-mode-${this.mode}`]: true,
      'post-detail-drawer-opened': this.opened,
      [`post-detail-drawer-position-${this.position}`]: true
    };
  }

  /**
   * Host binding for component inline styles
   */
  @HostBinding('style') get styleList(): any {
    return {
      'visibility': this.opened ? 'visible' : 'hidden'
    };
  }

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('fixed' in changes) {
      this.fixed = coerceBooleanProperty(changes['fixed'].currentValue);

      this.fixedChanged.next(this.fixed);
    }

    if ('mode' in changes) {

      const previousMode = changes['mode'].previousValue;
      const currentMode = changes['mode'].currentValue;

      this._disableAnimations();

      if (previousMode === 'over' && currentMode === 'side') {
        this._hideOverlay();
      }

      if (previousMode === 'side' && currentMode === 'over') {
        if (this.opened) {
          this._showOverlay();
        }
      }

      this.modeChanged.next(currentMode);

      setTimeout(() => {
        this._enableAnimations();
      }, 500);
    }

    if ('opened' in changes) {

      const open = coerceBooleanProperty(changes['opened'].currentValue);

      this._toggleOpened(open);
    }

    if ('position' in changes) {

      this.positionChanged.next(this.position);
    }

    if ('transparentOverlay' in changes) {

      this.transparentOverlay = coerceBooleanProperty(changes['transparentOverlay'].currentValue);
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this._postDetailDrawerService.registerComponent(this.name, this);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    if (this._player) {
      this._player.finish();
    }

    this._postDetailDrawerService.deregisterComponent(this.name);
  }

  /**
   * Open the drawer
   */
  open(): void {
    if (this.opened) {
      return;
    }

    this._toggleOpened(true);
  }

  /**
   * Close the drawer
   */
  close(): void {
    if (!this.opened) {
      return;
    }

    this._toggleOpened(false);
  }

  /**
   * Enable the animations
   *
   * @private
   */
  private _enableAnimations(): void {
    if (this._animationsEnabled) {
      return;
    }

    this._animationsEnabled = true;
  }

  /**
   * Disable the animations
   *
   * @private
   */
  private _disableAnimations(): void {
    if (!this._animationsEnabled) {
      return;
    }

    this._animationsEnabled = false;
  }

  /**
   * Show the backdrop
   *
   * @private
   */
  private _showOverlay(): void {
    this._overlay = this._renderer2.createElement('div');

    if (!this._overlay) {
      return;
    }

    this._overlay.classList.add('post-detail-drawer-overlay');

    if (this.fixed) {
      this._overlay.classList.add('post-detail-drawer-overlay-fixed');
    }

    if (this.transparentOverlay) {
      this._overlay.classList.add('post-detail-drawer-overlay-transparent');
    }

    this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);

    this._player = this._animationBuilder.build([
      style({opacity: 0}),
      animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 1}))
    ]).create(this._overlay);

    this._player.onDone(() => {
      if (this._player)
        this._player.destroy();
      this._player = null;
    });

    this._player.play();

    this._overlay.addEventListener('click', () => {
      this.close();
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * Hide the backdrop
   *
   * @private
   */
  private _hideOverlay(): void {
    if (!this._overlay) {
      return;
    }

    this._player = this._animationBuilder.build([
      animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 0}))
    ]).create(this._overlay);

    this._player.play();

    this._player.onDone(() => {

      if (this._player)
        this._player.destroy();
      this._player = null;

      if (this._overlay) {
        this._overlay?.parentNode?.removeChild(this._overlay);
        this._overlay = null;
      }
    });
  }

  /**
   * Open/close the drawer
   *
   * @param open
   * @private
   */
  private _toggleOpened(open: boolean): void {

    this.opened = open;

    this._enableAnimations();

    if (this.mode === 'over') {

      if (open) {
        this._showOverlay();
      }

      else {
        this._hideOverlay();
      }
    }

    this.openedChanged.next(open);
  }
}
