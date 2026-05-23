export function buildJobShareUrl(job) {
  const url = new URL('/jobs', window.location.origin);
  url.searchParams.set('job', String(job.id));
  return url.toString();
}

export function buildJobShareTitle(job) {
  return `${job.title} — ${job.company}`;
}

export function buildJobShareText(job) {
  const salary = job.salaryMax
    ? `${job.salary}–${job.salaryMax} so'm`
    : `${job.salary} so'm`;
  return `${job.title}\n${job.company} · ${job.location}\nMaosh: ${salary}`;
}

export function buildJobSharePayload(job) {
  const url = buildJobShareUrl(job);
  const title = buildJobShareTitle(job);
  const text = buildJobShareText(job);
  return { url, title, text, fullText: `${text}\n\n${url}` };
}

export async function tryNativeShare(payload) {
  if (!navigator.share) return false;
  try {
    await navigator.share({
      title: payload.title,
      text: payload.text,
      url: payload.url,
    });
    return true;
  } catch (err) {
    if (err?.name === 'AbortError') return true;
    return false;
  }
}

export async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  return ok;
}
