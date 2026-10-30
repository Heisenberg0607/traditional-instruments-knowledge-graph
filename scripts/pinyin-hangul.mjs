import { pinyin } from 'pinyin-pro'

// Build-time syllable composition, based on the NIKL Chinese initial/final
// correspondence table. Conventional and historical names are overridden in
// the Korean record glossary; unsupported syllables must be reviewed.
const onset = { b: 7, p: 17, m: 6, f: 17, d: 3, t: 16, n: 2, l: 5, g: 0, k: 15, h: 18, j: 12, q: 14, x: 9, zh: 12, ch: 14, sh: 9, r: 5, z: 13, c: 14, s: 10 }
const finals = { a: '아', o: '오', e: '어', ai: '아이', ei: '에이', ao: '아오', ou: '어우', an: '안', en: '언', ang: '앙', eng: '엉', ong: '웅', i: '이', ia: '야', ie: '예', iao: '야오', iu: '유', iou: '유', ian: '옌', in: '인', iang: '양', ing: '잉', iong: '융', u: '우', ua: '와', uo: '워', uai: '와이', ui: '우이', uei: '우이', uan: '완', un: '운', uang: '왕', ueng: '웡', ü: '위', üe: '웨', üan: '위안', ün: '윈', er: '얼' }
const independent = { a: '아', ai: '아이', an: '안', ang: '앙', ao: '아오', e: '어', en: '언', eng: '엉', er: '얼', o: '오', ou: '어우', yi: '이', ya: '야', yao: '야오', yan: '옌', yang: '양', ye: '예', yin: '인', ying: '잉', yo: '요', yong: '융', you: '유', yu: '위', yue: '웨', yuan: '위안', yun: '윈', wu: '우', wa: '와', wai: '와이', wan: '완', wang: '왕', wei: '웨이', wen: '원', weng: '웡', wo: '워' }
const syllableOverrides = { zhi: '즈', chi: '츠', shi: '스', ri: '르', zi: '쯔', ci: '츠', si: '쓰' }

export function syllableToHangul(syllable) {
  if (syllableOverrides[syllable]) return syllableOverrides[syllable]
  if (independent[syllable]) return independent[syllable]
  const match = syllable.match(/^(zh|ch|sh|[bpmfdtnlgkhjqxrzcsyw])(.+)$/)
  if (!match || onset[match[1]] === undefined) throw Error(`Review pinyin syllable: ${syllable}`)
  const initial = match[1]
  let final = match[2]
  if (['j', 'q', 'x'].includes(initial) && final.startsWith('u')) final = final.replace(/^u/, 'ü')
  let tail = finals[final]
  if (!tail) throw Error(`Review pinyin final: ${syllable}`)
  // Korean does not retain the palatal glide following j/q.
  if (['j', 'q'].includes(initial)) tail = tail.replace(/^야/, '아').replace(/^예/, '에').replace(/^옌/, '엔').replace(/^양/, '앙').replace(/^유/, '우')
  const syllableIndex = tail.charCodeAt(0) - 0xac00
  return String.fromCharCode(0xac00 + onset[initial] * 588 + syllableIndex % 588) + tail.slice(1)
}

export function chineseToHangul(source) {
  return pinyin(source, { type: 'array', toneType: 'none', nonZh: 'consecutive' })
    .map(value => /^[a-zü]+$/.test(value) ? syllableToHangul(value) : value).join('')
}
