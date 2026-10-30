import fs from 'node:fs'
import { geographic, properNames, instruments, context } from './generate-english-records.mjs'
import { chineseToHangul } from './pinyin-hangul.mjs'
import { table, recordTerms, exact, phrases, words } from './korean-glossary.mjs'

const read = path => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'))
const englishRecords = read('../src/i18n/english-records.json')
const englishAnnotations = read('../src/i18n/english-annotations.json')
const messages = Object.fromEntries(fs.readFileSync(new URL('../src/i18n/messages.tsv', import.meta.url), 'utf8').trimEnd().split(/\r?\n/).map(line => { const [source, , korean] = line.split('\t'); return [source, korean] }))
const hangulNames = Object.fromEntries([...Object.keys(geographic), ...Object.keys(properNames)].map(source => [source, chineseToHangul(source)]))
const suffixes = new Set(['省', '市', '县', '区', '旗', '乡', '镇', '村', '岛', '号', '号墓', '墓'])
const missing = new Set()
const output = { artifact: {}, institution: {}, site: {}, part: {}, attribute: {}, decoration: {}, period: {}, vocabulary: {} }

function recordLabel(source, kind) {
  if (!/\p{Script=Han}/u.test(source) || ['未知', '无', '不详', '未详'].includes(source)) return source
  const dictionary = { ...hangulNames, ...recordTerms, 茂县: '마오현', 眉县: '메이현', 殷墟: '은허', 殷墟西区: '은허 서구', 周原: '주원', 大司空: '다쓰쿵', ...(kind === 'artifact' ? { 大铙: '대형 요', 大钟: '대형 종', 大铜鼓: '대형 청동 북', 小型: '소형' } : {}) }
  // Instrument terms are never matched inside institution/site proper names.
  if (kind !== 'artifact') for (const key of Object.keys(instruments)) if (!Object.hasOwn(context, key) && !Object.hasOwn(properNames, key)) delete dictionary[key]
  const entries = Object.entries(dictionary).sort(([a], [b]) => b.length - a.length)
  const input = source.replace(/第?\s*(\d+)\s*号(商代|西周|春秋|战国|西汉|东汉|汉代|唐代|宋代|元代|明代|清代)?墓/g,
    (_, number, period) => `${period ? recordTerms[period] + ' ' : ''}${number}호묘`)
  const tokens = []
  let pending = ''
  const flush = () => { if (pending) { tokens.push(chineseToHangul(pending)); pending = '' } }
  for (let i = 0; i < input.length;) {
    const match = entries.find(([term]) => input.startsWith(term, i))
    if (match) {
      flush()
      if (suffixes.has(match[0]) && tokens.length) tokens[tokens.length - 1] += match[1]
      else tokens.push(match[1])
      i += match[0].length
    } else if (/\p{Script=Han}/u.test(input[i])) pending += input[i++]
    else {
      flush()
      const run = input.slice(i).match(/^[^\p{Script=Han}]+/u)[0]
      tokens.push(run.replace(/[、，；;]/g, '·').replace(/（/g, '(').replace(/）/g, ')'))
      i += run.length
    }
  }
  flush()
  return tokens.join(' ').replace(/\s+/g, ' ').replace(/(\d)\s+(호묘|호)/g, '$1$2').replace(/\s*·\s*/g, '·').replace(/\s+([,.%)])/g, '$1').replace(/\(\s+/g, '(').trim()
}

