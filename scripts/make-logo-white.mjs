import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const inputBuf = fs.readFileSync('upload/logo (4).png');
  const meta = await sharp(inputBuf).metadata();
  console.log('Original:', meta.width, 'x', meta.height);

  // Get raw RGBA pixels
  const raw = await sharp(inputBuf).ensureAlpha().raw().toBuffer();
  const w = meta.width;
  const h = meta.height;
  const ch = 4;

  // The English text "MODERN CANCER HOSPITAL GUANGZHOU" is in the bottom ~38%
  // of the logo (starts ~62% from top). The Chinese text is in the top portion.
  // We want to keep: the left emblem, the right seal, and only the bottom English line.
  // Strategy: zero out (make transparent) the top ~58% of the text area, but keep
  // the left emblem (first ~12% width) and right seal (last ~10% width) at all heights.
  // Actually, simpler: just crop the bottom portion that contains the English text,
  // plus the full-height emblems on left and right.

  // Approach: Build a mask that keeps:
  //  - Full height of the left ~13% (emblem) and right ~11% (seal)
  //  - Bottom ~40% of the middle area (English text only)
  const leftEmblemEnd = Math.round(w * 0.13);
  const rightSealStart = Math.round(w * 0.89);
  const englishStart = Math.round(h * 0.60); // English text starts ~60% down

  const out = Buffer.alloc(w * h * ch);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      const a = raw[i + 3];
      const keepLeft = x < leftEmblemEnd;
      const keepRight = x > rightSealStart;
      const keepBottom = y >= englishStart;
      if (a > 10 && (keepLeft || keepRight || keepBottom)) {
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
        out[i + 3] = a;
      } else {
        out[i] = 0;
        out[i + 1] = 0;
        out[i + 2] = 0;
        out[i + 3] = 0;
      }
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile('public/invitation/logo-white.png');
  console.log('White logo (English only) saved');

  // Verify on navy
  const logoResized = await sharp('public/invitation/logo-white.png')
    .resize(760, null, { fit: 'inside' })
    .toBuffer();
  await sharp({
    create: { width: 800, height: 200, channels: 4, background: '#031f44' },
  })
    .composite([{ input: logoResized, blend: 'over', top: 30, left: 20 }])
    .png()
    .toFile('/tmp/logo-on-navy.png');
  console.log('Verification saved');
}

main().catch(e => { console.error(e); process.exit(1); });
