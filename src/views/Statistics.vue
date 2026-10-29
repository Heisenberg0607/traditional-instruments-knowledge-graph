<template>
  <div class="min-h-screen">
    <main class="container mx-auto px-6 py-10">
      <div class="mb-10 text-center">
        <h2 class="mb-2 text-3xl font-bold text-amber-900">{{ t("统计分析与可视化") }}</h2>
        <p class="text-stone-500">{{ t("基于 {0} 件文物数据的乐器类型、时代、地域、组合共现与音乐性能信息分析", [store.artifacts.length]) }}</p>
      </div>

      <section class="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div
          v-for="card in summaryCards"
          :key="card.label"
          class="flex flex-col items-center rounded-xl border-t-4 bg-white p-5 shadow-md"
          :style="{ borderColor: card.color }"
        >
          <span class="mb-1 text-3xl">{{ localize(card.icon) }}</span>
          <span class="text-2xl font-bold text-amber-900">{{ localize(card.value) }}</span>
          <span class="mt-1 text-sm text-stone-500">{{ localize(card.label) }}</span>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <article class="chart-card xl:col-span-2">
          <div class="chart-head">
            <div>
              <h3 class="chart-title">{{ t("乐器类型分布") }}</h3>
              <p class="chart-desc">{{ t("使用层级饼图展示乐器具体器型的分类关系") }}</p>
            </div>
            <button v-if="selectedTypePath !== '乐器'" class="small-action" @click="resetSunburst">{{ t("重置") }}</button>
          </div>

          <div class="type-layout">
            <div>
              <div class="sunburst-wrap">
                <svg ref="sunburstRef" class="sunburst-svg" :width="sunburstSize" :height="sunburstSize"></svg>
              </div>
              <p class="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-6 text-stone-600">{{ t("外圈为具体乐器类型；单击任一扇区可聚焦该层级，单击饼图中心或空白背景可回退。") }}</p>
            </div>

            <aside class="type-panel">
              <p class="mb-1 text-xs text-stone-400">{{ t("当前类别") }}</p>
              <h4 class="mb-2 text-2xl font-bold text-amber-900">{{ localize(selectedTypeDetail.name) }}</h4>
              <p class="mb-4 text-sm leading-6 text-stone-600">{{ localize(selectedTypeDetail.description) }}</p>

              <div class="mb-4 grid grid-cols-3 gap-2">
                <div class="mini-stat"><span>{{ localize(selectedTypeDetail.records) }}</span><em>{{ t("记录数") }}</em></div>
                <div class="mini-stat"><span>{{ localize(selectedTypeDetail.quantity) }}</span><em>{{ t("总数量") }}</em></div>
                <div class="mini-stat"><span>{{ localize(selectedTypeDetail.percent) }}</span><em>{{ t("占比") }}</em></div>
              </div>

              <div class="type-donut-grid">
                <div class="type-donut-card">
                  <h5 class="panel-subtitle chip-title chip-blue">
                    <span class="chip-title-dot"></span>{{ t("地域分布") }}</h5>
                  <svg ref="typeProvinceDonutRef" class="type-donut-svg" height="210"></svg>
                </div>

                <div class="type-donut-card">
                  <h5 class="panel-subtitle chip-title chip-purple">
                    <span class="chip-title-dot"></span>{{ t("时代分布") }}</h5>
                  <svg ref="typeEraDonutRef" class="type-donut-svg" height="210"></svg>
                </div>
              </div>

              <div class="mt-4">
                <h5 class="panel-subtitle">{{ t("具体案例") }}</h5>
                <div v-if="selectedTypeDetail.cases.length" class="space-y-2">
                  <div v-for="item in selectedTypeDetail.cases" :key="item.record_id" class="case-row" @click="viewArtifact(item.record_id)">
                    <strong>{{ recordText(item.器物名称 || item.record_id, 'artifact') }}</strong>
                    <span>{{ localize(getArtifactProvince(item)) }} · {{ periodText(item.时代 || '时代未详') }}</span>
                  </div>
                </div>
                <p v-else class="empty-text">{{ t("暂无案例") }}</p>
              </div>
            </aside>
          </div>
        </article>

        <article class="chart-card xl:col-span-2">
          <div class="chart-head">
            <div>
              <h3 class="chart-title">{{ t("中国省级分布图") }}</h3>
              <p class="chart-desc">{{ t("底图与省份交互层会同步缩放移动，单击省份后展示详细信息。") }}</p>
            </div>
            <button class="small-action" @click="resetMapView">{{ t("重置") }}</button>
          </div>

          <div class="map-layout">
            <div class="map-box">
              <svg ref="chinaMapRef" class="relative z-10 h-full w-full"></svg>
            </div>

            <aside class="province-panel">
              <template v-if="activeProvinceStats">
                <p class="mb-1 text-xs text-stone-400">{{ t("当前省份") }}</p>
                <h4 class="mb-3 text-2xl font-bold text-amber-900">{{ localize(activeProvinceStats.province) }}</h4>
                <div class="mb-4 grid grid-cols-3 gap-2">
                  <div class="mini-stat"><span>{{ localize(activeProvinceStats.records) }}</span><em>{{ t("记录数") }}</em></div>
                  <div class="mini-stat"><span>{{ localize(activeProvinceStats.totalCount) }}</span><em>{{ t("总数量") }}</em></div>
                  <div class="mini-stat"><span>{{ localize(activeProvinceStats.typeCount) }}</span><em>{{ t("器类数") }}</em></div>
                </div>

                <InfoList title="博物馆 / 保存机构" kind="institution" :items="activeProvinceStats.institutions" mode="single" :limit="3" />
                <InfoList title="主要出土地点" kind="site" :items="activeProvinceStats.locations" mode="single" :limit="3" />
                <InfoList title="器类构成" :items="activeProvinceStats.mainTypes" mode="grid" :limit="3" />
                <InfoList title="时代分布" :items="activeProvinceStats.eraDistribution" mode="grid" :limit="3" />
              </template>
              <template v-else>
                <div class="empty-panel">
                  <p>{{ t("请悬停或单击地图中的省份查看详细统计。") }}</p>
                </div>
              </template>
            </aside>
          </div>
        </article>

        <article class="chart-card xl:col-span-2">
          <div class="chart-head">
            <div>
              <h3 class="chart-title">{{ t("地区 × 乐器类型热力图") }}</h3>
              <p class="chart-desc">{{ t("颜色越深表示该地区该器类记录越多；点击有数值的单元格跳转到对应检索页面，例如“上海 × 甬钟”。") }}</p>
            </div>
          </div>
          <svg ref="heatmapRef" class="w-full" :height="heatmapHeight"></svg>
        </article>

        <article class="chart-card xl:col-span-2">
          <div class="chart-head">
            <div>
              <h3 class="chart-title">{{ t("乐器类型演变趋势分析") }}</h3>
              <p class="chart-desc">{{ t("随着时代变化，乐器类型存在明显变化。堆叠面积图横轴为朝代，纵轴为数量，颜色表示具体器类。") }}</p>
            </div>
          </div>
          <svg ref="stackedRef" class="w-full" :height="stackedHeight"></svg>
        </article>

        <article class="chart-card xl:col-span-2">
          <div class="chart-head">
            <div>
              <h3 class="chart-title">{{ t("乐器组合共现关系分析") }}</h3>
              <p class="chart-desc">{{ t("按同一出土地点或同一机构时代归并，展示高频器物组合聚类。点击左侧聚类圆或连线后，右侧只显示当前选中组合与图例。") }}</p>
            </div>
          </div>

          <div class="co-layout">
            <div class="co-network-box">
              <svg ref="cooccurrenceRef" class="h-full w-full"></svg>
            </div>
            <aside class="co-panel">
              <div v-if="selectedPair" class="selected-pair">
                <p class="text-xs text-stone-400">{{ t("当前选中") }}</p>
                <h5>{{ localize(selectedPair.source) }} × {{ localize(selectedPair.target) }}</h5>
                <p>{{ t("共现 {0} 组地点 / 机构记录", [selectedPair.count]) }}</p>

                <div class="mt-3 space-y-2">
                  <div
                    v-for="(example, index) in selectedPair.examples.slice(0, 3)"
                    :key="index"
                    class="example-card"
                  >
                    <strong>{{ recordText(example.location, 'site') }}</strong>
                    <span>{{ periodText(example.era || '时代未详') }}</span>
                    <p>{{ example.artifacts.slice(0, 4).map(name => recordText(name, 'artifact')).join(locale === 'en' ? '; ' : '、') }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="selected-pair">
                <p class="text-xs text-stone-400">{{ t("当前选中") }}</p>
                <h5>{{ t("暂无选中组合") }}</h5>
                <p>{{ t("点击左侧聚类圆或连线查看组合信息。") }}</p>
              </div>

              <div class="co-legend">
                <h5 class="panel-subtitle">{{ t("图例") }}</h5>
                <div class="co-legend-list">
                  <span><i class="legend-dot bell"></i>{{ t("钟类") }}</span>
                  <span><i class="legend-dot hit"></i>{{ t("打击器类") }}</span>
                  <span><i class="legend-dot clash"></i>{{ t("碰奏体鸣乐器") }}</span>
                  <span><i class="legend-dot shake"></i>{{ t("摇奏体鸣乐器") }}</span>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </section>
    </main>

    <div
      v-if="tooltip.show"
      class="chart-tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      v-html="tooltip.html"
    ></div>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n'
const { t, localize, locale, localizedText, recordText, periodText } = useI18n()
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useArtifactStore } from '../stores/artifactStore'
import * as d3 from 'd3'
import {
  INSTRUMENT_COLOR,
  INSTRUMENT_LEAVES,
  INSTRUMENT_TREE,
  PROVINCE_TILE_LAYOUT,
  buildCooccurrenceData,
  buildEraEvolutionData,
  buildProvinceStats,
  buildProvinceTypeMatrix,
  cloneTreeWithCounts,
  getArtifactProvince,
  getArtifactPrimaryType,
  getTypeMajorGroup,
  normalizeEraGroup,
  parseQuantity
} from '../utils/statisticsData'