const phraseEntries = Object.entries(phrases).sort(([a], [b]) => b.length - a.length)
function technicalLabel(source, english) {
  if (exact[source]) return exact[source]
  if (!/\p{Script=Han}/u.test(source)) return source
  if (messages[source]) return messages[source].replace(/\s*[（(][^()（）]*\p{Script=Han}[^()（）]*[）)]/gu, '').trim()
  const text = english.toLowerCase()
  const tokens = []
  for (let i = 0; i < text.length;) {
    const phrase = phraseEntries.find(([key]) => text.startsWith(key, i) && !/[a-z]/.test(text[i + key.length] || ''))
    if (phrase) { tokens.push(phrase[1]); i += phrase[0].length }
    else if (/[a-z]/.test(text[i])) {
      const word = text.slice(i).match(/^[a-z]+/)[0]
      if (Object.hasOwn(words, word)) tokens.push(words[word])
      else if (word.length === 1 || /^(?:ii|iii|iv|xx|xxxx)$/.test(word)) tokens.push(word.toUpperCase())
      else { missing.add(word); tokens.push(`[${word}]`) }
      i += word.length
    } else {
      const run = text.slice(i).match(/^[^a-z]+/)[0]
      tokens.push(run.replace(/-/g, ' '))
      i += run.length
    }
  }
  return tokens.join(' ').replace(/\s+/g, ' ').replace(/\s+([,;.%)])/g, '$1').replace(/\(\s+/g, '(').replace(/(모양|형태)\s+\1/g, '$1').trim().replace(/^초과 (\d+(?:\.\d+)?)$/, '$1 초과')
}

const periods = table(`
Shang dynasty	상나라
Western Zhou	서주
Eastern Zhou	동주
Zhou dynasty	주나라
Spring and Autumn period	춘추시대
Warring States period	전국시대
Qin dynasty	진나라
Han dynasty	한나라
Western Han	전한
Eastern Han	후한
Eastern Wei	동위
Northern dynasties	북조
Northern and Southern dynasties	남북조시대
Five Dynasties	오대
Northern Song	북송
Southern Song	남송
Tang dynasty	당나라
Song dynasty	송나라
Yuan dynasty	원나라
Ming dynasty	명나라
Qing dynasty	청나라
Liao dynasty	요나라
Jin dynasty	금나라
Neolithic	신석기시대
Qin–Han	진·한
Sui–Tang	수·당
Ming–Qing	명·청
Song–Yuan	송·원
Yuan–Ming	원·명
Song–Jin	송·금
Tang–Song	당·송
Han–Wei	한·위
Song–Ming	송~명
Southern Song–Ming	남송~명
Warring States–Han	전국~한
Warring States–Western Han	전국~전한
Western Han–Six Dynasties	전한~육조
Eastern Han–Southern dynasties	후한~남조
Late Shang–early Zhou	상나라 말기~주나라 초기
Late Southern dynasties–middle Tang	남조 말기~당나라 중기
Late Spring and Autumn or early Warring States period	춘추 후기 또는 전국 초기
Late Spring and Autumn–early Warring States period	춘추 후기~전국 초기
Late Western Zhou–early Spring and Autumn period	서주 말기~춘추 초기
Late Western Zhou–early Eastern Zhou (source also labels early Spring and Autumn)	서주 말기~동주 초기 (원문에는 춘추 초기 표기도 함께 있음)
Early–middle Western Zhou, around the reign of King Mu	서주 전·중기, 목왕 재위 전후
Between the Tang and Song dynasties	당나라와 송나라 사이
Earlier part of the early Western Zhou	서주 전기의 이른 단계
Later part of the early Western Zhou	서주 전기의 늦은 단계
Earlier part of the middle Western Zhou	서주 중기의 이른 단계
Earlier part of the middle Spring and Autumn period	춘추 중기의 이른 단계
Earlier part of the late Spring and Autumn period (570–560 BCE)	춘추 후기의 이른 단계 (기원전 570~560년)
Later part of the early Spring and Autumn period (c. 650 BCE)	춘추 전기의 늦은 단계 (기원전 650년경)
Late Yinxu phase, Shang dynasty	상나라 은허 말기
Early part of Yinxu phase III, Shang dynasty	상나라 은허 3기의 이른 단계
Yinxu phase II, Shang dynasty	상나라 은허 2기
Yinxu phase III, Shang dynasty	상나라 은허 3기
Yinxu phase IV, Shang dynasty	상나라 은허 4기
Early Western Zhou–year 33 of King Li (846 BCE)	서주 전기~여왕 33년 (기원전 846년)
Reign of King Gong, Western Zhou	서주 공왕 재위기
Reign of King Li, Western Zhou	서주 여왕 재위기
Year 12 of Emperor Wen, Western Han (168 BCE)	전한 문제 12년 (기원전 168년)
Neolithic, Yangshao culture (c. 3900 BCE)	신석기시대 앙소문화 (기원전 3900년경)
Qing / Warring States / Eastern Han — ambiguous period entry	청나라 / 전국시대 / 후한 — 원문의 시대 표기 불명확
`)
const dynastyNames = { 'Xin dynasty': '신나라', 'Three Kingdoms': '삼국시대', ...periods }
const reignNames = { Qianlong: '건륭', Kangxi: '강희', Yongzheng: '옹정', Guangxu: '광서', Xuande: '선덕', Dade: '대덕', Zhiyuan: '지원', Zhishun: '지순', Zhizhi: '지치', Zhizheng: '지정', Qingyuan: '경원', Chongning: '숭녕', Tianfeng: '천봉', Huanglong: '황룡' }
function periodLabel(english) {
  if (periods[english]) return periods[english]
  if (english.startsWith('Period cited: ')) return '기록에 언급된 시대: ' + periodLabel(english.slice(14))
  if (english.endsWith('; additional source notes retained')) return periodLabel(english.slice(0, -34)) + '; 상세 기록은 원문 유지'
  if (english.startsWith('Probably ')) return periodLabel(english.slice(9).replace(/^./, s => s.toUpperCase())) + ' 추정'
  if (english.startsWith('Approximately ')) return '약 ' + periodLabel(english.slice(14))
  const stage = english.match(/^(Early–middle|Middle–late|Early|Middle|Late|Final) (.+)$/)
  if (stage) return `${periodLabel(stage[2])} ${{ 'Early–middle': '전·중기', 'Middle–late': '중·후기', Early: '전기', Middle: '중기', Late: '후기', Final: '말기' }[stage[1]]}`
  const regnal = english.match(/^(\w+) reign(?:, year ([\d–]+))?, (.+?)(?: \(([\d–]+) CE\))?$/)
  if (regnal && reignNames[regnal[1]]) return `${dynastyNames[regnal[3]] || periodLabel(regnal[3])} ${reignNames[regnal[1]]}${regnal[2] ? ' '+regnal[2]+'년' : ' 연간'}${regnal[4] ? ' ('+regnal[4]+'년)' : ''}`
  const century = english.match(/^(\d+)th–(\d+)th centuries CE$/)
  if (century) return `서기 ${century[1]}~${century[2]}세기`
  const year = english.match(/^(\d+) BCE$/)
  if (year) return `기원전 ${year[1]}년`
  missing.add('period: '+english)
  return `[${english}]`
}

