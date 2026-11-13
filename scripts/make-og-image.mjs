// Turns scripts/og-image.svg into public/og-image.png (the picture shown
// when someone shares a link to the site). Run with:  npm run og
import sharp from 'sharp';

await sharp('scripts/og-image.svg').png().toFile('public/og-image.png');
console.log('Created public/og-image.png');
