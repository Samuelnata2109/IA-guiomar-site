import { JSDOM } from "jsdom";
import { test, after, afterEach } from "node:test";
import assert from "node:assert/strict";
const dom = new JSDOM(
  '<!doctype html><html><head><meta name="theme-color"/></head><body><section id="areas" tabindex="-1"></section></body></html>',
  { url: "https://example.test/", pretendToBeVisual: true },
);
const win = dom.window;
Object.assign(globalThis, {
  window: win,
  Window: win.Window,
  document: win.document,
  HTMLElement: win.HTMLElement,
  SVGElement: win.SVGElement,
  HTMLCanvasElement: win.HTMLCanvasElement,
  Element: win.Element,
  Node: win.Node,
  Document: win.Document,
  MutationObserver: win.MutationObserver,
  DOMRect: win.DOMRect,
  localStorage: win.localStorage,
  sessionStorage: win.sessionStorage,
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
    (query.includes("prefers-reduced-motion") &&
      !query.includes("no-preference")) ||
    query.includes("color-scheme: light"),
  media: query,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
});
class Observer {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).IntersectionObserver = Observer;
win.HTMLCanvasElement.prototype.getContext = () => null;
win.HTMLElement.prototype.scrollIntoView = function () {};
win.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
  this.querySelector<HTMLButtonElement>("button")?.focus();
};
win.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
  this.dispatchEvent(new win.Event("close"));
};
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
const React = await import("react");
const { render, screen, cleanup, fireEvent, waitFor, within, act } =
  await import("@testing-library/react");
