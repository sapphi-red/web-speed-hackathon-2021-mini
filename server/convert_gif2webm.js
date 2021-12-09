import fs from 'fs/promises'
import path from 'path'
import { fetchFile } from '@ffmpeg/ffmpeg'
import { PUBLIC_PATH } from './src/paths.js'
import { ffmpeg } from './src/ffmpeg.js'

const doneFiles = []

;(async () => {
  const dir = path.resolve(PUBLIC_PATH, './movies')

  console.log('Loading ffmpeg')
  await ffmpeg.load();
  console.log('Loaded ffmpeg')

  const files = await fs.readdir(dir)
  console.log('Start convert files', files)
  for (const file of files) {
    if (path.extname(file) !== '.gif') continue
    const name = path.basename(file, '.gif')
    if (doneFiles.includes(name)) continue

    const newFile = `${name}.webm`

    const buf = await fetchFile(path.resolve(dir, file))
    ffmpeg.FS('writeFile', 'file', buf)
    await ffmpeg.run('-i', 'file', '-movflags', 'faststart', '-pix_fmt', 'yuv420p', '-row-mt', '1', newFile)
    const exported = ffmpeg.FS('readFile', newFile)
    await fs.writeFile(path.resolve(dir, `./${newFile}`), exported, 'binary')
    console.log(`outputed: ${newFile}`)
  }
})()
