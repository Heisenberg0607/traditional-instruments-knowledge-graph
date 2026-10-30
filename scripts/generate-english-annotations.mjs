import fs from 'node:fs'
import { parts, terms, descriptions } from './annotation-glossary.mjs'

const artifacts = JSON.parse(fs.readFileSync(new URL('../src/data/artifacts.json', import.meta.url), 'utf8'))
const messages = Object.fromEntries(fs.readFileSync(new URL('../src/i18n/messages.tsv', import.meta.url), 'utf8').trimEnd().split(/\r?\n/).map(line => { const [source, english] = line.split('\t'); return [source, english] }))
const han = /\p{Script=Han}/u
const unresolved = {}
const english = { part: {}, attribute: {}, decoration: {}, period: {} }
export function chineseNumber(value) {
  const digits = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 元: 1 }
  let total = 0, digit = 0
  for (const char of value) {
    const unit = { 十: 10, 百: 100, 千: 1000 }[char]
    if (unit) { total += (digit || 1) * unit; digit = 0 } else digit = digits[char] ?? 0
  }
  return String(total + digit)
}

function translate(source, kind) {
  if (!han.test(source)) return source
  if (kind === 'part' && parts[source]) return parts[source]
  if (descriptions[source]) return descriptions[source]
  if (messages[source]) return messages[source]
  const dictionary = { ...parts, ...terms, ...(kind === 'part' ? parts : {}) }
  const entries = Object.entries(dictionary).sort(([a], [b]) => b.length - a.length)
  const result = [], missing = []
  for (let i = 0; i < source.length;) {
    const match = entries.find(([key]) => source.startsWith(key, i))
    const numeral = source.slice(i).match(/^[零〇一二两三四五六七八九十百千]+/)
    if (numeral && (!match || match[0].length <= numeral[0].length)) {
      result.push(chineseNumber(numeral[0])); i += numeral[0].length
    } else if (match) { result.push(match[1]); i += match[0].length }
    else if (!han.test(source[i])) {
      const run = source.slice(i).match(/^[^\p{Script=Han}]+/u)[0]
      result.push(run.replace(/[，、]/g, ', ').replace(/；/g, '; ').replace(/。/g, '. ').replace(/（/g, '(').replace(/）/g, ')'))
      i += run.length
    } else { missing.push(source[i]); i++ }
  }
  if (missing.length) { unresolved[source] = { kind, missing: missing.join('') }; return null }
  const label = result.join(' ').replace(/\s+/g, ' ').replace(/\s+([,;.%)])/g, '$1').replace(/\(\s+/g, '(').trim()
  return label.replace(/^(\d+(?:\.\d+)?) More than$/, 'More than $1')
}

const periodNames = {
  商代: 'Shang dynasty', 商: 'Shang dynasty', 西周: 'Western Zhou', 东周: 'Eastern Zhou', 周: 'Zhou dynasty',
  春秋: 'Spring and Autumn period', 战国: 'Warring States period', 秦汉: 'Qin–Han', 秦: 'Qin dynasty',
  西汉: 'Western Han', 东汉: 'Eastern Han', 汉: 'Han dynasty', 隋唐: 'Sui–Tang',
  唐: 'Tang dynasty', 北宋: 'Northern Song', 南宋: 'Southern Song', 宋: 'Song dynasty',
  元: 'Yuan dynasty', 明: 'Ming dynasty', 清: 'Qing dynasty', 南北朝: 'Northern and Southern dynasties',
  北朝: 'Northern dynasties', 南朝: 'Southern dynasties', 东魏: 'Eastern Wei', 三国: 'Three Kingdoms',
  五代: 'Five Dynasties', 辽: 'Liao dynasty', 金: 'Jin dynasty', 新莽: 'Xin dynasty', 新石器: 'Neolithic period'
}
const regnal = { 乾隆: 'Qianlong', 康熙: 'Kangxi', 雍正: 'Yongzheng', 光绪: 'Guangxu', 宣德: 'Xuande', 大德: 'Dade', 至元: 'Zhiyuan', 至顺: 'Zhishun', 至治: 'Zhizhi', 至正: 'Zhizheng', 庆元: 'Qingyuan', 崇宁: 'Chongning', 天凤: 'Tianfeng', 黄龙: 'Huanglong' }
const modifiers = { 早期: 'Early', 初期: 'Early', 前期: 'Early', 中期: 'Middle', 晚期: 'Late', 后期: 'Late', 末期: 'Final', 末年: 'Final', 早中期: 'Early–middle', 中晚期: 'Middle–late', 末: 'Late' }
const exactPeriods = {
  商代殷墟晚期: 'Late Yinxu phase, Shang dynasty', 商代殷墟二期: 'Yinxu phase II, Shang dynasty',
  商代殷墟三期: 'Yinxu phase III, Shang dynasty', 商代殷墟四期: 'Yinxu phase IV, Shang dynasty',
  商代殷墟三期属于商代殷墟三期偏早阶段: 'Early part of Yinxu phase III, Shang dynasty',
  商代殷墟晚期为商代殷墟晚期: 'Late Yinxu phase, Shang dynasty', 商代殷墟晚期当为商代殷墟晚期: 'Probably late Yinxu phase, Shang dynasty',
  商代殷墟四期当属商代殷墟四期: 'Probably Yinxu phase IV, Shang dynasty',
  清战国东汉: 'Qing / Warring States / Eastern Han — ambiguous period entry',
  春秋晚期或战国早期: 'Late Spring and Autumn or early Warring States period',
  春秋晚期战国早期: 'Late Spring and Autumn–early Warring States period',
  西周末春秋初: 'Late Western Zhou–early Spring and Autumn period',
  商末周初: 'Late Shang–early Zhou', 西周恭王: 'Reign of King Gong, Western Zhou',
  西周厉王: 'Reign of King Li, Western Zhou', 明宣德: 'Xuande reign, Ming dynasty',
  明宣德年间: 'Xuande reign, Ming dynasty', 唐宋之间: 'Between the Tang and Song dynasties',
  '春秋早期偏晚（约前650年前后）': 'Later part of the early Spring and Autumn period (c. 650 BCE)',
  '春秋晚期偏早（前570~前560）': 'Earlier part of the late Spring and Autumn period (570–560 BCE)',
  '西周早期至厉王三十三年（前 846 年）间': 'Early Western Zhou–year 33 of King Li (846 BCE)',
  '新石器遗址的仰韶文化堆积层。年代约为公元前 3900 年左右': 'Neolithic, Yangshao culture (c. 3900 BCE)',
  春秋早期为西周晚期到东周早期: 'Late Western Zhou–early Eastern Zhou (source also labels early Spring and Autumn)',
  西周早期约在西周早期后段: 'Later part of the early Western Zhou',
  西周早期属西周早期前段: 'Earlier part of the early Western Zhou',
  西周中期偏早: 'Earlier part of the middle Western Zhou',
  春秋应在春秋中期: 'Probably middle Spring and Autumn period',
  '西汉文帝十二年(前 168)': 'Year 12 of Emperor Wen, Western Han (168 BCE)',
  '春秋早中期的特点，其年代应在春秋中期偏早': 'Probably earlier part of the middle Spring and Autumn period',
  西周早中期为西周早中期之际穆王前后: 'Early–middle Western Zhou, around the reign of King Mu'
}

