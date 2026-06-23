import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const inputBuf = fs.readFileSync('upload/logo (4).png');
  const meta = await sharp(inputBuf).metadata();
  console.log('Original:', meta.width, 'x', meta.height);

  const raw = await sharp(inputBuf).ensureAlpha().raw().toBuffer();
  const w = meta.width;
  const h = meta.height;
  const ch = 4;

  // White logo WITHOUT the right circular seal.
  // The seal occupies approximately the rightmost ~11% of the logo width.
  const sealStart = Math.round(w * 0.89);

  const out = Buffer.alloc(w * h * ch);
  for (let i = 0; i < w * h; i++) {
    const x = i % w;
    const a = raw[i * ch + 3];
    const inSealArea = x >= sealStart;
    if (a > 10 && !inSealArea) {
      out[i * ch + 0] = 255;
      out[i * ch + 1] = 255;
      out[i * ch + 2] = 255;
      out[i * ch + 3] = a;
    } else {
      out[i * ch + 0] = 0;
      out[i * ch + 1] = 0;
      out[i * ch + 2] = 0;
      out[i * ch + 3] = 0;
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile('public/invitation/logo-white-noseal.png');
  console.log('White logo (no seal) saved');

  // Verify on navy
  const logoResized = await sharp('public/invitation/logo-white-noseal.png')
    .resize(760, null, { fit: 'inside' })
    .toBuffer();
  await sharp({
    create: { width: 800, height: 200, channels: 4, background: '#031f44' },
  })
    .composite([{ input: logoResized, blend: 'over', top: 30, left: 20 }])
    .png()
    .toFile('/tmp/logo-noseal-navy.png');
  console.log('Verification saved');
}

main().catch(e => { console.error(e); process.exit(1); });
