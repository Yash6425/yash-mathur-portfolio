/**
 * Small client for the portfolio's Express API (served from the same site at /api).
 * Override the base URL with VITE_API_BASE if the API ever lives elsewhere.
 */
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? '/api';

async function request<T>(path: string, init?: RequestInit, timeoutMs = 8000): Promise<{ status: number; data: T }> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: init?.body ? { Accept: 'application/json', 'Content-Type': 'application/json' } : { Accept: 'application/json' },
    });
    const type = res.headers.get('content-type') ?? '';
    if (!type.includes('application/json')) throw new Error(`Unexpected response (${res.status})`);
    return { status: res.status, data: (await res.json()) as T };
  } finally {
    window.clearTimeout(timer);
  }
}

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const { status, data } = await request<T>(path);
    return status >= 200 && status < 300 ? data : null;
  } catch {
    return null;
  }
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; errors?: Partial<Record<keyof ContactPayload, string>>; reason: 'invalid' | 'server' | 'network' };

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const { status, data } = await request<{ ok: boolean; errors?: Record<string, string> }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (status >= 200 && status < 300 && data.ok) return { ok: true };
    if (status === 400 && data.errors) return { ok: false, errors: data.errors, reason: 'invalid' };
    return { ok: false, reason: 'server' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