function periodLabel(source) {
  if (exactPeriods[source]) return exactPeriods[source]
  if (messages[source]) return messages[source]
  const cleaned = source.replace(/^[.。为\s]+/, '')
  if (cleaned.startsWith('西周厉王时期')) return 'Reign of King Li, Western Zhou; additional source notes retained'
  if (cleaned.startsWith('商应为商代晚期')) return 'Late Shang dynasty; additional source notes retained'
  const century = cleaned.match(/^公元\s*(\d+)\s*[～~–-]\s*(\d+)\s*世纪/)
  if (century) return `${century[1]}th–${century[2]}th centuries CE`
  const date = cleaned.match(/^公元(前)?\s*(\d+)\s*年/)
  if (date) return `${date[2]} ${date[1] ? 'BCE' : 'CE'}`
  for (const [name, label] of Object.entries(regnal)) if (cleaned.includes(name)) {
    const dynasty = Object.keys(periodNames).sort((a,b) => b.length-a.length).find(key => cleaned.startsWith(key))
    const reignYear = cleaned.slice(cleaned.indexOf(name) + name.length).match(/^([元零〇一二三四五六七八九十百]+)(?:至([一二三四五六七八九十百]+))?年/)
    const year = cleaned.match(/[（(]\s*(\d+(?:[～~–-]\d+)?)\s*年?\s*[）)]/)
    return `${label} reign${reignYear ? `, year ${chineseNumber(reignYear[1])}${reignYear[2] ? '–'+chineseNumber(reignYear[2]) : ''}` : ''}${dynasty ? ', '+periodNames[dynasty] : ''}${year ? ` (${year[1].replace('～','–')} CE)` : ''}`
  }
  for (const name of Object.keys(periodNames).sort((a,b) => b.length-a.length)) if (cleaned.startsWith(name)) {
    const rest = cleaned.slice(name.length).replace(/^代/, '')
    const modifier = Object.keys(modifiers).sort((a,b) => b.length-a.length).find(key => rest.startsWith(key))
    let label = `${modifier ? modifiers[modifier]+' ' : ''}${periodNames[name]}`
    if (/^约/.test(source)) label = 'Approximately ' + label
    // Some source "period" fields include entire archaeological paragraphs.
    // Translate the period cited at the start, explicitly retaining the notes
    // as source text instead of claiming to translate that entire paragraph.
    if (source.length > 35) label = `Period cited: ${label}; additional source notes retained`
    return label
  }
  if (cleaned.startsWith('约')) return 'Approximately ' + periodLabel(cleaned.slice(1))
  return null
}

for (const artifact of artifacts) {
  if (artifact.时代) {
    const value = periodLabel(artifact.时代)
    if (value) english.period[artifact.时代] = value
    else unresolved[artifact.时代] = { kind: 'period', missing: artifact.时代 }
  }
  for (const entity of artifact.标注部分?.entities || []) {
    const kind = { 乐器部件: 'part', 数据属性: 'attribute', 纹饰: 'decoration' }[entity.label]
    if (!kind) continue
    const value = translate(entity.text, kind)
    if (value) english[kind][entity.text] = value
  }
  // Relations sometimes contain values absent from the entity array.
  for (const relation of artifact.标注部分?.relations || []) for (const entity of [relation.subject, relation.object]) {
    const kind = { 乐器部件: 'part', 数据属性: 'attribute', 纹饰: 'decoration' }[entity.label]
    if (kind) { const value = translate(entity.text, kind); if (value) english[kind][entity.text] = value }
  }
}
fs.writeFileSync(new URL('../src/i18n/english-annotations.json', import.meta.url), JSON.stringify(english, null, 2) + '\n')
if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(unresolved, null, 2))
console.log('English annotations:', Object.fromEntries(Object.entries(english).map(([kind, entries]) => [kind, Object.keys(entries).length])), 'Unresolved:', Object.keys(unresolved).length)
