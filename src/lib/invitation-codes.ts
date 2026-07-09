/**
 * Private invitation code management.
 * Codes are stored in localStorage. Each code has an optional guest name
 * and a "used" flag. The system supports:
 * - Creating / listing / deleting codes
 * - Generating shareable links (?code=XXXX)
 * - Validating a code on entry
 * - Marking a code as used after the guest opens the invitation
 */

export type InvitationCode = {
  code: string;
  guestName: string;
  used: boolean;
  createdAt: number;
};

const STORAGE_KEY = "bali-anniversary-invitation-codes-v1";

/* Default seed codes so the system works out of the box */
const SEED_CODES: InvitationCode[] = [
  { code: "BALI2026", guestName: "VIP Guest", used: false, createdAt: Date.now() },
  { code: "STAMFORD", guestName: "St. Stamford Partner", used: false, createdAt: Date.now() },
  { code: "MARLYNE", guestName: "Marlyne", used: false, createdAt: Date.now() },
];

function loadCodes(): InvitationCode[] {
  if (typeof window === "undefined") return SEED_CODES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CODES));
      return SEED_CODES;
    }
    const parsed = JSON.parse(raw) as InvitationCode[];
    if (!Array.isArray(parsed)) return SEED_CODES;
    return parsed;
  } catch {
    return SEED_CODES;
  }
}

function saveCodes(codes: InvitationCode[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  } catch {
    /* storage unavailable */
  }
}

export function getCodes(): InvitationCode[] {
  return loadCodes();
}

export function addCode(code: string, guestName: string): InvitationCode {
  const codes = loadCodes();
  const upper = code.trim().toUpperCase();
  // Don't add duplicates
  if (codes.some((c) => c.code === upper)) {
    return codes.find((c) => c.code === upper)!;
  }
  const entry: InvitationCode = {
    code: upper,
    guestName: guestName.trim() || "Guest",
    used: false,
    createdAt: Date.now(),
  };
  const next = [entry, ...codes];
  saveCodes(next);
  return entry;
}

export function removeCode(code: string) {
  const codes = loadCodes().filter((c) => c.code !== code.trim().toUpperCase());
  saveCodes(codes);
}

export function validateCode(code: string): { valid: boolean; guestName?: string } {
  const codes = loadCodes();
  const upper = code.trim().toUpperCase();
  const found = codes.find((c) => c.code === upper);
  if (found) {
    return { valid: true, guestName: found.guestName };
  }
  return { valid: false };
}

export function markCodeUsed(code: string) {
  const codes = loadCodes();
  const upper = code.trim().toUpperCase();
  const next = codes.map((c) => (c.code === upper ? { ...c, used: true } : c));
  saveCodes(next);
}

export function generateShareLink(code: string): string {
  if (typeof window === "undefined") return "";
  const upper = code.trim().toUpperCase();
  const url = new URL(window.location.href);
  url.searchParams.set("code", upper);
  return url.toString();
}

export function getCodeFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  return code ? code.toUpperCase() : null;
}

/* Check if private invitation mode is enabled */
const MODE_KEY = "bali-anniversary-invitation-mode";
export function isPrivateMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(MODE_KEY) === "true";
  } catch {
    return false;
  }
}
export function setPrivateMode(enabled: boolean) {
  try {
    localStorage.setItem(MODE_KEY, enabled ? "true" : "false");
  } catch {
    /* ignore */
  }
}
