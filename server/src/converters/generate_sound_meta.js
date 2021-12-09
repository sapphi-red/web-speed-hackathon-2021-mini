import { OfflineAudioContext } from 'web-audio-engine';

import { convertSound } from './convert_sound';

const mean = nums => {
  let total = 0
  for (const n of nums) {
    if (!Number.isFinite(n)) continue
    total += n
  }
  return total / nums.length
}

const bimean = (arr1, arr2) => arr1.map((n, i) => (n + arr2[i]) / 2)

const chunk = (arr, chunkSize = 1, cache = []) => {
  if (chunkSize <= 0) return cache
  const max = Math.ceil(arr.length / chunkSize)
  for (let i = 0; i < max; i++) {
    cache.push(arr.subarray(i * chunkSize, (i+1) * chunkSize))
  }
  return cache
}

const getPeakRatiosFromAudioBuffer = buffer => {
  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = bimean(leftData, rightData);
  // 100 個の chunk に分ける
  const chunks = chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(mean);
  // chunk の平均の中から最大値を取る
  const max = Math.max(...peaks);
  const ratios = peaks.map(peak => peak / max)
  return ratios
}

const createSvgTextFromPeakRatios = ratios => {
  let text = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">'
  for (const [i, ratio] of ratios.entries()) {
    text += '<rect '+
      'fill="#2563EB" '+
      `height="${ratio}" `+
      'width="1" '+
      `x="${i}" `+
      `y="${1 - ratio}"`+
      '/>'
  }
  text += '</svg>'
  return text
}

export const createSvgTextFromBuffer = async buffer => {
  const wavBuffer = (await convertSound(buffer, {
    extension: 'wav',
  })).buffer;
  const audioCtx = new OfflineAudioContext(2, wavBuffer.byteLength, 48000);
  const audioBuffer = await audioCtx.decodeAudioData(wavBuffer.slice(0));
  const ratios = getPeakRatiosFromAudioBuffer(audioBuffer);
  return createSvgTextFromPeakRatios(ratios);
}
