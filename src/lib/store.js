import { writable } from 'svelte/store';

export const userdata = writable(null);

// Lightweight cross-page event bus for UI refreshes
// Usage:
//  - triggerTableRefresh('spending') from anywhere
//  - components can subscribe or use Table.svelte's refreshTopic prop
export const tableRefresh = writable({ topic: null, at: 0, payload: null });
export function triggerTableRefresh(topic, payload = null) {
    tableRefresh.set({ topic, at: Date.now(), payload });
}
