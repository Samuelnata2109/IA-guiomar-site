import type { ByteState } from "../game/types";

export function ByteFallback({
  state = "idle",
  active = true,
}: {
  state?: ByteState;
  active?: boolean;
}) {
  return (
    <div
      className={`byte-fallback byte-${state} ${active ? "" : "byte-paused"}`}
      aria-hidden="true"
    >
      <div className="byte-antenna" />
      <div className="byte-head">
        <span className="byte-face">
          <i />
          <i />
        </span>
      </div>
      <div className="byte-body">
        <i />
      </div>
      <span className="byte-arm left" />
      <span className="byte-arm right" />
      <span className="byte-foot left" />
      <span className="byte-foot right" />
    </div>
  );
}
