import fs from 'fs/promises'
import path from 'path'
// import { fetchFile } from '@ffmpeg/ffmpeg'
import { PUBLIC_PATH } from './src/paths.js'
import { ffmpeg } from './src/ffmpeg.js'
import { execSync } from 'child_process'

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

    // const buf = await fetchFile(path.resolve(dir, file))
    // ffmpeg.FS('writeFile', 'file', buf)
    // await ffmpeg.run('-i', 'file', '-movflags', 'faststart', '-vf', 'scale=640:-1', '-pix_fmt', 'yuv420p', '-row-mt', '1', newFile)
    // const exported = ffmpeg.FS('readFile', newFile)
    // await fs.writeFile(path.resolve(dir, `./${newFile}`), exported, 'binary')

    execSync(`"C:\\Users\\green\\Downloads\\ffmpeg-4.4.1-full_build\\bin\\ffmpeg.exe" -i ${path.resolve(dir, file)} -movflags faststart -vf "scale=640:-1" -vcodec libaom-av1 -pix_fmt yuv420p ${path.resolve(dir, `./${newFile}`)}`)

    console.log(`outputed: ${newFile}`)
  }
})()
