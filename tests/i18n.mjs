import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createServer } from 'vite'
import { parse } from '@babel/parser'
import { baseParse } from '@vue/compiler-dom'

// Exercise the actual Vite-loaded modules, including the raw translation table.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { messages, locale, setLocale, t, localize, localizedText } = await server.ssrLoadModule('/src/i18n/index.js')
  const data = await server.ssrLoadModule('/src/utils/statisticsData.js')
  const artifacts = JSON.parse(fs.readFileSync(new URL('../src/data/artifacts.json', import.meta.url), 'utf8'))
  const placeholders = s => [...s.matchAll(/\{\d+\}/g)].map(m => m[0]).sort()
  for (const [key, translations] of Object.entries(messages)) {
    for (const lang of ['en', 'ko']) {
      assert.ok(translations[lang], `${lang}: ${key}`)
      assert.deepEqual(placeholders(translations[lang]), placeholders(key), `${lang} placeholders: ${key}`)
    }
  }

  // Every explicit UI translation key must exist in both catalogs. Check script
  // calls and Vue expressions, plus static InfoList title keys.
  function checkCalls(node) {
    if (!node || typeof node !== 'object') return
    if (node.type === 'CallExpression' && node.callee.name === 't' && node.arguments[0]?.type === 'StringLiteral') {
      assert.ok(messages[node.arguments[0].value], `Missing UI message: ${node.arguments[0].value}`)
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(checkCalls)
      else if (value && typeof value === 'object') checkCalls(value)
    }
  }
  for (const file of ['components/AppHeader.vue', ...['Home', 'SearchResults', 'ArtifactDetail', 'About', 'Statistics'].map(name => `views/${name}.vue`)]) {
    const source = fs.readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8')
    checkCalls(parse(source.match(/<script setup>([\s\S]*?)<\/script>/)[1], { sourceType: 'module' }))
    const template = baseParse(source.slice(source.indexOf('<template>') + 10, source.lastIndexOf('</template>')))
    function checkTemplate(node) {
      if (node.type === 5) checkCalls(parse(`(${node.content.content})`))
      for (const prop of node.props || []) {
        if (prop.type === 7 && prop.exp && prop.name === 'bind') checkCalls(parse(`(${prop.exp.content})`))
        if (node.tag === 'InfoList' && prop.name === 'title') assert.ok(messages[prop.value.content])
      }
      node.children?.forEach(checkTemplate)
    }
    checkTemplate(template)
  }

  for (const lang of ['en', 'ko', 'zh-CN']) {
    setLocale(lang)
    assert.equal(locale.value, lang)
    assert.equal(localize('甬钟'), lang === 'en' ? 'Yongzhong bells' : lang === 'ko' ? '용종(甬鐘)' : '甬钟')
    assert.equal(localize('青州苏埠屯8号墓编铙'), '青州苏埠屯8号墓编铙')
    assert.equal(localize(1080), 1080)
    assert.ok(!t('找到 {0} 条结果', [12]).includes('{0}'))
  }
  setLocale('en')
  assert.equal(localize('商代晚期'), 'Late Shang dynasty')
  assert.equal(localize('乐器 / 钟类'), 'Instruments / Bells')
  const callback = localizedText(function (datum) { return this.prefix ? datum : '' })
  assert.equal(callback.call({ prefix: true }, '甬钟'), 'Yongzhong bells')
  setLocale('invalid')
  assert.equal(locale.value, 'en')

  const search = query => artifacts.filter(a => query.toLowerCase().split(/\s+/).every(word => data.searchArtifactText(a).includes(word))).map(a => a.record_id)
  // Multilingual aliases resolve to the same underlying record IDs.
  assert.deepEqual(search('Yongzhong'), search('용종'))
  assert.ok(search('Yongzhong').length > 0)
  assert.deepEqual(search('Shanghai'), search('상하이'))
  assert.ok(search('Shanghai Yongzhong').length > 0)
  assert.ok(search('서주 용종').length > 0)
  for (const name of [...data.INSTRUMENT_LEAVES, ...data.ERA_ORDER, ...data.PROVINCE_NAMES]) assert.ok(messages[name], `Missing vocabulary: ${name}`)
  assert.equal(artifacts.length, 1080)
  console.log(`PASS: ${Object.keys(messages).length} messages, all UI keys, vocabulary, interpolation, and multilingual search across 1,080 original records`)
} finally {
  await server.close()
}