const { default: Showcase } = await import(
  "../src/sections/Disciplinas/InteractiveShowcase"
);
const { ThemeProvider } = await import("../src/components/layout/ThemeProvider");
const { default: Quest } = await import(
  "../src/features/code-quest/components/CodeQuestGame"
);
const { courses } = await import("../src/data/courses");
const { EditorView } = await import("@codemirror/view");
const { levels } = await import("../src/features/code-quest/game/adventure");
win.Range.prototype.getClientRects = () => [] as any;
win.Range.prototype.getBoundingClientRect = () => new win.DOMRect();
function openTools(){document.querySelectorAll<HTMLDetailsElement>('.adventure-tools, .adventure-tools details').forEach(el=>{el.open=true;});}
function editorView() { return EditorView.findFromDOM(document.querySelector(".cm-editor")!)!; }
function setCode(code: string) { act(() => { const v=editorView(); v.dispatch({changes:{from:0,to:v.state.doc.length,insert:code}}); }); }
afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});
after(async () => {
  const { default: gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  ScrollTrigger.disable();
  gsap.ticker.sleep();
  win.close();
});

test("all five course cards open correct modals; Escape and backdrop close and restore focus", async () => {
  render(<Showcase />);
  assert.equal(document.querySelectorAll(".area-wide").length, 1);
  for (const course of courses) {
    const button = screen.getByRole("button", {
      name: `Explorar ${course.name}`,
    });
    button.focus();
    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", {
      name: `${course.number} / ${course.name}`,
    });
    const close = within(dialog).getByRole("button", { name: "Fechar janela" });
    close.focus();
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    assert.equal(
      document.activeElement?.getAttribute("aria-label"),
      "Ver fotografia 2",
    );
    fireEvent.keyDown(document.activeElement!, { key: "Tab" });
    assert.ok(document.activeElement === close);
    assert.ok(within(dialog).getByRole("heading", { name: `${course.name}.` }));
    assert.ok(within(dialog).getAllByText(course.topics[0]).length > 0);
    assert.equal(document.documentElement.style.overflow, "hidden");
    fireEvent(
      dialog,
      new win.Event("cancel", { bubbles: true, cancelable: true }),
    );
    await waitFor(() =>
      assert.ok(!document.querySelector("dialog[open]"), "Dialog must close"),
    );
    assert.ok(
      document.activeElement === button,
      `Focus must return to ${course.name}; actual: ${document.activeElement?.tagName} ${document.activeElement?.getAttribute("aria-label")}`,
    );
  }
  fireEvent.click(screen.getByRole("button", { name: "Explorar Automação e Agentes de IA" }));
  fireEvent.click(document.querySelector(".modal-backdrop")!);
  await waitFor(() =>
    assert.ok(!document.querySelector("dialog[open]"), "Dialog must close"),
  );
  assert.notEqual(document.documentElement.style.overflow, "hidden");
});
test("gallery navigation and enlarged view work with explicitly identified placeholders", async () => {
  render(<Showcase />);
  fireEvent.click(screen.getByRole("button", { name: "Explorar Introdução à Inteligência Artificial" }));
  const dialog = screen.getByRole("dialog", { name: "01 / Introdução à Inteligência Artificial" });
  fireEvent.click(
    within(dialog).getByRole("button", { name: "Próxima fotografia" }),
  );
  await waitFor(() => assert.ok(within(dialog).getByText("2 / 2")));
  fireEvent.click(
    within(dialog).getByRole("button", { name: "Ampliar fotografia" }),
  );
  const enlarged = screen.getByRole("dialog", { name: "Galeria — Introdução à Inteligência Artificial" });
  assert.ok(within(enlarged).getByText("FOTO REAL EM BREVE"));
  fireEvent.click(
    within(enlarged).getByRole("button", { name: "Fechar janela" }),
  );
  await waitFor(() =>
    assert.ok(!screen.queryByRole("dialog", { name: "Galeria — Introdução à Inteligência Artificial" })),
  );
  assert.equal(document.documentElement.style.overflow, "hidden");
});
test("light theme is permanent and clears a previously stored dark preference", () => {
  localStorage.setItem("ds-guiomar-theme", "dark");
  const view = render(
    <ThemeProvider>
      <div>Interface</div>
    </ThemeProvider>,
  );
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(document.documentElement.style.colorScheme, "light");
  assert.equal(localStorage.getItem("ds-guiomar-theme"), null);
  assert.equal(screen.queryByRole("button", { name: /tema/i }), null);
  view.unmount();
  render(
    <ThemeProvider>
      <div>Interface</div>
    </ThemeProvider>,
  );
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(
    document.querySelector('meta[name="theme-color"]')?.getAttribute("content"),
    "#f0f5fb",
  );
});
const ADVENTURE_KEY='ds-code-quest-adventure-v1';
function seed(stage=0) { sessionStorage.setItem(ADVENTURE_KEY,JSON.stringify({stage,codes:levels.map(l=>l.starter),mode:'guided',completed:Array.from({length:stage},(_,i)=>i)})); }
test('beginner inserts a real command, runs it, reaches portal and retains code across help modes',async()=>{
 render(<Quest open onClose={()=>{}} onAfterClose={()=>{}}/>);openTools();
 assert.ok(screen.getByText(/Está vendo aquele portal/, {selector:'.adventure-tutor p'}));
 assert.equal((screen.getByRole('combobox',{name:'Modo de ajuda'}) as HTMLSelectElement).value,'guided');
 setCode('');
 fireEvent.click(screen.getByRole('button',{name:'Inserir comando'}));
 assert.ok(editorView().state.doc.toString().includes('await byte.moverFrente();'));
 const code=editorView().state.doc.toString();
 fireEvent.change(screen.getByRole('combobox',{name:'Modo de ajuda'}),{target:{value:'free'}});
 assert.equal(editorView().state.doc.toString(),code);
 fireEvent.click(screen.getByRole('button',{name:'EXECUTAR CÓDIGO'}));
 await waitFor(()=>assert.ok(screen.getByRole('button',{name:/Próxima fase/})),{timeout:3000});
 assert.ok(screen.getByRole('status').textContent?.includes('primeiro código JavaScript'));
 await waitFor(() => assert.deepEqual(JSON.parse(sessionStorage.getItem(ADVENTURE_KEY)!).completed, [0]));
 fireEvent.click(screen.getByRole('button',{name:/Próxima fase/}));
 assert.ok(screen.getByRole('heading',{name:/02 \/ Uma ação depois da outra/}));
});
test('syntax errors highlight actual line and help never rewrites code without insertion',async()=>{
 render(<Quest open onClose={()=>{}} onAfterClose={()=>{}}/>);openTools();
 setCode('await byte.moverFrente(;');
 fireEvent.click(screen.getByRole('button',{name:'EXECUTAR CÓDIGO'}));
 await screen.findByRole('button',{name:'ME AJUDE A CORRIGIR'});
 await waitFor(() => assert.ok(document.querySelector('.adventure-error-line')));
 const code=editorView().state.doc.toString();
 fireEvent.click(screen.getByRole('button',{name:'ME AJUDE A CORRIGIR'}));
 assert.equal(editorView().state.doc.toString(),code);
 for(let i=0;i<3;i++)fireEvent.click(screen.getByRole('button',{name:'Próxima dica'}));
 fireEvent.click(screen.getByRole('button',{name:'Inserir solução explicada'}));
 assert.equal(editorView().state.doc.toString(),levels[0].solution);
 fireEvent.click(screen.getByRole('button',{name:'EXECUTAR CÓDIGO'}));
 await screen.findByRole('button',{name:/Próxima fase/});
});
test('guided assistance completes loop, conditional and final phases with real interpreter',async()=>{
 for(const stage of [3,5,9]){
  seed(stage);
  const view=render(<Quest open onClose={()=>{}} onAfterClose={()=>{}}/>);openTools();
  for(let i=0;i<4;i++)fireEvent.click(screen.getByRole('button',{name:'Próxima dica'}));
  fireEvent.click(screen.getByRole('button',{name:'Inserir solução explicada'}));
  fireEvent.click(screen.getByRole('button',{name:'EXECUTAR CÓDIGO'}));
  const next=await screen.findByRole('button',{name:stage===9?'ATIVAR NÚCLEO DIGITAL →':/Próxima fase/},{timeout:5000});
  await waitFor(() => assert.ok(JSON.parse(sessionStorage.getItem(ADVENTURE_KEY)!).completed.includes(stage)));
  if(stage===9){fireEvent.click(next);assert.ok(screen.getByRole('heading',{name:'PARABÉNS! VOCÊ DESBLOQUEOU O FUTURO.'}));fireEvent.click(screen.getByRole('button',{name:'JOGAR NOVAMENTE'}));assert.ok(screen.getByRole('heading',{name:/01 \/ Primeiro portal/}));}
  view.unmount();
 }
});
test('guide and tutorial preserve edits; closing during execution prevents completion',async()=>{
 const view=render(<Quest open onClose={()=>{}} onAfterClose={()=>{}}/>);openTools();
 setCode('await byte.moverFrente();\n// minha anotação');
 fireEvent.click(screen.getByText('MEU GUIA JAVASCRIPT · rever conceitos anteriores'));
 fireEvent.click(screen.getByRole('button',{name:'Rever tutorial desta fase'}));
 assert.ok(editorView().state.doc.toString().includes('// minha anotação'));
 fireEvent.click(screen.getByRole('button',{name:'EXECUTAR CÓDIGO'}));
 view.rerender(<Quest open={false} onClose={()=>{}} onAfterClose={()=>{}}/>);
 await act(async()=>{await new Promise(r=>setTimeout(r,30));});
 assert.deepEqual(JSON.parse(sessionStorage.getItem(ADVENTURE_KEY)!).completed,[]);
});
test('AI adventure starts at the landing CTA and restores focus on close',async()=>{
 const {default:Entry}=await import('../src/sections/CodeQuest/CodeQuestSection');
 render(<Entry/>);
 const button=screen.getByRole('button',{name:'INICIAR DESAFIO'});button.focus();fireEvent.click(button);
 const dialog=await screen.findByRole('dialog',{name:'CODE QUEST 3D · IA'});
 fireEvent.click(within(dialog).getByRole('button',{name:'Fechar janela'}));
 await waitFor(()=>assert.ok(!document.querySelector('dialog[open]')));
 assert.ok(document.activeElement===button);
});
test('pause, single instruction and continuation control the real execution sequence',async()=>{
 seed(3);render(<Quest open onClose={()=>{}} onAfterClose={()=>{}}/>);openTools();setCode(levels[3].solution);
 fireEvent.click(screen.getByRole('button',{name:'EXECUTAR CÓDIGO'}));
 fireEvent.click(screen.getByRole('button',{name:'Pausar'}));
 await act(async()=>{await new Promise(r=>setTimeout(r,70));});
 assert.ok(!screen.queryByRole('button',{name:/Próxima fase/}));
 fireEvent.click(screen.getByRole('button',{name:'Uma ação'}));
 await act(async()=>{await new Promise(r=>setTimeout(r,70));});
 assert.ok(!screen.queryByRole('button',{name:/Próxima fase/}));
 assert.ok(document.querySelector('.adventure-current-line'));
 fireEvent.click(screen.getByRole('button',{name:'Continuar'}));
 await screen.findByRole('button',{name:/Próxima fase/});
});

