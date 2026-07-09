"use client";

import { useState } from "react";
import { getCodes, addCode, removeCode, generateShareLink, isPrivateMode, setPrivateMode } from "@/lib/invitation-codes";
import { LotusMark, ClassicDivider } from "./Ornaments";
import { Settings, X, Plus, Trash2, Copy, Check, Share2, Lock, Unlock } from "lucide-react";

export function InvitationSettings() {
  const [open, setOpen] = useState(false);
  const [codes, setCodes] = useState(getCodes());
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [privateMode, setPrivate] = useState(isPrivateMode());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const refresh = () => {
    setCodes(getCodes());
    setPrivate(isPrivateMode());
  };

  const handleAdd = () => {
    if (!newCode.trim()) return;
    addCode(newCode, newName);
    setNewCode("");
    setNewName("");
    refresh();
  };

  const handleRemove = (code: string) => {
    removeCode(code);
    refresh();
  };

  const handleShare = (code: string) => {
    const link = generateShareLink(code);
    navigator.clipboard?.writeText(link).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  const handleTogglePrivate = () => {
    setPrivateMode(!privateMode);
    refresh();
  };

  return (
    <>
      {/* Settings gear button — top-left, subtle */}
      <button
        onClick={() => setOpen(true)}
        className="no-print fixed left-4 top-4 z-[60] flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-navy/85 text-gold backdrop-blur-md transition-all hover:border-orange hover:text-orange"
        aria-label="Invitation settings"
      >
        <Settings className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {/* Settings modal */}
      {open ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/75 px-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Private invitation settings"
        >
          <div
            className="frame-classic anim-scale-in relative max-w-lg w-full bg-ivory px-6 py-7 shadow-2xl max-h-[85vh] overflow-y-auto fancy-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-navy/40 transition-colors hover:text-orange"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <LotusMark width={40} className="anim-shimmer mx-auto mb-2" color="#C8A45D" />
            <h3 className="text-center font-serif-inv text-xl font-semibold text-navy">
              Private Invitation
            </h3>
            <p className="mt-1 text-center font-cormorant text-xs italic text-navy/55">
              Manage invitation codes & share private links
            </p>
            <ClassicDivider className="mx-auto my-4 max-w-[180px]" color="#031F44" />

            {/* Private mode toggle */}
            <div className="mb-5 flex items-center justify-between rounded-lg border border-navy/20 bg-white/50 px-4 py-3">
              <div>
                <p className="font-serif-inv text-sm font-semibold text-navy">
                  Private Mode
                </p>
                <p className="font-body-inv text-xs text-navy/55">
                  Require invitation code to enter
                </p>
              </div>
              <button
                onClick={handleTogglePrivate}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  privateMode
                    ? "border-orange bg-orange/10 text-orange"
                    : "border-navy/30 text-navy/50"
                }`}
              >
                {privateMode ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                {privateMode ? "ON" : "OFF"}
              </button>
            </div>

            {/* Add new code */}
            <div className="mb-5 rounded-lg border border-navy/20 bg-white/50 p-4">
              <p className="mb-3 font-cormorant text-xs uppercase tracking-[0.2em] text-navy/60">
                Create New Code
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Code (e.g. GUEST001)"
                  maxLength={20}
                  className="flex-1 rounded-md border border-navy/30 bg-ivory/40 px-3 py-2 font-body-inv text-sm text-navy placeholder:text-navy/35 focus:border-orange focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Guest name (optional)"
                  maxLength={40}
                  className="flex-1 rounded-md border border-navy/30 bg-ivory/40 px-3 py-2 font-body-inv text-sm text-navy placeholder:text-navy/35 focus:border-orange focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
                <button
                  onClick={handleAdd}
                  className="btn-pill solid-navy px-4 py-2 text-xs uppercase tracking-[0.15em]"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Add
                </button>
              </div>
            </div>

            {/* Code list */}
            <p className="mb-2 font-cormorant text-xs uppercase tracking-[0.2em] text-navy/60">
              Invitation Codes ({codes.length})
            </p>
            <div className="space-y-2 max-h-[240px] overflow-y-auto fancy-scroll pr-1">
              {codes.length === 0 ? (
                <p className="py-4 text-center font-cormorant text-sm italic text-navy/40">
                  No codes yet. Create one above.
                </p>
              ) : (
                codes.map((c) => (
                  <div
                    key={c.code}
                    className="flex items-center gap-2 rounded-md border border-navy/15 bg-white/60 px-3 py-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-serif-inv text-sm font-semibold text-navy">
                        {c.code}
                      </p>
                      <p className="truncate font-body-inv text-xs text-navy/55">
                        {c.guestName} {c.used && "· ✓ opened"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleShare(c.code)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-navy/20 text-navy/60 transition-all hover:border-gold hover:text-gold"
                      aria-label={`Share ${c.code}`}
                      title="Copy share link"
                    >
                      {copiedCode === c.code ? (
                        <Check className="h-3.5 w-3.5 text-orange" strokeWidth={1.5} />
                      ) : (
                        <Share2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      )}
                    </button>
                    <button
                      onClick={() => handleRemove(c.code)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-navy/20 text-navy/60 transition-all hover:border-orange hover:text-orange"
                      aria-label={`Delete ${c.code}`}
                      title="Delete code"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Info note */}
            <div className="mt-4 rounded-md bg-navy/5 px-3 py-2">
              <p className="font-body-inv text-[11px] leading-relaxed text-navy/50">
                Share a private link with each guest. When private mode is ON,
                guests must enter their code to access the invitation. The code
                can also be passed via URL: <code className="text-navy/70">?code=XXXX</code>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
