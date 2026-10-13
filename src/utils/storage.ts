import { UserSettings, DEFAULT_SETTINGS } from '../types/settings';

const STORAGE_KEY = 'dreamscape_user_settings_v1';

export function loadStoredSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      visitedWorlds: Array.isArray(parsed.visitedWorlds) ? parsed.visitedWorlds : DEFAULT_SETTINGS.visitedWorlds,
    };
  } catch (e) {
    console.warn('Unable to read from localStorage, using defaults:', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Unable to write to localStorage:', e);
  }
}

export function addVisitedWorld(worldId: string): string[] {
  const settings = loadStoredSettings();
  if (!settings.visitedWorlds.includes(worldId)) {
    const updated = [...settings.visitedWorlds, worldId];
    saveStoredSettings({ ...settings, visitedWorlds: updated });
    return updated;
  }
  return settings.visitedWorlds;
}