test('all discipline galleries expose accessible photo/video tabs and honest empty states', async () => {
 const {default: Gallery}=await import('../src/components/ui/ActivityGallery');
 for(const course of courses){const view=render(<Gallery course={course} active/>);fireEvent.click(screen.getByRole('tab',{name:'Vídeos'}));assert.ok(screen.getByText('Em breve, vídeos das nossas atividades práticas!'));assert.equal(document.querySelector('video'),null);fireEvent.keyDown(screen.getByRole('tab',{name:'Vídeos'}),{key:'ArrowLeft'});assert.equal(screen.getByRole('tab',{name:'Fotografias'}).getAttribute('aria-selected'),'true');view.unmount();}
});
test('selected video retains its source in Strict Mode and pauses on closing parent', async()=>{
 const {default: Gallery}=await import('../src/components/ui/ActivityGallery');const {courseMedia}=await import('../src/data/courseMedia');let pauses=0;win.HTMLMediaElement.prototype.pause=function(){pauses++;};win.HTMLMediaElement.prototype.load=function(){};
 courseMedia.robotica=[{id:'test-only',type:'video',src:'media/robotica/videos/test.webm',title:'Teste de player',caption:'Fixture de teste'}];
 try{const view=render(<React.StrictMode><Gallery course={courses[0]} active/></React.StrictMode>);
 fireEvent.click(screen.getByRole('tab',{name:'Vídeos'}));
 assert.equal(document.querySelector('video'),null);
 fireEvent.click(screen.getByRole('button',{name:'Reproduzir Teste de player'}));
 const video=document.querySelector('video')!;
 assert.match(video.src, /test\.webm$/);
 assert.ok(video.controls);
 assert.equal(video.autoplay,false);
 assert.equal(video.preload,'metadata');
 const pausesBeforeClose = pauses;
 view.rerender(<React.StrictMode><Gallery course={courses[0]} active={false}/></React.StrictMode>);
 assert.ok(pauses > pausesBeforeClose);}finally{courseMedia.robotica=[];}
});

test('workspace keeps scene editor controls and console together, with collapsible tools and keyboard resize',()=>{
 render(<Quest open onClose={()=>{}} onAfterClose={()=>{}}/>);
 const workspace=document.querySelector('.adventure-workspace')!;
 assert.ok(workspace.querySelector('.adventure-world'));
 assert.ok(workspace.querySelector('.cm-editor'));
 assert.ok(within(workspace as HTMLElement).getByRole('button',{name:'EXECUTAR CÓDIGO'}));
 assert.ok(workspace.querySelector('.adventure-console'));
 assert.equal(workspace.querySelector('.adventure-tutor'),null);
 const tools=document.querySelector<HTMLDetailsElement>('.adventure-tools')!;
 assert.equal(tools.open,false);fireEvent.click(within(tools).getByText('Ferramentas e ajuda'));assert.equal(tools.open,true);
 const separator=screen.getByRole('separator');fireEvent.keyDown(separator,{key:'End'});assert.equal(separator.getAttribute('aria-valuenow'),'65');fireEvent.keyDown(separator,{key:'Home'});assert.equal(separator.getAttribute('aria-valuenow'),'40');
 assert.equal(localStorage.getItem('ds-quest-panel-width'),'40');
});
