// Color theme: auto follows the OS; light/dark set <html data-theme>, which styles.css reads. Remembered in localStorage.
import { useSyncExternalStore } from 'react';

export type Theme = 'auto' | 'light' | 'dark';
const KEY = 'theme';
let cur: Theme = 'auto';
const apply = () => {
  const r = document.documentElement;
  if (cur === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', cur);
  const dark = cur === 'dark' || (cur === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(m => { m.content = dark ? '#181B1F' : '#F6F7F9'; });
};
try { const v = localStorage.getItem(KEY); if (v === 'light' || v === 'dark') cur = v; } catch {}
apply();
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', apply); } catch {}
const subs = new Set<() => void>();
export function setTheme(t: Theme) {
  cur = t; apply();
  try { localStorage.setItem(KEY, t); } catch {}
  subs.forEach(f => f());
}
export const useTheme = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => cur);
