import { ref, watch } from 'vue'
import messageTable from './messages.tsv?raw'

export const messages = Object.fromEntries(messageTable.trimEnd().split(/\r?\n/).filter(Boolean).map(line => {
  const [zh, en, ko] = line.split('\t')
  if (!zh || !en || !ko) throw new Error(`Incomplete translation: ${zh}`)
  return [zh, { en, ko }]
}))
export const supportedLocales = ['zh-CN', 'en', 'ko']
const STORAGE_KEY = 'instrument-knowledge-graph.locale'

function initialLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (supportedLocales.includes(stored)) return stored
  } catch { /* Storage may be unavailable in private browsing. */ }
  // Preserve the existing Chinese default until a visitor chooses a language.
  return 'zh-CN'
}

export const locale = ref(initialLocale())

export function setLocale(value) {
  if (supportedLocales.includes(value)) locale.value = value
}

export function t(source, values = []) {
  const translated = messages[source]?.[locale.value] || source
  return translated.replace(/\{(\d+)\}/g, (_, index) => localize(values[Number(index)] ?? ''))
}

// Translate controlled vocabulary only. Archaeological source text and proper
// names remain verbatim; substring replacement would corrupt those records.
export function localize(value) {
  if (value === null || value === undefined) return ''
  if (typeof value !== 'string') return value
  if (messages[value]) return t(value)
  if (locale.value === 'zh-CN') return value
  for (const separator of [' / ', ' × ']) {
    const parts = value.split(separator)
    if (parts.length > 1 && parts.every(part => messages[part])) return parts.map(part => t(part)).join(separator)
  }
  const period = value.match(/^(商代|西周|春秋|战国|汉代|唐代|宋代|元代|明代|清代|西汉|东汉|北宋|南宋|商|清)(早期|初期|前期|中期|晚期|后期|末期|末年|中晚期|早中期)$/)
  if (period) {
    const modifiers = { 早期: ['Early', '전기'], 初期: ['Early', '초기'], 前期: ['Early', '전기'], 中期: ['Middle', '중기'], 晚期: ['Late', '후기'], 后期: ['Late', '후기'], 末期: ['Final', '말기'], 末年: ['Final', '말기'], 中晚期: ['Middle–late', '중·후기'], 早中期: ['Early–middle', '전·중기'] }
    const modifier = modifiers[period[2]][locale.value === 'en' ? 0 : 1]
    return locale.value === 'en' ? `${modifier} ${t(period[1])}` : `${t(period[1])} ${modifier}`
  }
  return value
}

// D3 accepts both constant text and callbacks. Keep its datum/index/context.
export function localizedText(value) {
  return typeof value === 'function'
    ? function (...args) { return localize(value.apply(this, args)) }
    : localize(value)
}

export function vocabularySearchText(values) {
  return values.filter(Boolean).flatMap(value => {
    const entry = messages[value]
    return [value, entry?.en, entry?.ko]
  }).filter(Boolean).join(' ').toLowerCase()
}

export function useI18n() {
  return { locale, setLocale, t, localize, localizedText }
}

watch(locale, value => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = value
    document.title = t('文物知识图谱检索系统')
  }
  try { localStorage.setItem(STORAGE_KEY, value) } catch { /* Keep the in-memory selection. */ }
}, { immediate: true })
