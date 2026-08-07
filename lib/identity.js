"use client";

/**
 * Retrieves existing device ID from localStorage or creates a new UUID v4.
 * Enables friction-free anonymous check-ins without requiring login/signup.
 */
export function getOrCreateDeviceId() {
  if (typeof window === "undefined") return null;

  const STORAGE_KEY = "nudge_device_id";
  let deviceId = localStorage.getItem(STORAGE_KEY);

  if (!deviceId) {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      deviceId = crypto.randomUUID();
    } else {
      deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    localStorage.setItem(STORAGE_KEY, deviceId);
  }

  return deviceId;
}