const InfoList = defineComponent({
  name: 'InfoList',
  props: {
    title: { type: String, required: true },
    kind: { type: String, default: '' },
    items: { type: Array, default: () => [] },
    mode: { type: String, default: 'single' },
    limit: { type: Number, default: 3 }
  },
  setup(props) {
    const expanded = ref(false)

    const palette = computed(() => {
      if (props.title.includes('出土')) {
        return {
          title: { background: '#dbeafe', color: '#1d4ed8', borderColor: '#bfdbfe' },
          chip: { background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' },
          dot: '#3d7fd1'
        }
      }
      if (props.title.includes('机构') || props.title.includes('博物馆')) {
        return {
          title: { background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' },
          chip: { background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' },
          dot: '#75a879'
        }
      }
      if (props.title.includes('器类')) {
        return {
          title: { background: '#ffedd5', color: '#9a3412', borderColor: '#fed7aa' },
          chip: { background: '#fff7ed', color: '#9a3412', borderColor: '#fed7aa' },
          dot: '#e27f2d'
        }
      }
      if (props.title.includes('时代')) {
        return {
          title: { background: '#f3e8ff', color: '#7e22ce', borderColor: '#e9d5ff' },
          chip: { background: '#faf5ff', color: '#7e22ce', borderColor: '#e9d5ff' },
          dot: '#9b82bd'
        }
      }
      return {
        title: { background: '#f5f5f4', color: '#57534e', borderColor: '#e7e5e4' },
        chip: { background: '#fafaf9', color: '#57534e', borderColor: '#e7e5e4' },
        dot: '#a8a29e'
      }
    })

    const titleStyle = computed(() => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      padding: '7px 12px',
      borderRadius: '10px',
      border: `1px solid ${palette.value.title.borderColor}`,
      background: palette.value.title.background,
      color: palette.value.title.color,
      fontSize: '14px',
      fontWeight: 800,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }))

    const chipStyle = computed(() => ({
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '2px 0',
      borderRadius: '0',
      border: 'none',
      background: 'transparent',
      color: '#1c1917',
      fontSize: '15px',
      lineHeight: 1.24
    }))

    return () => {
      const visible = expanded.value ? props.items : props.items.slice(0, props.limit)
      const bodyStyle = props.mode === 'grid'
        ? {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '3px'
          }
        : {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3px'
          }
      const hiddenCount = Math.max(0, props.items.length - props.limit)

      return h('div', {
        style: {
          marginTop: '14px',
          padding: '12px',
          border: '1px solid #f5f5f4',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.82)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
        }
      }, [
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '8px'
          }
        }, [
          h('span', { style: titleStyle.value }, [
            h('i', {
              style: {
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: palette.value.dot,
                display: 'inline-block'
              }
            }),
            t(props.title)
          ]),
          h('span', {
            style: {
              flexShrink: 0,
              padding: '4px 9px',
              borderRadius: '999px',
              background: '#f5f5f4',
              color: '#78716c',
              fontSize: '12px'
            }
          }, t("{0} 项", [localize(props.items.length)]))
        ]),
        props.items.length
          ? h('div', { style: bodyStyle }, visible.map(item =>
              h('div', { style: chipStyle.value, title: `${props.kind ? recordText(item.name, props.kind) : localize(item.name)}: ${item.count}` }, [
                h('span', {
                  style: {
                    color: '#1c1917',
                    wordBreak: 'break-word'
                  }
                }, props.kind ? recordText(item.name, props.kind) : localize(item.name)),
                h('em', {
                  style: {
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: '#1c1917',
                    flexShrink: 0
                  }
                }, item.count)
              ])
            ))
          : h('p', { style: { color: '#a8a29e', fontSize: '13px' } }, t('暂无记录')),
        props.items.length > props.limit
          ? h('button', {
              style: {
                marginTop: '12px',
                padding: '7px 12px',
                borderRadius: '999px',
                border: '1px solid #d6a05f',
                background: '#fef3c7',
                color: '#92400e',
                fontSize: '13px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(146,64,14,0.12)'
              },
              onClick: () => { expanded.value = !expanded.value }
            }, expanded.value ? t("收起 ↑") : t("更多 {0} 条 ↓", [localize(hiddenCount)]))
          : null
      ])
    }
  }
})

const store = useArtifactStore()
const router = useRouter()

const sunburstRef = ref(null)
const typeProvinceDonutRef = ref(null)
const typeEraDonutRef = ref(null)
const chinaMapRef = ref(null)
const heatmapRef = ref(null)
const stackedRef = ref(null)
const cooccurrenceRef = ref(null)

const sunburstSize = 440
const selectedTypePath = ref('乐器')

const activeProvince = ref('')
const hoveredProvince = ref('')
const mapBackgroundVisible = ref(true)
const tooltip = ref({ show: false, x: 0, y: 0, html: '' })
const selectedPair = ref(null)
let coSimulation = null

const provinceStats = computed(() => buildProvinceStats(store.artifacts))
const provinceStatsMap = computed(() => new Map(provinceStats.value.map(item => [item.province, item])))
const eraEvolutionData = computed(() => buildEraEvolutionData(store.artifacts))
const matrixData = computed(() => buildProvinceTypeMatrix(store.artifacts))
const cooccurrenceData = computed(() => buildCooccurrenceData(store.artifacts))
const topPairs = computed(() => cooccurrenceData.value.pairs.slice(0, 8))
const activeProvinceStats = computed(() => {
  const key = activeProvince.value || hoveredProvince.value
  return key ? provinceStatsMap.value.get(key) : null
})

