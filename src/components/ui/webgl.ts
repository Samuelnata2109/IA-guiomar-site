let webgl2: boolean | undefined;

export function supportsWebGL2() {
  if (webgl2 !== undefined) return webgl2;
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    webgl2 = !!context;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webgl2 = false;
  }
  return webgl2;
}
