import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { CourseImage } from "../../data/courses";
import Modal from "./Modal";
function Photo({
  image,
  large = false,
}: {
  image: CourseImage;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (image.src && !failed)
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading={large ? "eager" : "lazy"}
        onError={() => setFailed(true)}
      />
    );
  return (
    <div className="photo-placeholder">
      <Camera size={large ? 40 : 26} strokeWidth={1} />
      <span>{failed ? "Fotografia indisponível" : "FOTO REAL EM BREVE"}</span>
      <small>Espaço reservado para registros dos estudantes</small>
    </div>
  );
}
export default function PhotoGallery({
  images,
  title,
}: {
  images: CourseImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const [showEnlarged, setShowEnlarged] = useState(false);
  const reduced = useReducedMotion();
  if (!images.length)
    return <p>Fotografias reais serão disponibilizadas neste espaço.</p>;
  const current = images[index % images.length];
  const move = (delta: number) =>
    setIndex((value) => (value + delta + images.length) % images.length);
  const display = (
    <AnimatePresence mode="wait">
      <motion.figure
        key={current.id}
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.25 }}
      >
        <Photo image={current} large={enlarged} />
        <figcaption>{current.caption}</figcaption>
      </motion.figure>
    </AnimatePresence>
  );
  const controls = (
    <div className="gallery-controls">
      <button
        aria-label="Fotografia anterior"
        onClick={() => move(-1)}
        disabled={images.length < 2}
      >
        <ChevronLeft size={18} />
      </button>
      <span aria-live="polite">
        {index + 1} / {images.length}
      </span>
      <button
        aria-label="Próxima fotografia"
        onClick={() => move(1)}
        disabled={images.length < 2}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
  return (
    <div className="photo-gallery">
      <div className="gallery-label">
        <span>REGISTROS DA TURMA</span>
        <button
          onClick={() => {
            setShowEnlarged(true);
            setEnlarged(true);
          }}
          aria-label="Ampliar fotografia"
        >
          <Maximize2 size={17} />
        </button>
      </div>
      {display}
      {controls}
      <div className="gallery-thumbnails">
        {images.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setIndex(i)}
            aria-label={`Ver fotografia ${i + 1}`}
            aria-pressed={i === index}
          >
            <Photo image={image} />
          </button>
        ))}
      </div>
      <p className="photo-notice">
        Sem fotografias publicadas? Os espaços acima são placeholders
        identificados, não registros de atividades realizadas.
      </p>
      {showEnlarged && (
        <Modal
          open={enlarged}
          onClose={() => setEnlarged(false)}
          onAfterClose={() => setShowEnlarged(false)}
          title={`Galeria — ${title}`}
          className="gallery-modal"
        >
          <div className="enlarged-gallery">
            {display}
            {controls}
          </div>
        </Modal>
      )}
    </div>
  );
}
