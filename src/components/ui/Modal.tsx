import { useEffect, useId, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
let locks = 0;
let previousOverflow = "";
function lockPage() {
  if (locks++ === 0) {
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
  }
  window.dispatchEvent(new window.Event("ds:modal-lock"));
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0)
      document.documentElement.style.overflow = previousOverflow;
    window.dispatchEvent(new window.Event("ds:modal-lock"));
  };
}
export default function Modal({
  open,
  onClose,
  onAfterClose,
  title,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(
    document.activeElement as HTMLElement,
  );
  const release = useRef<(() => void) | null>(null);
  const callbacks = useRef({ onClose, onAfterClose });
  callbacks.current = { onClose, onAfterClose };
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const id = useId();
  useEffect(() => {
    const dialog = ref.current!;
    let active = true;
    if (open) {
      if (!dialog.open) {
        if (!dialog.contains(document.activeElement))
          opener.current = document.activeElement as HTMLElement;
        dialog.showModal();
        release.current = lockPage();
      }
      controls.set("closed");
      void controls.start("open");
    } else if (dialog.open) {
      void controls.start("closed").then(() => {
        if (!active) return;
        dialog.close();
        release.current?.();
        release.current = null;
        const target = opener.current;
        opener.current = null;
        if (target?.isConnected) target.focus({ preventScroll: true });
        callbacks.current.onAfterClose?.();
      });
    }
    return () => {
      active = false;
      controls.stop();
    };
  }, [open, controls, reduced]);
  useEffect(
    () => () => {
      ref.current?.close();
      release.current?.();
      release.current = null;
      if (opener.current?.isConnected)
        opener.current.focus({ preventScroll: true });
    },
    [],
  );
  return (
    <dialog
      ref={ref}
      className={`modal-shell ${className}`}
      aria-labelledby={id}
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault();
        callbacks.current.onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) callbacks.current.onClose();
      }}
      onKeyDown={(e) => {
        if (
          e.key !== "Tab" ||
          (e.target as Element).closest("dialog") !== e.currentTarget
        )
          return;
        const focusable = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled),a[href],input,select,textarea,[tabindex="0"]',
          ),
        ).filter((el) => !el.hidden && !el.closest("[hidden]"));
        const first = focusable[0],
          last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
    >
      <motion.div
        className="modal-backdrop"
        aria-hidden="true"
        onClick={onClose}
        initial="closed"
        animate={controls}
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        transition={{ duration: reduced ? 0 : 0.45 }}
      />
      <motion.div
        className="modal-surface"
        initial="closed"
        animate={controls}
        variants={{
          closed: {
            opacity: 0,
            scale: reduced ? 1 : 0.96,
            y: reduced ? 0 : 12,
          },
          open: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { staggerChildren: reduced ? 0 : 0.07 },
          },
        }}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal-top">
          <span id={id}>{title}</span>
          <button
            autoFocus
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar janela"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </motion.div>
    </dialog>
  );
}
