import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createServer } from 'vite'
import { parse } from '@babel/parser'
import { baseParse } from '@vue/compiler-dom'

// Exercise the actual Vite-loaded modules, including the raw translation table.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { messages, locale, setLocale, t, localize, localizedText, recordText, entityText, periodText } = await server.ssrLoadModule('/src/i18n/index.js')
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
    assert.equal(localize('甬钟'), lang === 'en' ? 'Yongzhong bells' : lang === 'ko' ? '용종 (甬钟)' : '甬钟')
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

  assert.equal(recordText('沂水刘家店子钲', 'artifact'), 'Yishui Liujiadianzi Zheng Bell (沂水刘家店子钲)')
  assert.equal(recordText('青州苏埠屯8号墓编铙', 'artifact'), 'Qingzhou Subutun Tomb No. 8 Nao Bell Set (青州苏埠屯8号墓编铙)')
  assert.equal(recordText('山东省文物考古研究所', 'institution'), 'Shandong Provincial Institute of Cultural Relics and Archaeology (山东省文物考古研究所)')
  assert.equal(recordText('沂水县院东头乡', 'site'), 'Yishui County Yuandongtou Township (沂水县院东头乡)')
  assert.equal(recordText('钟祥市博物馆', 'institution'), 'Zhongxiang Municipal Museum (钟祥市博物馆)')
  assert.equal(recordText('未知', 'institution'), 'Unknown')
  assert.equal(recordText('', 'site'), '')
  assert.equal(entityText({ label: '乐器部件', text: '于口' }), 'Arched mouth rim (于口)')
  assert.equal(entityText({ label: '乐器部件', text: '两铣' }), 'Two lateral edges (两铣)')
  assert.equal(entityText({ label: '乐器部件', text: '甬' }), 'Shank (甬)')
  assert.equal(entityText({ label: '乐器部件', text: '正鼓' }), 'Central striking area (正鼓)')
  assert.equal(entityText({ label: '数据属性', text: '合瓦形' }), 'Tile-pair-shaped cross-section (合瓦形)')
  assert.equal(entityText({ label: '数据属性', text: '弧曲' }), 'Curved (弧曲)')
  assert.equal(entityText({ label: '数据属性', text: '角上叉' }), 'Corners splay upward (角上叉)')
  assert.equal(entityText({ label: '数据属性', text: '方块状' }), 'Block-shaped (方块状)')
  assert.equal(entityText({ label: '数据属性', text: '3.7' }), '3.7')
  assert.equal(entityText(null), '')
  assert.equal(periodText('商代殷墟晚期'), 'Late Yinxu phase, Shang dynasty (商代殷墟晚期)')
  assert.equal(periodText('商代殷墟四期'), 'Yinxu phase IV, Shang dynasty (商代殷墟四期)')
  assert.ok(periodText('清乾隆二十六年').includes('year 26'))
  assert.ok(periodText('西汉文帝十二年(前 168)').includes('168 BCE'))
  const annotations = JSON.parse(fs.readFileSync(new URL('../src/i18n/english-annotations.json', import.meta.url), 'utf8'))
  const catalog = JSON.parse(fs.readFileSync(new URL('../src/i18n/english-records.json', import.meta.url), 'utf8'))
  const before = JSON.stringify(artifacts)
  for (const artifact of artifacts) {
    if (artifact.时代) {
      assert.ok(annotations.period[artifact.时代], `Missing period: ${artifact.时代}`)
      assert.ok(!/\p{Script=Han}/u.test(annotations.period[artifact.时代]))
      assert.ok(periodText(artifact.时代).endsWith(` (${artifact.时代})`))
    }
    const entities = [...(artifact.标注部分?.entities || []), ...(artifact.标注部分?.relations || []).flatMap(relation => [relation.subject, relation.object])]
    for (const entity of entities) {
      const kind = { 乐器部件: 'part', 数据属性: 'attribute', 纹饰: 'decoration' }[entity.label]
      if (!kind) continue
      assert.ok(annotations[kind][entity.text], `Missing ${kind}: ${entity.text}`)
      assert.ok(!/\p{Script=Han}/u.test(annotations[kind][entity.text]))
      if (/\p{Script=Han}/u.test(entity.text)) assert.ok(entityText(entity).endsWith(` (${entity.text})`))
      else assert.equal(entityText(entity), localize(entity.text))
    }
    for (const [field, kind] of [['器物名称', 'artifact'], ['机构', 'institution'], ['原藏机构', 'institution'], ['出土地点', 'site']]) {
      const source = artifact[field]
      if (!source || !/\p{Script=Han}/u.test(source)) continue
      assert.ok(Object.hasOwn(catalog[kind], source), `Missing English record: ${field}: ${source}`)
      const result = recordText(source, kind)
      if (catalog[kind][source] !== source) {
        assert.ok(result.endsWith(` (${source})`), `Original lost: ${source}`)
        assert.ok(!/\p{Script=Han}/u.test(catalog[kind][source]), `Unconverted Han: ${source}`)
      }
    }
  }
  // The Chinese display and original source records stay unchanged.
  for (const lang of ['zh-CN']) {
    setLocale(lang)
    for (const [kind, entries] of Object.entries(catalog)) {
      for (const source of Object.keys(entries)) assert.equal(recordText(source, kind), localize(source))
    }
    for (const artifact of artifacts) {
      assert.equal(periodText(artifact.时代), localize(artifact.时代))
      for (const entity of artifact.标注部分?.entities || []) {
        assert.equal(entityText(entity), localize(entity.text))
      }
    }
  }
  setLocale('ko')
  const korean = JSON.parse(fs.readFileSync(new URL('../src/i18n/korean-content.json', import.meta.url), 'utf8'))
  assert.equal(recordText('沂水刘家店子钲', 'artifact'), '이수이 류자뎬쯔 정 (沂水刘家店子钲)')
  assert.equal(recordText('山东省文物考古研究所', 'institution'), '산둥성 문물고고연구소 (山东省文物考古研究所)')
  assert.equal(recordText('沂水县院东头乡', 'site'), '이수이현 위안둥터우향 (沂水县院东头乡)')
  assert.equal(recordText('安阳大司空村 288 号墓铙', 'artifact'), '안양 다쓰쿵촌 288호묘 요 (安阳大司空村 288 号墓铙)')
  assert.equal(entityText({ label: '乐器部件', text: '甬' }), '종의 자루 (甬)')
  assert.equal(entityText({ label: '乐器部件', text: '正鼓' }), '중앙 타격부 (正鼓)')
  assert.equal(entityText({ label: '数据属性', text: '合瓦形' }), '기와 두 장을 맞댄 형태 (合瓦形)')
  assert.equal(entityText({ label: '数据属性', text: '重量 2.5' }), '무게 2.5 (重量 2.5)')
  assert.equal(periodText('商代殷墟晚期'), '상나라 은허 말기 (商代殷墟晚期)')
  assert.equal(periodText('清乾隆二十六年'), '청나라 건륭 26년 (清乾隆二十六年)')
  assert.equal(localize('山东'), '산둥 (山东)')
  assert.equal(entityText({ label: '数据属性', text: '3.7' }), '3.7')
  assert.equal(recordText('未知', 'institution'), '미상')
  const { chineseToHangul } = await import('../scripts/pinyin-hangul.mjs')
  assert.equal(chineseToHangul('北京'), '베이징')
  assert.equal(chineseToHangul('上海'), '상하이')
  assert.equal(chineseToHangul('刘家店子'), '류자뎬쯔')
  for (const [kind, entries] of Object.entries(korean)) for (const [source, label] of Object.entries(entries)) {
    if (label !== source) assert.ok(!/\p{Script=Han}/u.test(label), `Untranslated Korean label: ${source}`)
    assert.ok(!/\[[a-z]+\]/i.test(label), `Unresolved Korean word: ${source}`)
    if (['artifact', 'institution', 'site'].includes(kind) && label !== source) assert.ok(recordText(source, kind).endsWith(` (${source})`))
    if (kind === 'period') assert.ok(periodText(source).endsWith(` (${source})`))
  }
  for (const artifact of artifacts) {
    for (const [field, kind] of [['器物名称', 'artifact'], ['机构', 'institution'], ['原藏机构', 'institution'], ['出土地点', 'site']]) {
      if (artifact[field] && /\p{Script=Han}/u.test(artifact[field])) assert.ok(Object.hasOwn(korean[kind], artifact[field]))
    }
    const entities = [...(artifact.标注部分?.entities || []), ...(artifact.标注部分?.relations || []).flatMap(r => [r.subject, r.object])]
    for (const entity of entities) {
      const kind = { 乐器部件: 'part', 数据属性: 'attribute', 纹饰: 'decoration' }[entity.label]
      if (!kind) continue
      assert.ok(Object.hasOwn(korean[kind], entity.text), `Missing Korean annotation: ${entity.text}`)
      if (/\p{Script=Han}/u.test(entity.text)) assert.ok(entityText(entity).endsWith(` (${entity.text})`))
      else assert.equal(entityText(entity), entity.text)
      // Decimal measurements must remain intact even in mixed text labels.
      for (const decimal of entity.text.match(/\d+\.\d+/g) || []) assert.ok(korean[kind][entity.text].includes(decimal), `Changed decimal: ${entity.text}`)
    }
  }
  assert.equal(JSON.stringify(artifacts), before)
  setLocale('en')

  const search = query => artifacts.filter(a => query.toLowerCase().split(/\s+/).every(word => data.searchArtifactText(a).includes(word))).map(a => a.record_id)
  // Multilingual aliases resolve to the same underlying record IDs.
  const englishYongzhong = new Set(search('Yongzhong'))
  assert.ok(search('용종').every(id => englishYongzhong.has(id)))
  assert.ok(search('Yongzhong').length > 0)
  const englishShanghai = new Set(search('Shanghai'))
  assert.ok(search('상하이').every(id => englishShanghai.has(id)))
  assert.ok(search('Shanghai Yongzhong').length > 0)
  assert.ok(search('서주 용종').length > 0)
  assert.ok(search('Yishui Liujiadianzi Zheng Bell').includes('shandong_0025'))
  assert.ok(search('Shandong Provincial Institute of Cultural Relics and Archaeology').includes('shandong_0025'))
  assert.ok(search('Yuandongtou Township').includes('shandong_0025'))
  assert.ok(search('tile-pair').includes('shandong_0017'))
  assert.ok(search('Yinxu').length > 0)
  assert.ok(search('이수이 류자뎬쯔 정').includes('shandong_0025'))
  assert.ok(search('산둥성 문물고고연구소').includes('shandong_0025'))
  assert.ok(search('위안둥터우향').includes('shandong_0025'))
  assert.ok(search('종의 자루').includes('shandong_0017'))
  assert.ok(search('기와 두 장').includes('shandong_0017'))
  assert.ok(search('은허 말기').length > 0)
  for (const name of [...data.INSTRUMENT_LEAVES, ...data.ERA_ORDER, ...data.PROVINCE_NAMES]) assert.ok(messages[name], `Missing vocabulary: ${name}`)
  assert.equal(artifacts.length, 1080)
  console.log(`PASS: ${Object.keys(messages).length} messages, all UI keys, vocabulary, interpolation, and multilingual search across 1,080 original records`)
} finally {
  await server.close()
}