const TYPE_DESCRIPTIONS = {
  乐器: '本页统计的对象为文物数据中识别出的乐器器型，重点展示体鸣乐器内部的演奏方式、器类与具体器型。',
  体鸣乐器: '体鸣乐器依靠器物自身振动发声，青铜乐器中钟、铙、钲、铎等都属于这一大类。',
  碰奏体鸣乐器: '碰奏体鸣乐器多通过相互碰击发声，包含铙、钹、板等器型。',
  敲奏体鸣乐器: '敲奏体鸣乐器通过外物敲击器体发声，是青铜礼乐器中数量较多、类型较丰富的一支。',
  钟类: '钟类是敲奏体鸣乐器的重要类型，常见器型包括钟、甬钟、钮钟、扁钟、圆钟、梵钟与镈。',
  打击器类: '打击器类包括钲、句鑃、錞于、铜鼓、锣、木鱼等，常与军事、礼仪和地方音乐传统相关。',
  摇奏体鸣乐器: '摇奏体鸣乐器通过摇动使内部或外部构件撞击发声，当前分类包含铎和铃。',
  铙: '铙为青铜体鸣乐器，常见于商周时期，多与礼仪、军旅或祭祀场景相关。',
  钹: '钹为碰奏体鸣乐器，通常成对相击发声。',
  板: '板为碰奏体鸣乐器，常以敲击或相击方式形成节奏。',
  钟: '钟是青铜礼乐体系中的代表性乐器，器形和制度化组合丰富。',
  甬钟: '甬钟为带甬的钟类乐器，常见于编钟体系。',
  钮钟: '钮钟为顶部设钮的钟类乐器，是编钟组合中的重要类型。',
  扁钟: '扁钟为钟体较扁的钟类器物。',
  圆钟: '圆钟为钟体轮廓较圆的钟类器物。',
  梵钟: '梵钟多与佛教寺院和宗教音乐空间相关。',
  镈: '镈是钟类中的大型青铜乐器，常见于礼乐组合。',
  钲: '钲为打击体鸣乐器，常与军旅、仪式和号令功能相关。',
  句鑃: '句鑃为青铜打击器类，器名和形制具有较强的时代与地域特征。',
  錞于: '錞于是青铜打击器类，常见于西南及楚文化相关区域资料。',
  铜鼓: '铜鼓是兼具乐器、礼器和族群标识意义的重要体鸣乐器。',
  锣: '锣为打击体鸣乐器，通过槌击金属面发声。',
  木鱼: '木鱼为敲奏体鸣乐器，多见于宗教或仪式音乐语境。',
  铎: '铎为摇奏体鸣乐器，摇动时内部舌件撞击器壁发声。',
  铃: '铃为摇奏体鸣乐器，形体较小，常与佩饰、仪仗或仪式场景相关。'
}

const coNodeLegend = computed(() => {
  const order = ['碰奏体鸣乐器', '钟类', '打击器类', '摇奏体鸣乐器', '其他']
  return cooccurrenceData.value.nodes
    .slice()
    .sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.id.localeCompare(b.id, 'zh'))
    .map((node, index) => ({ ...node, number: index + 1 }))
})

const selectedTypeDetail = computed(() => {
  const selectedName = selectedTypePath.value.split(' / ').pop() || '乐器'
  const leaves = getLeavesForTypeName(selectedName)
  const leafSet = new Set(leaves)
  const records = store.artifacts.filter(item => {
    const type = getArtifactPrimaryType(item)
    return selectedName === '乐器' ? type && type !== '未知' : leafSet.has(type)
  })
  const quantity = records.reduce((sum, item) => sum + parseQuantity(item.数量), 0)
  return {
    name: selectedName,
    description: TYPE_DESCRIPTIONS[selectedName] || '该类别为当前数据中识别出的乐器类型，可结合地域、时代和案例进一步查看其分布特征。',
    records: records.length,
    quantity,
    percent: `${((records.length / Math.max(1, store.artifacts.length)) * 100).toFixed(1)}%`,
    provinces: countTop(records.map(getArtifactProvince), 999),
    eras: countTop(records.map(item => normalizeEraGroup(item.时代)), 999),
    cases: records.slice(0, 3)
  }
})

const heatmapHeight = computed(() => Math.max(480, matrixData.value.provinces.length * 34 + 120))
const stackedHeight = computed(() => Math.max(520, 520))

const summaryCards = computed(() => {
  const provinceSet = new Set()
  const typeSet = new Set()
  let musicRecords = 0
  store.artifacts.forEach(item => {
    const province = getArtifactProvince(item)
    if (province && province !== '未知') provinceSet.add(province)
    const type = getArtifactPrimaryType(item)
    if (type && type !== '未知') typeSet.add(type)
    if (item.音乐性能 && String(item.音乐性能).trim()) musicRecords += 1
  })

  return [
    { label: t("文物记录"), value: store.artifacts.length, icon: '🏺', color: '#b45309' },
    { label: t("乐器类型"), value: typeSet.size, icon: '🔔', color: '#75a879' },
    { label: t("覆盖省份"), value: provinceSet.size, icon: '🗺️', color: '#3d7fd1' },
    { label: t("音乐性能记录"), value: musicRecords, icon: '🎼', color: '#9b82bd' }
  ]
})

function showTooltip(event, html) {
  tooltip.value = { show: true, x: event.clientX + 14, y: event.clientY + 14, html }
}

function moveTooltip(event) {
  tooltip.value = { ...tooltip.value, x: event.clientX + 14, y: event.clientY + 14 }
}

function hideTooltip() {
  tooltip.value = { show: false, x: 0, y: 0, html: '' }
}

function pathText(node) {
  return node.ancestors().reverse().map(d => d.data.name).join(' / ')
}

function resetSunburst() {
  selectedTypePath.value = '乐器'
  drawSunburst()
  nextTick(drawTypeDonuts)
}

function viewArtifact(id) {
  router.push({ path: `/artifact/${id}` })
}

function countTop(values, limit = 999) {
  const map = new Map()
  values.filter(Boolean).forEach(value => map.set(value, (map.get(value) || 0) + 1))
  return Array.from(map, ([name, count]) => ({ name, count }))
    .filter(item => item.name && item.name !== '未知')
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh'))
    .slice(0, limit)
}

function getLeavesForTypeName(name) {
  const target = findInstrumentNode(INSTRUMENT_TREE, name)
  if (!target) return INSTRUMENT_LEAVES.includes(name) ? [name] : []
  const leaves = []
  collectInstrumentLeaves(target, leaves)
  return leaves
}

function findInstrumentNode(node, name) {
  if (node.name === name) return node
  for (const child of node.children || []) {
    const found = findInstrumentNode(child, name)
    if (found) return found
  }
  return null
}

function collectInstrumentLeaves(node, leaves) {
  if (!node.children?.length) {
    leaves.push(node.name)
    return
  }
  node.children.forEach(child => collectInstrumentLeaves(child, leaves))
}

function colorForNode(d) {
  if (INSTRUMENT_COLOR[d.data.name]) return INSTRUMENT_COLOR[d.data.name]
  let node = d
  while (node.depth > 1) node = node.parent
  return INSTRUMENT_COLOR[node.data.name] || '#b45309'
}

function labelVisible(d) {
  if (!d) return false
  return d.y1 > d.y0 && (d.x1 - d.x0) > 0.035 && (d.y1 - d.y0) > 14
}

