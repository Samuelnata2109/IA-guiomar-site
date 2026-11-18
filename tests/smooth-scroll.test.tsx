import { JSDOM } from "jsdom";
import { test, after, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://example.test/course/",
  pretendToBeVisual: true,
});
const win = dom.window;
class ResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}
Object.assign(globalThis, {
  window: win,
  document: win.document,
  location: win.location,
  history: win.history,
  Window: win.Window,
  HTMLElement: win.HTMLElement,
  HTMLImageElement: win.HTMLImageElement,
  Element: win.Element,
  Node: win.Node,
  ResizeObserver,
  getComputedStyle: win.getComputedStyle,
  requestAnimationFrame: win.requestAnimationFrame.bind(win),
  cancelAnimationFrame: win.cancelAnimationFrame.bind(win),
});
Object.defineProperty(globalThis, "navigator", {
  value: win.navigator,
  configurable: true,
});
win.scrollTo = () => {};
(win as any).matchMedia = (query: string) => ({
  matches: false,
  media: query,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
});
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
const React = await import("react");
const { render, fireEvent, cleanup } = await import("@testing-library/react");
const { default: gsap } = await import("gsap");
const { ScrollTrigger } = await import("gsap/ScrollTrigger");
const { default: Lenis } = await import("lenis");
const { default: SmoothScroll } = await import(
  "../src/components/animations/SmoothScroll"
);
const { AmbientMotionContext } = await import(
  "../src/components/animations/AmbientMotion"
);

test("Lenis uses one GSAP clock after StrictMode remount and fully cleans up when paused", () => {
  const ticks = new Set<(t: number) => void>();
  const frames: number[] = [];
  mock.method(gsap.ticker, "add", (fn: any) => {
    ticks.add(fn);
    return fn;
  });
  mock.method(gsap.ticker, "remove", (fn: any) => {
    ticks.delete(fn);
  });
  const instances: Lenis[] = [];
  const originalOn = Lenis.prototype.on;
  mock.method(Lenis.prototype, "on", function (this: Lenis, ...args: any[]) {
    instances.push(this);
    return originalOn.apply(this, args as any);
  });
  const view = render(
    <React.StrictMode>
      <AmbientMotionContext.Provider value={false}>
        <SmoothScroll />
      </AmbientMotionContext.Provider>
    </React.StrictMode>,
  );
  assert.equal(ticks.size, 1);
  mock.method(instances.at(-1)!, "raf", (time: number) => {
    frames.push(time);
  });
  [...ticks][0](1.25);
  assert.deepEqual(frames, [1250]);
  assert.ok(document.documentElement.classList.contains("lenis"));
  view.rerender(
    <React.StrictMode>
      <AmbientMotionContext.Provider value={true}>
        <SmoothScroll />
      </AmbientMotionContext.Provider>
    </React.StrictMode>,
  );
  assert.equal(ticks.size, 0);
  assert.equal(document.documentElement.classList.contains("lenis"), false);
  cleanup();
  mock.restoreAll();
});

test("smooth anchors preserve hash, keyboard focus and exclude external or modified clicks", () => {
  const calls: any[] = [];
  mock.method(Lenis.prototype, "scrollTo", (target: any, options: any) => {
    calls.push(target);
    options.onComplete?.();
  });
  const view = render(
    <>
      <SmoothScroll />
      <a href="#target">Ir</a>
      <a href="https://external.test/#target">Externo</a>
      <section id="target">Destino</section>
    </>,
  );
  fireEvent.click(view.getByText("Ir"));
  assert.equal(calls.length, 1);
  assert.equal(location.hash, "#target");
  assert.equal(document.activeElement, view.getByText("Destino"));
  fireEvent.click(view.getByText("Ir"), { ctrlKey: true });
  assert.equal(calls.length, 1);
  cleanup();
  mock.restoreAll();
});
afterEach(() => {
  cleanup();
  mock.restoreAll();
});
after(() => {
  cleanup();
  mock.restoreAll();
  ScrollTrigger.disable();
  gsap.ticker.sleep();
  win.close();
});
