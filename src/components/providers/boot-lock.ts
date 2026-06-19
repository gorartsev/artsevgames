// tiny shared store for the boot-time scroll lock.
// starts locked: the main menu / loading screen is up first, scroll is frozen
// until the user presses PLAY and the loading finishes.

let locked = true;
const listeners = new Set<(v: boolean) => void>();

export const isScrollLocked = () => locked;

export function setScrollLocked(value: boolean) {
  if (locked === value) return;
  locked = value;
  listeners.forEach((fn) => fn(value));
}

export function onScrollLockChange(fn: (v: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