function drawSunburst() {
  if (!sunburstRef.value) return
  const svg = d3.select(sunburstRef.value)
  svg.selectAll('*').remove()

  const root = d3.hierarchy(cloneTreeWithCounts(store.artifacts))
    .sum(d => d.count || 0)
    .sort((a, b) => b.value - a.value)

  const radius = sunburstSize / 2
  d3.partition().size([2 * Math.PI, radius])(root)
  root.each(d => { d.current = d })

  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.004))
    .padRadius(radius * 1.5)
    .innerRadius(d => Math.max(0, d.y0 + 1))
    .outerRadius(d => Math.max(0, d.y1 - 1))

  const g = svg.append('g').attr('transform', `translate(${sunburstSize / 2},${sunburstSize / 2})`)
  let currentFocus = root.descendants().find(node => pathText(node) === selectedTypePath.value) || root

  svg.on('click', () => {
    if (currentFocus.parent) zoomTo(currentFocus.parent)
  })

  const bg = g.append('circle')
    .attr('r', radius)
    .attr('fill', '#fffaf3')
    .attr('stroke', '#ead9c6')
    .attr('stroke-width', 1)
    .style('cursor', 'pointer')
    .on('click', event => {
      event.stopPropagation()
      if (currentFocus.parent) zoomTo(currentFocus.parent)
    })

  const center = g.append('g')
    .style('cursor', 'pointer')
    .on('click', event => {
      event.stopPropagation()
      if (currentFocus.parent) zoomTo(currentFocus.parent)
    })

  center.append('circle')
    .attr('r', radius * 0.2)
    .attr('fill', '#fff3df')
    .attr('stroke', '#ead9c6')

  const centerTitle = center.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-0.3em')
    .style('font-size', '13px')
    .style('font-weight', 800)
    .style('fill', '#7c2d12')
    .text(localizedText('乐器'))

  const centerCount = center.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '1.1em')
    .style('font-size', '12px')
    .style('fill', '#a16207')
    .text(localizedText(t("{0} 条", [localize(store.artifacts.length)])))

  const path = g.append('g')
    .selectAll('path')
    .data(root.descendants().filter(d => d.depth && d.value > 0))
    .join('path')
    .attr('fill', d => colorForNode(d))
    .attr('fill-opacity', d => d.children ? 0.78 : 0.96)
    .attr('stroke', '#fffaf3')
    .attr('stroke-width', 1.6)
    .attr('d', d => arc(d.current))
    .style('cursor', 'pointer')
    .on('mouseenter', (event, d) => {
      showTooltip(event, t("<strong>{0}</strong><br/>记录数：{1}<br/>占比：{2}%", [localize(pathText(d)), localize(d.value), localize(((d.value / Math.max(1, root.value)) * 100).toFixed(1))]))
    })
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)
    .on('click', (event, d) => {
      event.stopPropagation()
      zoomTo(d)
    })

  const label = g.append('g')
    .attr('pointer-events', 'none')
    .attr('text-anchor', 'middle')
    .style('user-select', 'none')
    .selectAll('text')
    .data(root.descendants().filter(d => d.depth && d.value > 0))
    .join('text')
    .attr('transform', d => labelTransform(d.current))
    .attr('dy', '0.35em')
    .style('font-size', d => d.depth <= 2 ? '11px' : '10px')
    .style('font-weight', 700)
    .style('fill', d => d.depth <= 2 ? '#292524' : '#44403c')
    .style('fill-opacity', d => labelVisible(d.current) ? 1 : 0)
    .text(localizedText(d => d.data.name))

  if (currentFocus !== root) {
    applyFocus(currentFocus, false)
  }

  function zoomTo(focus) {
    selectedTypePath.value = pathText(focus)
    currentFocus = focus
    applyFocus(focus, true)
    nextTick(drawTypeDonuts)
  }

  function applyFocus(focus, animated) {
    centerTitle.text(localizedText(focus.data.name || '乐器'))
    centerCount.text(t('{0} 条', [focus.value || 0]))
    root.each(node => {
      node.target = {
        x0: Math.max(0, Math.min(1, (node.x0 - focus.x0) / Math.max(1e-6, focus.x1 - focus.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (node.x1 - focus.x0) / Math.max(1e-6, focus.x1 - focus.x0))) * 2 * Math.PI,
        y0: Math.max(0, node.y0 - focus.y0),
        y1: Math.max(0, node.y1 - focus.y0)
      }
    })

    const updatePath = path
      .transition()
      .duration(animated ? 650 : 0)
      .tween('data', datum => {
        const i = d3.interpolate(datum.current, datum.target)
        return t => { datum.current = i(t) }
      })
      .attrTween('d', datum => () => arc(datum.current))

    label.transition()
      .duration(animated ? 650 : 0)
      .attrTween('transform', datum => {
        const i = d3.interpolate(datum.current, datum.target)
        return t => labelTransform(i(t))
      })
      .styleTween('fill-opacity', datum => {
        const i = d3.interpolate(datum.current, datum.target)
        return t => labelVisible(i(t)) ? 1 : 0
      })
  }
}

function drawTypeDonuts() {
  drawMiniDonut(typeProvinceDonutRef.value, selectedTypeDetail.value.provinces, '地域')
  drawMiniDonut(typeEraDonutRef.value, selectedTypeDetail.value.eras, '时代')
}

function drawMiniDonut(svgEl, rawData, label) {
  if (!svgEl) return
  const svg = d3.select(svgEl)
  svg.selectAll('*').remove()
  const W = svgEl.clientWidth || 360
  const H = 290
  svg.attr('viewBox', `0 0 ${W} ${H}`)

  const source = (rawData || [])
    .filter(d => d && d.count > 0)
    .sort((a, b) => b.count - a.count)

  const top = source.slice(0, 6)
  const restCount = d3.sum(source.slice(6), d => d.count)
  const data = restCount > 0 ? [...top, { name: '其他', count: restCount }] : top

  if (!data.length) {
    svg.append('text')
      .attr('x', W / 2)
      .attr('y', H / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#a8a29e')
      .text(localizedText('暂无数据'))
    return
  }

  const total = d3.sum(data, d => d.count)
  const cx = W / 2
  const cy = H / 2 + 4
  const radius = Math.min(78, H / 2 - 58, W * 0.24)
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(['#4f8edb', '#2fbf6b', '#e27f2d', '#9567d6', '#22adc2', '#d5a72a', '#dd5f55'])

  const pie = d3.pie().sort(null).padAngle(0.014).value(d => d.count)
  const arcs = pie(data)
  const arc = d3.arc().innerRadius(radius * 0.58).outerRadius(radius)
  const hoverArc = d3.arc().innerRadius(radius * 0.58).outerRadius(radius + 5)
  const outerArc = d3.arc().innerRadius(radius + 20).outerRadius(radius + 20)
  const labelArc = d3.arc().innerRadius(radius + 34).outerRadius(radius + 34)
  const g = svg.append('g').attr('transform', `translate(${cx},${cy})`)

  const slices = g.selectAll('path.slice')
    .data(arcs)
    .join('path')
    .attr('class', 'slice')
    .attr('fill', d => color(d.data.name))
    .attr('stroke', '#fffaf0')
    .attr('stroke-width', 2)
    .style('cursor', 'default')
    .each(function(d) {
      this._current = { startAngle: d.startAngle, endAngle: d.startAngle }
    })
    .attr('d', function(d) { return arc(this._current) })
    .on('mouseenter', (event, d) => {
      d3.select(event.currentTarget).transition().duration(160).attr('d', hoverArc)
      showTooltip(event, t("<strong>{0}：{1}</strong><br/>数量：{2}<br/>占比：{3}%", [localize(label), localize(d.data.name), localize(d.data.count), localize(((d.data.count / Math.max(1, total)) * 100).toFixed(1))]))
    })
    .on('mousemove', moveTooltip)
    .on('mouseleave', (event) => {
      d3.select(event.currentTarget).transition().duration(160).attr('d', arc)
      hideTooltip()
    })

  slices.transition()
    .duration(900)
    .delay((d, i) => i * 45)
    .ease(d3.easeCubicOut)
    .attrTween('d', function(d) {
      const interpolate = d3.interpolate(this._current, d)
      this._current = d
      return t => arc(interpolate(t))
    })

  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-0.08em')
    .style('font-size', '22px')
    .style('font-weight', 800)
    .style('fill', '#7c2d12')
    .style('opacity', 0)
    .text(localizedText(total))
    .transition()
    .delay(420)
    .duration(520)
    .style('opacity', 1)
  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '1.45em')
    .style('font-size', '11px')
    .style('fill', '#7d7165')
    .style('opacity', 0)
    .text(localizedText(t("{0}合计", [localize(label)])))
    .transition()
    .delay(480)
    .duration(520)
    .style('opacity', 1)

  const labelData = arcs
    .filter(d => (d.endAngle - d.startAngle) > 0.035)
    .map(d => {
      const mid = (d.startAngle + d.endAngle) / 2
      const p0 = arc.centroid(d)
      const p1 = outerArc.centroid(d)
      const p2 = labelArc.centroid(d)
      const right = mid < Math.PI
      const x2 = (right ? 1 : -1) * Math.min(radius + 36, W / 2 - 94)
      return { ...d, p0, p1, p2, x2, right }
    })

  const labelLayer = g.append('g').attr('class', 'donut-label-layer')

  labelLayer.selectAll('polyline')
    .data(labelData)
    .join('polyline')
    .attr('points', d => [d.p0, d.p1, [d.x2 - (d.right ? 4 : -4), d.p2[1]]])
    .attr('fill', 'none')
    .attr('stroke', d => color(d.data.name))
    .attr('stroke-width', 1.1)
    .attr('stroke-opacity', 0)
    .transition()
    .delay(760)
    .duration(420)
    .attr('stroke-opacity', 0.68)

  labelLayer.selectAll('text')
    .data(labelData)
    .join('text')
    .attr('x', d => d.x2 + (d.right ? 5 : -5))
    .attr('y', d => d.p2[1])
    .attr('dy', '0.32em')
    .attr('text-anchor', d => d.right ? 'start' : 'end')
    .style('font-size', '10.5px')
    .style('font-weight', 700)
    .style('fill', '#3f3f46')
    .style('paint-order', 'stroke')
    .style('stroke', 'rgba(255,255,255,0.95)')
    .style('stroke-width', 3.5)
    .style('stroke-linejoin', 'round')
    .style('opacity', 0)
    .text(d => `${localize(d.data.name)} ${d.data.count}`)
    .transition()
    .delay(820)
    .duration(420)
    .style('opacity', 1)
}

function labelTransform(d) {
  const x = ((d.x0 + d.x1) / 2) * 180 / Math.PI
  const y = (d.y0 + d.y1) / 2
  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
}

