import fs from 'fs/promises'
import path from 'path'
import { PUBLIC_PATH } from './src/paths.js'
import { createSvgTextFromBuffer } from './src/converters/generate_sound_meta.js'

const dir = path.resolve(PUBLIC_PATH, './sounds')

;(async () => {
  const files = await fs.readdir(dir)

  for (const file of files) {
    if (path.extname(file) !== '.mp3') continue

    const metaFile = `${path.basename(file, '.mp3')}.meta.svg`;

    const buffer = await fs.readFile(path.resolve(dir, file));
    const svgText = await createSvgTextFromBuffer(buffer);
    await fs.writeFile(path.resolve(dir, metaFile), svgText, 'utf8');

    console.log(`outputed: ${metaFile}`)
  }
})()
