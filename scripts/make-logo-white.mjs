import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const inputBuf = fs.readFileSync('upload/logo (4).png');
  const meta = await sharp(inputBuf).metadata();
  console.log('Original:', meta.width, 'x', meta.height, meta.channels, 'channels');

  // Get raw RGBA pixels
  const raw = await sharp(inputBuf).ensureAlpha().raw().toBuffer();
  const w = meta.width;
  const h = meta.height;
  const ch = 4;

  // Build output: ALL opaque pixels become pure white, preserve alpha.
  // Keep the ENTIRE logo (emblem + Chinese text + English text + seal).
  // Do NOT remove or translate any text.
  const out = Buffer.alloc(w * h * ch);
  for (let i = 0; i < w * h; i++) {
    const a = raw[i * ch + 3]; // alpha
    if (a > 10) {
      // Opaque pixel → white with same alpha
      out[i * ch + 0] = 255; // R
      out[i * ch + 1] = 255; // G
      out[i * ch + 2] = 255; // B
      out[i * ch + 3] = a;   // preserve alpha
    } else {
      // Transparent → stays transparent
      out[i * ch + 0] = 0;
      out[i * ch + 1] = 0;
      out[i * ch + 2] = 0;
      out[i * ch + 3] = 0;
    }
  }

  await sharp(out, {
    raw: { width: w, height: h, channels: ch },
  })
    .png()
    .toFile('public/invitation/logo-white.png');

  console.log('White logo saved (all elements kept, Chinese text included)');

  // Verify by compositing on navy
  const logoResized = await sharp('public/invitation/logo-white.png')
    .resize(760, null, { fit: 'inside' })
    .toBuffer();
  await sharp({
    create: { width: 800, height: 200, channels: 4, background: '#031f44' },
  })
    .composite([{ input: logoResized, blend: 'over', top: 30, left: 20 }])
    .png()
    .toFile('/tmp/logo-on-navy.png');
  console.log('Verification composite saved');
}

main().catch(e => { console.error(e); process.exit(1); });
