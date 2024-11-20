import { Injectable } from '@angular/core';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'smooth-scrollbar';
import { BehaviorSubject } from 'rxjs';

interface ScrollType {
  scrollElement: HTMLElement | null;
  scrollbar: Scrollbar | null;
  isScrollDown: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SmoothScrollService {
  private data = new BehaviorSubject<ScrollType>({
    scrollElement: null,
    scrollbar: null,
    isScrollDown: false,
  });

  data$ = this.data.asObservable();

  options = {
    damping: 0.1,
    thumbMinSize: 20,
    renderByPixels: true,
    alwaysShowTracks: true,
    continuousScrolling: true,
    plugins: {
      overscroll: {
        effect: 'glow',
      },
    },
  };

  initSmoothScrolling(scrollElement: HTMLElement): void {
    Scrollbar.use(OverscrollPlugin);
    this.data.next({
      ...this.data.value,
      scrollbar: Scrollbar.init(scrollElement, this.options),
    });
    this.setScrollDirection(this.data.value.scrollbar);
  }

  setScrollDirection(scrollbar: Scrollbar | null) {
    if (scrollbar) {
      scrollbar.addListener((status) => {
        this.data.next({
          ...this.data.value,
          isScrollDown: status.offset.y > 550,
        });
      });
    }
  }

  destroyScroll(flag: boolean) {
    flag
      ? this.data.value.scrollbar?.destroy()
      : this.initSmoothScrolling(document.querySelector('.scroll-content')!);
  }

  scrollToTop(duration?: number) {
    this.data.value.scrollbar?.scrollTo(0, 0, duration);
  }
}
