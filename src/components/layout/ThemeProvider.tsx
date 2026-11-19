import {
  createContext,
  useEffect,
  type ReactNode,
} from "react";
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
    try {
      localStorage.removeItem("ds-guiomar-theme");
    } catch {
      /* The page remains light when storage is unavailable. */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#f0f5fb");
  }, []);
  return (
    <>{children}</>
  );
}
