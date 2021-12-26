import fs from 'fs/promises'
import path from 'path'
import { PUBLIC_PATH } from './src/paths.js'
import { promisify } from 'util'
import zlib from 'zlib'

const brCompress = promisify(zlib.brotliCompress)

const soundsDir = path.resolve(PUBLIC_PATH, './sounds')

const getFileList = async dir =>
  (await fs.readdir(dir)).map(file => path.resolve(dir, file))

;(async () => {
  const files = (await getFileList(soundsDir)).filter(file => path.extname(file) === '.svg')
  files.push(path.resolve(PUBLIC_PATH, './fonts/webfont.css'))

  for (const file of files) {
    const compressedFile = `${file}.br`;

    const buffer = await fs.readFile(file);
    const compressedBuffer = await brCompress(buffer, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      }
    })
    await fs.writeFile(compressedFile, compressedBuffer);

    console.log(`outputed: ${compressedFile}`)
  }
})()
