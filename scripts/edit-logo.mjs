import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  const buf = fs.readFileSync('/tmp/logo-input.png');
  const b64 = buf.toString('base64');
  const dataUrl = `data:image/png;base64,${b64}`;

  const resp = await zai.images.generations.edit({
    prompt: "Convert this entire logo to pure white color. Keep only the left infinity emblem, the right circular seal outline, and the English text line MODERN CANCER HOSPITAL GUANGZHOU. Remove the Chinese characters. Make ALL remaining elements pure white on transparent background. Keep horizontal layout.",
    images: [{ url: dataUrl }],
    size: '1440x720',
  });

  const outB64 = resp.data[0].base64;
  fs.writeFileSync('public/invitation/logo-white.png', Buffer.from(outB64, 'base64'));
  console.log('Saved white logo');
}
main().catch(e => { console.error(e); process.exit(1); });