for (const [kind, entries] of Object.entries(englishRecords)) for (const source of Object.keys(entries)) output[kind][source] = recordLabel(source, kind)
for (const [kind, entries] of Object.entries(englishAnnotations)) for (const [source, english] of Object.entries(entries)) {
  output[kind][source] = kind === 'period' ? periodLabel(english) : technicalLabel(source, english)
}
output.period['清末'] = '청나라 말기'
const vocabularyKeys = new Set([...Object.keys(geographic), ...Object.keys(instruments), ...Object.keys(englishAnnotations.period), ...'乐器 体鸣乐器 碰奏体鸣乐器 敲奏体鸣乐器 钟类 打击器类 摇奏体鸣乐器 其他 商代 汉代 唐代 宋代 元代 明代 清代 新石器 秦汉 南北朝 隋唐 兽面纹 云雷纹 饕餮纹 蝉纹 龙纹 凤纹 先秦-清 形状说明 有数量 有长度 有直径 有宽度 有高度 全高'.split(' ')])
for (const key of vocabularyKeys) if (messages[key]) output.vocabulary[key] = output.period[key] || (Object.hasOwn(instruments, key) ? recordTerms[key] : null) || messages[key].replace(/\s*[（(][^()（）]*\p{Script=Han}[^()（）]*[）)]/gu, '').trim()
output.vocabulary['钟类'] = '종 계열'
if (missing.size) {
  console.error('Review missing Korean terms:', [...missing].sort())
  if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify([...missing].sort(), null, 2))
  process.exitCode = 1
} else {
  fs.writeFileSync(new URL('../src/i18n/korean-content.json', import.meta.url), JSON.stringify(output, null, 2) + '\n')
  console.log('Korean content:', Object.fromEntries(Object.entries(output).map(([kind, entries]) => [kind, Object.keys(entries).length])))
}