function drawMap() {
  if (!chinaMapRef.value) return
  drawSchematicProvinceMap()
}

function provinceColorScale(maxRecords) {
  return d3.scaleSequential().domain([0, Math.max(1, maxRecords)]).interpolator(d3.interpolateYlOrBr)
}

function provinceTooltip(province) {
  const row = provinceStatsMap.value.get(province)
  if (!row) return t("<strong>{0}</strong><br/>乐器总数：0<br/>记录数：0<br/>主要器类：暂无", [localize(province)])
  const types = row.mainTypes.map(d => `${localize(d.name)} (${d.count})`).join(', ') || t('暂无')
  return t("<strong>{0}</strong><br/>乐器总数：{1}<br/>记录数：{2}<br/>主要器类：{3}", [localize(province), localize(row.totalCount), localize(row.records), localize(types)])
}



function provincePolygon(d, tileW, tileH, startX, startY) {
  const x = startX + d.x * tileW
  const y = startY + d.y * tileH
  const w = tileW - 4
  const h = tileH - 4
  const skew = ((d.x + d.y) % 3 - 1) * 5

  return [
    [x + 5 + skew, y + 2],
    [x + w - 7, y + 4 + Math.abs(skew) * 0.2],
    [x + w - 2, y + h * 0.52],
    [x + w - 9 - skew, y + h - 3],
    [x + 6, y + h - 2],
    [x + 2, y + h * 0.45]
  ]
}

function drawSchematicProvinceMap() {
  const svgEl = chinaMapRef.value
  const W = svgEl.clientWidth || 860
  const H = svgEl.clientHeight || 540
  const svg = d3.select(svgEl)
  svg.selectAll('*').remove()
  svg.attr('viewBox', `0 0 ${W} ${H}`)

  const tileW = Math.min(82, (W - 90) / 9)
  const tileH = Math.min(50, (H - 88) / 9)
  const startX = (W - tileW * 9) / 2
  const startY = 36
  const maxRecords = d3.max(provinceStats.value, d => d.records) || 1
  const color = provinceColorScale(maxRecords)
  const line = d3.line().curve(d3.curveLinearClosed)
  const g = svg.append('g').attr('class', 'map-viewport')

  g.append('image')
    .attr('href', '/china-map-bg.png')
    .attr('x', Math.max(0, startX - 96))
    .attr('y', 2)
    .attr('width', Math.min(W, tileW * 9 + 192))
    .attr('height', Math.min(H - 16, tileH * 9 + 88))
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('opacity', 0.28)
    .style('pointer-events', 'none')

  const groups = g.selectAll('g.province')
    .data(PROVINCE_TILE_LAYOUT)
    .join('g')
    .attr('class', 'province')
    .style('cursor', 'pointer')
    .on('mouseenter', (event, d) => {
      hoveredProvince.value = d.name
      d3.select(event.currentTarget).select('path').attr('stroke', '#7c2d12').attr('stroke-width', 2.5)
      showTooltip(event, provinceTooltip(d.name))
    })
    .on('mousemove', moveTooltip)
    .on('mouseleave', event => {
      hoveredProvince.value = ''
      d3.select(event.currentTarget).select('path').attr('stroke', '#fffaf3').attr('stroke-width', 1.6)
      hideTooltip()
    })
    .on('click', (event, d) => {
      activeProvince.value = d.name
      const cx = startX + d.x * tileW + tileW / 2
      const cy = startY + d.y * tileH + tileH / 2
      g.transition().duration(650).attr('transform', `translate(${W / 2 - cx * 1.9},${H / 2 - cy * 1.9}) scale(1.9)`)
    })

  groups.append('path')
    .attr('d', d => line(provincePolygon(d, tileW, tileH, startX, startY)))
    .attr('fill', d => {
      const records = provinceStatsMap.value.get(d.name)?.records || 0
      return records ? color(records) : '#f5f5f4'
    })
    .attr('stroke', '#fffaf3')
    .attr('stroke-width', 1.6)

  groups.append('text')
    .attr('x', d => startX + d.x * tileW + tileW / 2)
    .attr('y', d => startY + d.y * tileH + tileH / 2 + 4)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('font-weight', d => provinceStatsMap.value.get(d.name) ? 700 : 400)
    .style('fill', d => provinceStatsMap.value.get(d.name) ? '#3f2a17' : '#a8a29e')
    .style('pointer-events', 'none')
    .text(localizedText(d => d.name))

  drawMapLegend(svg, W, H, color, maxRecords)
}

function drawMapLegend(svg, W, H, color, maxRecords) {
  const legend = svg.append('g').attr('transform', `translate(${W - 170},${H - 38})`)
  const defs = svg.append('defs')
  const gradient = defs.append('linearGradient').attr('id', 'provinceGradient')
  gradient.selectAll('stop')
    .data(d3.range(0, 1.01, 0.2))
    .join('stop')
    .attr('offset', d => `${d * 100}%`)
    .attr('stop-color', d => color(d * maxRecords))
  legend.append('rect').attr('width', 130).attr('height', 8).attr('fill', 'url(#provinceGradient)')
  legend.append('text').attr('x', 0).attr('y', 22).style('font-size', '10px').style('fill', '#7d7165').text(localizedText('0'))
  legend.append('text').attr('x', 130).attr('y', 22).attr('text-anchor', 'end').style('font-size', '10px').style('fill', '#7d7165').text(localizedText(maxRecords))
  legend.append('text').attr('x', 65).attr('y', -6).attr('text-anchor', 'middle').style('font-size', '11px').style('fill', '#57534e').text(localizedText('记录数'))
}

function resetMapView() {
  activeProvince.value = ''
  d3.select(chinaMapRef.value).select('g.map-viewport').transition().duration(650).attr('transform', null)
}

function drawHeatmap() {
  if (!heatmapRef.value) return
  const { provinces, types, cells } = matrixData.value
  const svgEl = heatmapRef.value
  const W = svgEl.clientWidth || 1120
  const H = heatmapHeight.value
  const margin = { top: 86, right: 30, bottom: 35, left: 90 }
  const innerW = W - margin.left - margin.right
  const innerH = H - margin.top - margin.bottom
  const svg = d3.select(svgEl)
  svg.selectAll('*').remove()
  svg.attr('viewBox', `0 0 ${W} ${H}`)

  const x = d3.scaleBand().domain(types).range([0, innerW]).padding(0.02)
  const y = d3.scaleBand().domain(provinces).range([0, innerH]).padding(0.02)
  const maxCount = d3.max(cells, d => d.count) || 1
  const color = d3.scaleSequential().domain([0, maxCount]).interpolator(d3.interpolateOranges)
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  g.append('g').selectAll('text').data(types).join('text')
    .attr('x', d => x(d) + x.bandwidth() / 2)
    .attr('y', -12)
    .attr('text-anchor', 'start')
    .attr('transform', d => `rotate(-42,${x(d) + x.bandwidth() / 2},-12)`)
    .style('font-size', '12px')
    .style('fill', '#57534e')
    .text(localizedText(d => d))

  g.append('g').selectAll('text').data(provinces).join('text')
    .attr('x', -10)
    .attr('y', d => y(d) + y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'end')
    .style('font-size', '12px')
    .style('fill', '#57534e')
    .text(localizedText(d => d))

  const cell = g.selectAll('g.cell').data(cells).join('g')
    .attr('class', 'cell')
    .attr('transform', d => `translate(${x(d.type)},${y(d.province)})`)
    .style('cursor', d => d.count > 0 ? 'pointer' : 'default')
    .on('mouseenter', (event, d) => {
      showTooltip(event, d.count > 0
        ? t("<strong>{0} × {1}</strong><br/>记录数：{2}<br/>单击查看检索结果", [localize(d.province), localize(d.type), localize(d.count)])
        : t("<strong>{0} × {1}</strong><br/>暂无记录", [localize(d.province), localize(d.type)]))
    })
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)
    .on('click', (event, d) => {
      if (!d.count) return
      router.push({ path: '/search', query: { province: d.province, type: d.type, from: 'statistics' } })
    })

  cell.append('rect')
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('fill', d => d.count > 0 ? color(d.count) : '#f5f5f4')
    .attr('stroke', '#fffaf3')
    .attr('stroke-width', 1)

  cell.filter(d => d.count > 0).append('text')
    .attr('x', x.bandwidth() / 2)
    .attr('y', y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'middle')
    .style('font-size', '11px')
    .style('font-weight', 700)
    .style('fill', d => d.count > maxCount * 0.55 ? '#fff7ed' : '#7c2d12')
    .style('pointer-events', 'none')
    .text(localizedText(d => d.count))

  const legendW = 180
  const legend = svg.append('g').attr('transform', `translate(${W - legendW - 30},${H - 24})`)
  const defs = svg.append('defs')
  const gradient = defs.append('linearGradient').attr('id', 'heatmapGradient')
  gradient.selectAll('stop').data(d3.range(0, 1.01, 0.2)).join('stop')
    .attr('offset', d => `${d * 100}%`)
    .attr('stop-color', d => color(d * maxCount))
  legend.append('rect').attr('width', legendW).attr('height', 8).attr('fill', 'url(#heatmapGradient)')
  legend.append('text').attr('x', 0).attr('y', -6).style('font-size', '10px').style('fill', '#7d7165').text(localizedText('0'))
  legend.append('text').attr('x', legendW).attr('y', -6).attr('text-anchor', 'end').style('font-size', '10px').style('fill', '#7d7165').text(localizedText(maxCount))
}

