export function legacyCopyExec(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '-9999px';
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, ta.value.length);
    const ok = (document ).execCommand && (document ).execCommand('copy');
    document.body.removeChild(ta);
    return !!ok;
  } catch { return false; }
}

export async function safeCopy(text) {
  try { if ((navigator )?.clipboard?.writeText) { await (navigator ).clipboard.writeText(text); return { ok: true, method: 'clipboard' }; } } catch {}
  try { const ok = legacyCopyExec(text); if (ok) return { ok: true, method: 'legacy' }; } catch {}
  return { ok: false, method: 'manual' };
}

export function downloadTextAsFile(text, filename = 'final_prompt.txt') {
  try {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.style.display = 'none';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 0);
    return url;
  } catch { return null; }
}