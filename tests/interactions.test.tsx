import { JSDOM } from "jsdom";
import { test, afterEach, after } from "node:test";
import assert from "node:assert/strict";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://example.test/course/",
  pretendToBeVisual: true,
});
const win = dom.window;
Object.assign(globalThis, {
  window: win,
  document: win.document,
  HTMLElement: win.HTMLElement,
  HTMLCanvasElement: win.HTMLCanvasElement,
  Element: win.Element,
  Node: win.Node,
  Document: win.Document,
  getComputedStyle: win.getComputedStyle,
  requestAnimationFrame: win.requestAnimationFrame.bind(win),
  cancelAnimationFrame: win.cancelAnimationFrame.bind(win),
});
Object.defineProperty(globalThis, "navigator", {
  value: win.navigator,
  configurable: true,
});
(win as any).matchMedia = (query: string) => ({
  matches:
    query.includes("prefers-reduced-motion") &&
    !query.includes("no-preference"),
  media: query,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent() {
    return true;
  },
});
class Observer {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).IntersectionObserver = Observer;
win.HTMLCanvasElement.prototype.getContext = () => null;
win.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
win.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
  this.dispatchEvent(new win.Event("close"));
};
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
const React = await import("react");
const { render, screen, cleanup, fireEvent } = await import(
  "@testing-library/react"
);
const { default: Navigation } = await import("../src/components/layout/Navigation");
const { default: Demo } = await import("../src/features/laboratorio/components/InteractiveCodeDemo");
const { default: Gallery } = await import("../src/sections/Projetos/ProjectGallery");
const { default: School, Enrollment } = await import(
  "../src/sections/Escola/SchoolLocation"
);
const { projects } = await import("../src/data/content");
afterEach(() => {
  cleanup();
  projects.splice(0);
});
test("mobile menu opens, closes on navigation, and Escape returns focus", () => {
  render(<Navigation paused={false} setPaused={() => {}} />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
  assert.equal(
    screen
      .getByRole("button", { name: "Fechar menu" })
      .getAttribute("aria-expanded"),
    "true",
  );
  fireEvent.click(screen.getByRole("link", { name: /05A escola/ }));
  assert.equal(
    screen
      .getByRole("button", { name: "Abrir menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
  fireEvent.keyDown(document, { key: "Escape" });
  assert.equal(
    document.activeElement,
    screen.getByRole("button", { name: "Abrir menu" }),
  );
});
test("ambient motion control emits requested state", () => {
  let paused = false;
  render(<Navigation paused={false} setPaused={(v) => (paused = v)} />);
  fireEvent.click(
    screen.getByRole("button", { name: "Pausar movimento ambiente" }),
  );
  assert.equal(paused, true);
});
test("all four programming commands update the live scene and reset", () => {
  render(<Demo paused={false} />);
  const run = screen.getByRole("button", { name: "EXECUTAR CÓDIGO" });
  fireEvent.click(run);
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /LED aceso/,
  );
  fireEvent.click(run);
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /LED apagado/,
  );
  fireEvent.click(screen.getByRole("button", { name: "Mudar cor" }));
  fireEvent.click(run);
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /cor ciano/,
  );
  fireEvent.click(screen.getByRole("button", { name: "Mover robô" }));
  fireEvent.click(run);
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /posição 1/,
  );
  fireEvent.click(run);
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /posição -1/,
  );
  fireEvent.click(screen.getByRole("button", { name: "Animar" }));
  fireEvent.click(run);
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /rotações 1/,
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Reiniciar experiência" }),
  );
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /LED apagado, cor violeta, posição 0, rotações 0/,
  );
});
test("robot attention follows pointer and keyboard focus without executing a command", () => {
  render(<Demo paused={false} />);
  const button = screen.getByRole("button", { name: "EXECUTAR CÓDIGO" });
  const lab = document.querySelector(".code-lab")!;
  assert.equal(lab.getAttribute("data-robot-state"), "idle");
  fireEvent.pointerEnter(button, { pointerType: "mouse" });
  assert.equal(lab.getAttribute("data-robot-state"), "hover");
  fireEvent.pointerLeave(button);
  fireEvent.focus(button);
  assert.equal(lab.getAttribute("data-robot-state"), "hover");
  assert.match(
    screen.getByRole("img").getAttribute("aria-label")!,
    /LED apagado/,
  );
  fireEvent.blur(button);
  assert.equal(lab.getAttribute("data-robot-state"), "idle");
});
test("project filters preserve truthful empty states", () => {
  render(<Gallery />);
  assert.match(
    screen.getByText(/Os projetos dos estudantes ainda/).textContent!,
    /ainda não foram publicados/,
  );
  for (const name of [
    "Robótica",
    "Programação",
    "Design",
    "Manutenção",
    "Redes",
  ]) {
    fireEvent.click(screen.getByRole("button", { name, exact: true }));
    assert.equal(
      screen
        .getByRole("button", { name, exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
  }
  assert.equal(projects.length, 0);
});
test("gallery data supports filtered project details without publishing fixtures", () => {
  projects.push({
    id: "test",
    title: "Fixture de teste",
    category: "Robótica",
    description: "Conteúdo exclusivo do teste automatizado.",
  });
  render(<Gallery />);
  fireEvent.click(
    screen.getByRole("button", { name: "Robótica", exact: true }),
  );
  fireEvent.click(screen.getByRole("button", { name: /Fixture de teste/ }));
  assert.ok(screen.getByRole("dialog").hasAttribute("open"));
  fireEvent.click(screen.getByRole("button", { name: "Fechar detalhes" }));
  assert.equal(document.querySelector("dialog")?.hasAttribute("open"), false);
});
test("institutional contact, map and enrollment link remain exact and secure", () => {
  render(
    <>
      <School />
      <Enrollment />
    </>,
  );
  assert.equal(
    screen.getByRole("link", { name: "(88) 3646-1174" }).getAttribute("href"),
    "tel:+558836461174",
  );
  const map = screen.getByRole("link", { name: "VER NO GOOGLE MAPS" });
  assert.equal(map.getAttribute("target"), "_blank");
  assert.equal(map.getAttribute("rel"), "noopener noreferrer");
  assert.ok(
    map
      .getAttribute("href")
      ?.startsWith("https://www.google.com/maps/search/?api=1"),
  );
  assert.ok(document.querySelector("iframe")?.src.includes("output=embed"));
  assert.equal(
    screen
      .getByRole("link", { name: "ACOMPANHAR MATRÍCULAS" })
      .getAttribute("href"),
    "https://www.seduc.ce.gov.br/",
  );
});

after(async () => {
  const { default: gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  ScrollTrigger.disable();
  gsap.ticker.sleep();
  win.close();
});