function drawStackedEvolution() {
  if (!stackedRef.value) return
  const { types, data } = eraEvolutionData.value
  const svgEl = stackedRef.value
  const W = svgEl.clientWidth || 1120
  const H = stackedHeight.value
  const margin = { top: 44, right: 190, bottom: 62, left: 70 }
  const innerW = W - margin.left - margin.right
  const innerH = H - margin.top - margin.bottom
  const svg = d3.select(svgEl)
  svg.selectAll('*').remove()
  svg.attr('viewBox', `0 0 ${W} ${H}`)

  if (!data.length || !types.length) {
    svg.append('text')
      .attr('x', W / 2)
      .attr('y', H / 2)
      .attr('text-anchor', 'middle')
      .style('fill', '#a8a29e')
      .text(localizedText('暂无可绘制的时代演变数据'))
    return
  }

  const stack = d3.stack().keys(types).order(d3.stackOrderNone).offset(d3.stackOffsetNone)
  const series = stack(data)
  const x = d3.scalePoint().domain(data.map(d => d.era)).range([0, innerW]).padding(0.5)
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.total) || 1]).nice().range([innerH, 0])
  const area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => x(d.data.era))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))
  const line = d3.line()
    .curve(d3.curveMonotoneX)
    .x(d => x(d.era))
    .y(d => y(d.total))

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  g.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(y).ticks(6).tickSize(-innerW).tickFormat(''))
    .selectAll('line')
    .attr('stroke', '#eee2d4')

  g.append('g')
    .attr('transform', `translate(0,${innerH})`)
    .call(d3.axisBottom(x).tickFormat(localize))
    .selectAll('text')
    .style('font-size', '12px')
    .style('fill', '#66584c')

  g.append('g')
    .call(d3.axisLeft(y).ticks(6))
    .selectAll('text')
    .style('font-size', '11px')
    .style('fill', '#66584c')

  g.selectAll('.domain').attr('stroke', '#cfbda9')
  g.selectAll('.tick line').attr('stroke', '#eee2d4')

  g.append('text')
    .attr('x', -45)
    .attr('y', -18)
    .style('font-size', '12px')
    .style('fill', '#66584c')
    .text(localizedText('数量'))

  const layer = g.append('g')
    .selectAll('path.layer')
    .data(series)
    .join('path')
    .attr('class', 'layer')
    .attr('d', area)
    .attr('fill', d => INSTRUMENT_COLOR[d.key] || '#b45309')
    .attr('fill-opacity', 0.76)
    .attr('stroke', d => d3.color(INSTRUMENT_COLOR[d.key] || '#b45309').darker(0.28))
    .attr('stroke-width', 1)
    .on('mouseenter', (event, d) => showTooltip(event, t('<strong>{0}</strong><br/>跨时代数量：{1}', [d.key, d3.sum(d, item => item.data[d.key] || 0)])))
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)

  g.append('path')
    .datum(data)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', '#7b684f')
    .attr('stroke-width', 1.2)
    .attr('stroke-opacity', 0.75)

  g.append('g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', d => x(d.era))
    .attr('cy', d => y(d.total))
    .attr('r', 3.5)
    .attr('fill', '#7b684f')
    .attr('stroke', '#fffaf3')
    .attr('stroke-width', 1)
    .on('mouseenter', (event, d) => showTooltip(event, t("<strong>{0}</strong><br/>总数量：{1}", [localize(d.era), localize(d.total)])))
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)

  const focusLine = g.append('line')
    .attr('y1', 0)
    .attr('y2', innerH)
    .attr('stroke', '#a89580')
    .attr('stroke-dasharray', '4 4')
    .attr('opacity', 0)

  g.append('rect')
    .attr('width', innerW)
    .attr('height', innerH)
    .attr('fill', 'transparent')
    .on('mousemove', event => {
      const [mx] = d3.pointer(event)
      const nearest = data.reduce((best, item) => Math.abs(x(item.era) - mx) < Math.abs(x(best.era) - mx) ? item : best, data[0])
      focusLine.attr('x1', x(nearest.era)).attr('x2', x(nearest.era)).attr('opacity', 1)
      const detail = types
        .map(type => ({ type, value: nearest[type] || 0 }))
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)
        .map(item => `${localize(item.type)}: ${item.value}`)
        .join('<br/>')
      showTooltip(event, t('<strong>{0}</strong><br/>总数量：{1}<br/>{2}', [nearest.era, nearest.total, detail || t('暂无类型记录')]))
    })
    .on('mouseleave', () => {
      focusLine.attr('opacity', 0)
      hideTooltip()
    })

  const legend = svg.append('g').attr('transform', `translate(${W - margin.right + 18},${margin.top})`)
  legend.selectAll('g').data(types).join('g')
    .attr('transform', (d, i) => `translate(0,${i * 22})`)
    .call(gItem => {
      gItem.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', d => INSTRUMENT_COLOR[d] || '#b45309')
        .attr('fill-opacity', 0.76)
      gItem.append('text')
        .attr('x', 18)
        .attr('y', 10)
        .style('font-size', '12px')
        .style('fill', '#57534e')
        .text(localizedText(d => d))
    })
}

function shortArtifactName(name = '') {
  const value = String(name || '').trim()
  if (!value) return '未命名器物'
  return value.length > 10 ? `${value.slice(0, 9)}…` : value
}

function compactCoLocation(value = '') {
  return String(value || '')
    .replace(/\s+/g, '')
    .replace(/[，。；;].*$/g, '')
    .replace(/第[一二三四五六七八九十0-9]+.*$/g, '')
    .replace(/\d+号.*$/g, '')
    .trim()
}

function pairKeyOf(a, b) {
  return [a, b].sort((x, y) => INSTRUMENT_LEAVES.indexOf(x) - INSTRUMENT_LEAVES.indexOf(y) || x.localeCompare(y, 'zh')).join('__')
}

function makeClusterCenters(W, H, count) {
  const cols = count <= 3 ? count : 3
  const rows = Math.ceil(count / cols)
  const xGap = W / (cols + 1)
  const yGap = H / (rows + 1)
  return d3.range(count).map(index => ({
    x: xGap * ((index % cols) + 1),
    y: yGap * (Math.floor(index / cols) + 1)
  }))
}

