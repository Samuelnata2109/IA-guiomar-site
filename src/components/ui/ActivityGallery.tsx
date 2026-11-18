import { useEffect, useId, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import type { Course } from '../../data/courses';
import { courseMedia, mediaUrl, type ActivityMedia } from '../../data/courseMedia';
import PhotoGallery from './PhotoGallery';
import Modal from './Modal';
function Player({ item, active }: {item: ActivityMedia; active: boolean}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { if (!active) ref.current?.pause(); }, [active]);
  useEffect(() => { const video=ref.current; return () => { video?.pause(); video?.removeAttribute('src'); video?.load(); }; }, []);
  return <figure className="activity-player">{failed ? <p role="status">Vídeo indisponível. Tente novamente mais tarde.</p> : <video ref={ref} controls playsInline preload="metadata" poster={item.poster ? mediaUrl(item.poster) : undefined} src={mediaUrl(item.src)} onError={() => setFailed(true)} aria-label={item.title}/>}<figcaption>{item.caption}</figcaption></figure>;
}
export default function ActivityGallery({course, active}: {course: Course; active: boolean}) {
  const [tab,setTab]=useState<'foto'|'video'>('foto');
  const [selected,setSelected]=useState<ActivityMedia|null>(null);
  const [playerOpen,setPlayerOpen]=useState(false);
  const id=useId();
  const items=courseMedia[course.id];
  const photos=items.filter(m=>m.type==='foto').map(m=>({id:m.id,src:mediaUrl(m.src),alt:m.title,caption:m.caption}));
  const videos=items.filter(m=>m.type==='video');
  useEffect(()=>{if(!active)setPlayerOpen(false);},[active]);
  function selectTab(next:'foto'|'video'){setPlayerOpen(false);setTab(next);}
  return <div className="activity-gallery"><h3>Galeria de atividades</h3><div role="tablist" aria-label={`Mídias de ${course.name}`} className="activity-tabs">{(['foto','video'] as const).map((type,i)=><button key={type} id={`${id}-${type}`} role="tab" aria-selected={tab===type} aria-controls={`${id}-panel`} tabIndex={tab===type?0:-1} onClick={()=>selectTab(type)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'foto':e.key==='End'?'video':i===0?'video':'foto';selectTab(next);document.getElementById(`${id}-${next}`)?.focus();}}}>{type==='foto'?'Fotografias':'Vídeos'}</button>)}</div><div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${tab}`} tabIndex={0}>{tab==='foto'?<PhotoGallery images={photos.length?[...course.images.filter(image=>image.src),...photos]:course.images} title={course.name}/>:videos.length?<div className="activity-videos">{videos.map(item=><button key={item.id} onClick={()=>{setSelected(item);setPlayerOpen(true);}} aria-label={`Reproduzir ${item.title}`}><span className="activity-cover">{item.poster&&<img src={mediaUrl(item.poster)} alt="" loading="lazy" onError={e=>{e.currentTarget.style.display='none';}}/>}<Play aria-hidden="true"/></span><strong>{item.title}</strong><span>{item.caption}</span></button>)}</div>:<p className="photo-notice">Em breve, vídeos das nossas atividades práticas!</p>}</div>{selected&&<Modal open={playerOpen&&active&&tab==='video'} onClose={()=>setPlayerOpen(false)} onAfterClose={()=>setSelected(null)} title={selected.title} className="gallery-modal"><Player key={selected.id} item={selected} active={playerOpen&&active&&tab==='video'}/></Modal>}</div>;
}
