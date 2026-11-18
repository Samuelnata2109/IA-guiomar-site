import {useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent} from 'react';
export function useAdventureLayout(){
 const shell=useRef<HTMLDivElement>(null), panels=useRef<HTMLDivElement>(null);
 const [ratio,setRatio]=useState(()=>{try{const n=Number(localStorage.getItem('ds-quest-panel-width'));return n>=40&&n<=65?n:60;}catch{return 60;}});
 const update=(n:number)=>{const value=Math.round(Math.max(40,Math.min(65,n)));setRatio(value);try{localStorage.setItem('ds-quest-panel-width',String(value));}catch{}};
 useEffect(()=>{const viewport=window.visualViewport;const resize=()=>shell.current?.style.setProperty('--quest-viewport',`${viewport?.height??window.innerHeight}px`);resize();viewport?.addEventListener('resize',resize);window.addEventListener('resize',resize);return()=>{viewport?.removeEventListener('resize',resize);window.removeEventListener('resize',resize);};},[]);
 return {shell,panels,ratio,style:{'--quest-split':`${ratio}%`} as CSSProperties,
 onKeyDown:(e:KeyboardEvent)=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();update(e.key==='Home'?40:e.key==='End'?65:ratio+(e.key==='ArrowLeft'?-2:2));}},
 onPointerDown:(e:PointerEvent<HTMLDivElement>)=>{e.currentTarget.setPointerCapture(e.pointerId);},
 onPointerMove:(e:PointerEvent<HTMLDivElement>)=>{if(!e.currentTarget.hasPointerCapture(e.pointerId))return;const rect=panels.current?.getBoundingClientRect();if(rect)update((e.clientX-rect.left)/rect.width*100);}};
}