function buildClusteredInstanceGraph() {
  const artifacts = store.artifacts
    .map((item, index) => {
      const type = getArtifactPrimaryType(item)
      const name = item.器物名称 || item.record_id || t("器物{0}", [localize(index + 1)])
      const province = getArtifactProvince(item)
      const era = normalizeEraGroup(item.时代)
      const location = compactCoLocation(item.出土地点)
      return {
        id: item.record_id || `${name}-${index}`,
        name,
        shortName: shortArtifactName(recordText(name, 'artifact')),
        type,
        group: getTypeMajorGroup(type),
        province,
        era,
        location,
        artifact: item
      }
    })
    .filter(node => node.type && node.type !== '未知' && node.location && !node.location.includes('未详') && node.location !== '-')

  const groupMap = d3.group(artifacts, node => `${node.province || '未知'}|${node.location}|${node.era || '时代未详'}`)
  const clusters = topPairs.value.slice(0, 7).map((pair, index) => ({
    key: pairKeyOf(pair.source, pair.target),
    source: pair.source,
    target: pair.target,
    count: pair.count,
    index,
    title: `${pair.source} × ${pair.target}`,
    nodes: new Map(),
    links: new Map()
  }))

  for (const [, groupNodes] of groupMap) {
    const byType = d3.group(groupNodes, node => node.type)
    for (const cluster of clusters) {
      const left = (byType.get(cluster.source) || []).slice(0, 2)
      const right = (byType.get(cluster.target) || []).slice(0, 2)
      if (!left.length || !right.length) continue
      const members = [...left, ...right]
      members.forEach(member => {
        if (cluster.nodes.size >= 6 && !cluster.nodes.has(member.id)) return
        cluster.nodes.set(member.id, {
          ...member,
          clusterKey: cluster.key,
          clusterIndex: cluster.index,
          clusterTitle: cluster.title
        })
      })
      for (const a of left) {
        for (const b of right) {
          if (cluster.links.size >= 7) continue
          const source = `${a.id}@@${cluster.key}`
          const target = `${b.id}@@${cluster.key}`
          const linkKey = [source, target].sort().join('::')
          cluster.links.set(linkKey, {
            source,
            target,
            sourceType: a.type,
            targetType: b.type,
            clusterKey: cluster.key,
            clusterTitle: cluster.title,
            location: a.location || b.location,
            era: a.era || b.era
          })
        }
      }
    }
  }

  const nodes = []
  const links = []
  clusters.forEach(cluster => {
    const clusterNodes = Array.from(cluster.nodes.values()).slice(0, 6)
    const allowed = new Set(clusterNodes.map(node => `${node.id}@@${cluster.key}`))
    clusterNodes.forEach(node => {
      const degree = 1 + Array.from(cluster.links.values()).filter(link => link.source.startsWith(`${node.id}@@`) || link.target.startsWith(`${node.id}@@`)).length
      nodes.push({
        ...node,
        id: `${node.id}@@${cluster.key}`,
        originalId: node.id,
        degree
      })
    })
    Array.from(cluster.links.values()).forEach(link => {
      if (allowed.has(link.source) && allowed.has(link.target)) links.push(link)
    })
  })

  const visibleClusters = clusters
    .map(cluster => ({
      ...cluster,
      nodeCount: nodes.filter(node => node.clusterKey === cluster.key).length,
      linkCount: links.filter(link => link.clusterKey === cluster.key).length
    }))
    .filter(cluster => cluster.nodeCount > 0)

  return { nodes, links, clusters: visibleClusters }
}

function drawCooccurrence() {
  if (!cooccurrenceRef.value) return
  if (coSimulation) {
    coSimulation.stop()
    coSimulation = null
  }

  const graph = buildClusteredInstanceGraph()
  const nodes = graph.nodes.map(node => ({ ...node }))
  const links = graph.links.map(link => ({ ...link }))
  const clusters = graph.clusters
  if (!selectedPair.value && topPairs.value.length) selectedPair.value = topPairs.value[0]

  const svgEl = cooccurrenceRef.value
  const W = svgEl.clientWidth || 760
  const H = svgEl.clientHeight || 560
  const svg = d3.select(svgEl)
  svg.selectAll('*').remove()
  svg.attr('viewBox', `0 0 ${W} ${H}`)

  if (!nodes.length) {
    svg.append('text')
      .attr('x', W / 2)
      .attr('y', H / 2)
      .attr('text-anchor', 'middle')
      .style('fill', '#a8a29e')
      .text(localizedText('暂无可识别的共现关系'))
    return
  }

  const centers = makeClusterCenters(W, H, clusters.length)
  const clusterCenter = new Map()
  clusters.forEach((cluster, index) => {
    clusterCenter.set(cluster.key, centers[index])
  })
  nodes.forEach(node => {
    const center = clusterCenter.get(node.clusterKey) || { x: W / 2, y: H / 2 }
    node.cx = center.x
    node.cy = center.y
    node.x = center.x + (Math.random() - 0.5) * 44
    node.y = center.y + (Math.random() - 0.5) * 44
  })

  const selectedKey = selectedPair.value ? pairKeyOf(selectedPair.value.source, selectedPair.value.target) : ''
  const maxDegree = d3.max(nodes, d => d.degree) || 1
  const nodeRadius = d3.scaleSqrt().domain([1, maxDegree]).range([10, 22])

  const counts = clusters.map(d => d.count)
  const minCount = d3.min(counts) || 1
  const maxCount = d3.max(counts) || minCount
  const maxPossibleRadius = Math.min(138, W / 6.1, H / 4.2)
  const clusterRadiusScale = d3.scaleSqrt()
    .domain([minCount, maxCount === minCount ? minCount + 1 : maxCount])
    .range([62, maxPossibleRadius])
  const clusterRadius = new Map(clusters.map(cluster => [cluster.key, clusterRadiusScale(cluster.count)]))

  const defs = svg.append('defs')
  const shadow = defs.append('filter').attr('id', 'clusterShadowClear').attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%')
  shadow.append('feDropShadow').attr('dx', 0).attr('dy', 2).attr('stdDeviation', 3).attr('flood-color', '#000').attr('flood-opacity', 0.08)

  const g = svg.append('g')
  const clusterLayer = g.append('g')
  clusters.forEach(cluster => {
    const center = clusterCenter.get(cluster.key)
    if (!center) return
    const isActive = selectedKey === cluster.key
    const dominantColor = INSTRUMENT_COLOR[cluster.source] || INSTRUMENT_COLOR[cluster.target] || '#b45309'
    const radius = clusterRadius.get(cluster.key) || 92

    clusterLayer.append('circle')
      .attr('cx', center.x)
      .attr('cy', center.y)
      .attr('r', radius)
      .attr('fill', d3.color(dominantColor).copy({ opacity: isActive ? 0.20 : 0.12 }))
      .attr('stroke', dominantColor)
      .attr('stroke-width', isActive ? 2.2 : 1.2)
      .attr('stroke-opacity', isActive ? 0.62 : 0.32)
      .attr('filter', 'url(#clusterShadowClear)')
      .style('cursor', 'pointer')
      .on('click', () => {
        const pair = cooccurrenceData.value.pairs.find(item => pairKeyOf(item.source, item.target) === cluster.key)
        if (pair) selectPair(pair)
      })

    clusterLayer.append('text')
      .attr('x', center.x)
      .attr('y', center.y - radius + 24)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 800)
      .style('fill', isActive ? '#7c2d12' : '#5f5145')
      .style('paint-order', 'stroke')
      .style('stroke', 'rgba(255,255,255,0.95)')
      .style('stroke-width', 4)
      .text(localizedText(cluster.title))

    clusterLayer.append('text')
      .attr('x', center.x)
      .attr('y', center.y - radius + 44)
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('fill', '#7d7165')
      .style('paint-order', 'stroke')
      .style('stroke', 'rgba(255,255,255,0.95)')
      .style('stroke-width', 3)
      .text(localizedText(t("{0} 组共现 · 展示 {1} 个实例", [localize(cluster.count), localize(cluster.nodeCount)])))
  })

  const link = g.append('g')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', d => d.clusterKey === selectedKey ? 2.8 : 1.35)
    .attr('stroke', d => d.clusterKey === selectedKey ? '#7c2d12' : '#cfc2b4')
    .attr('stroke-opacity', d => d.clusterKey === selectedKey ? 0.78 : 0.46)
    .style('cursor', 'pointer')
    .on('mouseenter', (event, d) => showTooltip(event, t("<strong>{0}</strong><br/>地点：{1}<br/>时代：{2}", [localize(d.clusterTitle), recordText(d.location, 'site'), localize(d.era)])))
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)
    .on('click', (event, d) => {
      const pair = cooccurrenceData.value.pairs.find(item => pairKeyOf(item.source, item.target) === d.clusterKey)
      if (pair) selectPair(pair)
    })

  const node = g.append('g')
    .selectAll('g.node')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .style('cursor', 'pointer')
    .on('mouseenter', (event, d) => showTooltip(event, t("<strong>{0}</strong><br/>器类：{1}<br/>时代：{2}<br/>地点：{3}", [recordText(d.name, 'artifact'), localize(d.type), localize(d.era), recordText(d.location, 'site')])))
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)
    .on('click', (event, d) => viewArtifact(d.originalId))

  node.append('circle')
    .attr('r', d => nodeRadius(d.degree))
    .attr('fill', d => INSTRUMENT_COLOR[d.type] || INSTRUMENT_COLOR[d.group] || '#b8a28a')
    .attr('fill-opacity', d => d.clusterKey === selectedKey ? 0.98 : 0.88)
    .attr('stroke', '#fffaf3')
    .attr('stroke-width', 2)

  node.append('text')
    .attr('x', d => nodeRadius(d.degree) + 5)
    .attr('dy', '0.32em')
    .style('font-size', '10.5px')
    .style('font-weight', 700)
    .style('fill', '#4f463d')
    .style('paint-order', 'stroke')
    .style('stroke', 'rgba(255,255,255,0.96)')
    .style('stroke-width', 4)
    .style('stroke-linejoin', 'round')
    .text(localizedText(d => d.shortName))
    .append('title').text(d => recordText(d.name, 'artifact'))

  coSimulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(40).strength(0.72))
    .force('charge', d3.forceManyBody().strength(-52))
    .force('collide', d3.forceCollide(d => nodeRadius(d.degree) + 19).strength(1))
    .force('x', d3.forceX(d => d.cx).strength(0.36))
    .force('y', d3.forceY(d => d.cy).strength(0.36))
    .alpha(0.9)
    .alphaDecay(0.034)
    .on('tick', () => {
      nodes.forEach(d => {
        const c = clusterCenter.get(d.clusterKey) || { x: W / 2, y: H / 2 }
        const maxR = Math.max(58, (clusterRadius.get(d.clusterKey) || 92) - 22)
        const dx = d.x - c.x
        const dy = d.y - c.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        if (dist > maxR) {
          d.x = c.x + dx / dist * maxR
          d.y = c.y + dy / dist * maxR
        }
        d.x = Math.max(22, Math.min(W - 130, d.x))
        d.y = Math.max(24, Math.min(H - 24, d.y))
      })
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

  svg.append('text')
    .attr('x', 18)
    .attr('y', H - 18)
    .style('font-size', '12px')
    .style('fill', '#7d7165')
    .text(localizedText('仅展示 Top 7 高频组合；圆形簇大小代表共现规模，节点为具体器物实例。'))
}


function selectPair(pair) {
  selectedPair.value = pair
  nextTick(drawCooccurrence)
}


function safeDraw(name, drawFn) {
  try {
    drawFn()
  } catch (error) {
    console.error(`[Statistics] ${name} 绘制失败：`, error)
  }
}

function redrawAll() {
  nextTick(() => {
    safeDraw('乐器类型分布', drawSunburst)
    safeDraw('类型详情圆环', drawTypeDonuts)
    safeDraw('省级分布图', drawMap)
    safeDraw('地区乐器热力图', drawHeatmap)
    safeDraw('乐器类型演变趋势', drawStackedEvolution)
    safeDraw('乐器组合共现关系', drawCooccurrence)
  })
}

onMounted(() => {
  redrawAll()
  window.addEventListener('resize', redrawAll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', redrawAll)
  if (coSimulation) coSimulation.stop()
})

watch(() => store.artifacts, redrawAll, { deep: true })
watch(locale, () => {
  hideTooltip()
  redrawAll()
})
</script>

<style scoped>
.chart-card {
  @apply rounded-xl border border-stone-100 bg-white p-6 shadow-md;
  overflow: hidden;
}

.chart-head {
  @apply mb-5 flex items-start justify-between gap-4;
}

.chart-title {
  @apply text-xl font-bold text-amber-900;
}

.chart-desc {
  @apply mt-1 text-sm leading-6 text-stone-500;
}

.small-action {
  @apply shrink-0 rounded-full border border-amber-200 px-4 py-1.5 text-sm text-amber-800 transition-colors hover:bg-amber-50;
}

.sunburst-wrap {
  @apply flex justify-center;
}

.sunburst-svg {
  display: block;
  max-width: 100%;
}


.map-layout {
  @apply grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr),360px];
}

