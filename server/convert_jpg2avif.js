import fs from 'fs/promises'
import path from 'path'
import { PUBLIC_PATH } from './src/paths.js'
import sharp from 'sharp'

const dir = path.resolve(PUBLIC_PATH, './images')
// const dir = path.resolve(PUBLIC_PATH, './images/profiles')

;(async () => {
  const files = await fs.readdir(dir)

  for (const file of files) {
    if (path.extname(file) !== '.jpg') continue

    const newFile = `${path.basename(file, '.jpg')}.avif`
    // const newFile = `${path.basename(file, '.jpg')}-2.avif`

    await sharp(path.resolve(dir, file))
      .resize({
        fit: 'cover',
        width: 640,
        // width: 300,
        height: 340,
        position: 'center',
      })
      // .resize({
      //   fit: 'contain',
      //   width: 128,
      //   position: 'top',
      //   withoutEnlargement: true
      // })
      .toFormat('avif', {
        quality: 40,
        speed: 0,
        chromaSubsampling: '4:2:0',
      })
      .toFile(path.resolve(dir, `./${newFile}`))

    console.log(`outputed: ${newFile}`)
  }
})()
