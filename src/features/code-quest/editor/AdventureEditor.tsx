import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { EditorState, StateEffect, StateField } from '@codemirror/state';
import { EditorView, lineNumbers, keymap, Decoration } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';
import { history, historyKeymap, defaultKeymap, undo } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
const mark = StateEffect.define<{line:number,error:boolean}>();
const lineField = StateField.define({create:()=>Decoration.none,update(value,tr){ value=value.map(tr.changes); for(const effect of tr.effects) if(effect.is(mark)){const {line,error}=effect.value; value=line>0&&line<=tr.state.doc.lines?Decoration.set([Decoration.line({class:error?'adventure-error-line':'adventure-current-line'}).range(tr.state.doc.line(line).from)]):Decoration.none;} return value;},provide:field=>EditorView.decorations.from(field)});
export interface EditorHandle {insert:(text:string)=>void;undo:()=>void}
export default forwardRef<EditorHandle,{code:string;onChange:(code:string)=>void;line:number;error:boolean;disabled:boolean}>(function AdventureEditor({code,onChange,line,error,disabled},ref){
 const host=useRef<HTMLDivElement>(null),view=useRef<EditorView|null>(null),callback=useRef(onChange);callback.current=onChange;
 useImperativeHandle(ref,()=>({insert(text){const v=view.current;if(v){const s=v.state.selection.main;v.dispatch({changes:{from:s.from,to:s.to,insert:text},selection:{anchor:s.from+text.length}});v.focus();}},undo(){if(view.current)undo(view.current);}}),[]);
 useEffect(()=>{const v=new EditorView({parent:host.current!,state:EditorState.create({doc:code,extensions:[lineNumbers(),history(),keymap.of([...defaultKeymap,...historyKeymap]),javascript(),syntaxHighlighting(defaultHighlightStyle),autocompletion({override:[context=>{const word=context.matchBefore(/[\w.]+/);if(!word&&!context.explicit)return null;return {from:word?.from??context.pos,options:['moverFrente','virarDireita','virarEsquerda','caminhoLivre'].map(name=>({label:`byte.${name}()`,type:'function',apply:`byte.${name}()`}))};}]}),lineField,EditorView.lineWrapping,EditorView.contentAttributes.of({'aria-label':'Editor JavaScript','spellcheck':'false'}),EditorView.updateListener.of(update=>{if(update.docChanged)callback.current(update.state.doc.toString());})]})});view.current=v;return()=>{v.destroy();view.current=null;};},[]);
 useEffect(()=>{const v=view.current;if(v&&v.state.doc.toString()!==code)v.dispatch({changes:{from:0,to:v.state.doc.length,insert:code}});},[code]);
 useEffect(()=>{view.current?.dispatch({effects:mark.of({line,error})});if(line>0&&view.current&&line<=view.current.state.doc.lines)view.current.dispatch({effects:EditorView.scrollIntoView(view.current.state.doc.line(line).from,{y:'nearest'})});},[line,error]);
 useEffect(()=>{view.current?.contentDOM.setAttribute('contenteditable',String(!disabled));},[disabled]);
 return <div ref={host} className="adventure-editor"/>;
});