.map-box {
  @apply relative h-[540px] rounded-xl border border-stone-200 bg-stone-50 p-2;
  overflow: hidden;
}

.map-note {
  @apply absolute bottom-3 left-3 max-w-[560px] rounded bg-white/90 px-3 py-1 text-xs text-stone-500 shadow-sm;
}

.province-panel {
  @apply rounded-xl border border-amber-100 bg-amber-50/40 p-5;
  min-height: 540px;
}

.mini-stat {
  @apply rounded-lg bg-white p-3 text-center shadow-sm;
}

.mini-stat span {
  @apply block text-xl font-bold text-amber-900;
}

.mini-stat em {
  @apply mt-1 block text-xs not-italic text-stone-500;
}

.panel-subtitle {
  @apply mb-2 text-sm font-semibold text-amber-900;
}


.empty-panel {
  @apply flex h-full min-h-[460px] flex-col items-center justify-center gap-3 text-center text-stone-500;
}

.empty-panel span {
  @apply text-5xl;
}

.empty-text {
  @apply text-xs text-stone-400;
}

.co-layout {
  @apply grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr),360px];
}

.co-network-box {
  @apply h-[540px] rounded-xl border border-stone-200 bg-amber-50/30 p-2;
  overflow: hidden;
}

.co-panel {
  @apply rounded-xl border border-amber-100 bg-amber-50/40 p-5;
  min-height: 540px;
}

.selected-pair {
  @apply mb-4 rounded-lg bg-white p-3 shadow-sm;
}

.selected-pair h5 {
  @apply text-lg font-bold text-amber-900;
}

.selected-pair p:last-child {
  @apply mt-1 text-sm text-stone-600;
}


.example-card {
  @apply rounded-lg bg-white p-3 text-xs leading-5 shadow-sm;
}

.example-card strong {
  @apply mr-2 text-amber-900;
}

.example-card span {
  @apply rounded-full bg-blue-100 px-2 py-0.5 text-blue-800;
}

.example-card p {
  @apply mt-1 text-stone-600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.type-layout {
  @apply grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,500px),minmax(360px,1fr)];
}

.type-panel {
  @apply rounded-xl border border-amber-100 bg-amber-50/40 p-5;
}

.type-donut-grid {
  @apply mt-4 grid grid-cols-1 gap-3 md:grid-cols-2;
}

.type-donut-card {
  @apply rounded-xl bg-white p-3 shadow-sm;
  min-height: 355px;
}

.type-donut-svg {
  display: block;
  width: 100%;
  min-height: 290px;
}

.case-row {
  @apply cursor-pointer rounded-lg bg-white p-3 text-xs leading-5 shadow-sm transition-colors hover:bg-amber-50;
}

.case-row strong {
  @apply block truncate text-sm text-amber-900;
}

.case-row span {
  @apply mt-1 block text-stone-500;
}


.info-section {
  @apply mt-5 rounded-xl border border-stone-100 bg-white/80 p-3 shadow-sm;
}

.info-section-head {
  @apply mb-3 flex items-center justify-between gap-3;
}

.info-section-title {
  @apply inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-bold shadow-sm;
}

.info-section-count {
  @apply shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500;
}

.info-section-title.chip-blue { @apply border-blue-200 bg-blue-100 text-blue-800; }
.info-section-title.chip-green { @apply border-green-200 bg-green-100 text-green-800; }
.info-section-title.chip-orange { @apply border-orange-200 bg-orange-100 text-orange-800; }
.info-section-title.chip-purple { @apply border-purple-200 bg-purple-100 text-purple-800; }
.info-section-title.chip-stone { @apply border-stone-200 bg-stone-100 text-stone-700; }

.info-section-title.chip-blue .chip-title-dot { @apply bg-blue-500; }
.info-section-title.chip-green .chip-title-dot { @apply bg-green-500; }
.info-section-title.chip-orange .chip-title-dot { @apply bg-orange-500; }
.info-section-title.chip-purple .chip-title-dot { @apply bg-purple-500; }
.info-section-title.chip-stone .chip-title-dot { @apply bg-stone-400; }


.co-legend {
  @apply mb-4 rounded-lg bg-white p-3 shadow-sm;
}

.co-legend-list {
  @apply grid grid-cols-2 gap-2 text-xs text-stone-600;
}

.co-legend-list span {
  @apply flex items-center gap-1;
}

.legend-dot {
  @apply inline-block h-3 w-3 rounded-full;
}

.legend-dot.bell { background: #4f8edb; }
.legend-dot.hit { background: #e27f2d; }
.legend-dot.clash { background: #2fbf6b; }
.legend-dot.shake { background: #9567d6; }

.chart-tooltip {
  position: fixed;
  z-index: 9999;
  max-width: 320px;
  pointer-events: none;
  border-radius: 10px;
  background: rgba(63, 42, 23, 0.94);
  color: #fff7ed;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.65;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
}

:deep(svg text) {
  font-family: 'Noto Sans SC', sans-serif;
}
</style>
