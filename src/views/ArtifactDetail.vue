<template>
  <div class="min-h-screen bg-stone-50">
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block h-16 w-16 animate-spin rounded-full border-4 border-amber-600 border-t-transparent"></div>
      <p class="mt-4 text-stone-600">{{ t("加载中...") }}</p>
    </div>

    <main v-else-if="!artifact" class="container mx-auto px-6 py-16 text-center">
      <p class="text-xl text-stone-600">{{ t("未找到该文物") }}</p>
      <router-link to="/" class="mt-4 inline-block text-amber-700 hover:text-amber-900">{{ t("返回首页") }}</router-link>
    </main>

    <main v-else class="container mx-auto px-6 py-8">
      <router-link to="/" class="inline-block mb-6 text-amber-700 hover:text-amber-900 transition-colors">{{ t("← 返回首页") }}</router-link>

      <p v-if="locale !== 'zh-CN'" class="mb-6 rounded-lg bg-amber-50 p-4 text-sm text-stone-600">{{ t('界面、分类、时代和地区名称支持三种语言。文物专名、考古描述、文献及原始标注保留中文原文。') }}</p>

      <section class="detail-card">
        <h2 class="detail-title">{{ t("基本信息") }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6">
          <div v-for="item in basicInfo" :key="item.label">
            <label class="block text-sm font-medium text-stone-500 mb-1">{{ localize(item.label) }}</label>
            <p class="text-base text-stone-900 break-words">{{ localize(displayValue(item.value)) }}</p>
          </div>
        </div>
      </section>

      <section v-if="artifact.文献 || artifact.音乐性能" class="detail-card">
        <h2 class="detail-title">{{ t("扩展信息") }}</h2>

        <div v-if="artifact.文献" class="mb-5">
          <label class="block text-sm font-medium text-stone-500 mb-2">{{ t("参考文献") }}</label>
          <div class="rounded-lg bg-stone-50 px-4 py-3 text-stone-800 leading-relaxed">
            {{ localize(artifact.文献) }}
          </div>
        </div>

        <div v-if="artifact.音乐性能">
          <label class="block text-sm font-medium text-stone-500 mb-2">{{ t("音乐性能") }}</label>
          <div class="rounded-lg bg-stone-50 px-4 py-3 text-stone-800 leading-relaxed whitespace-pre-wrap">
            {{ localize(artifact.音乐性能) }}
          </div>
        </div>
      </section>

      <section v-if="entityTotal" class="detail-card">
        <h2 class="detail-title">{{ t("识别实体列表") }}<span class="ml-2 text-lg font-normal text-stone-500">{{ t("({0} 个)", [entityTotal]) }}</span>
        </h2>

        <div class="space-y-5">
          <div v-for="group in entityGroups" :key="group.label">
            <div class="mb-3 flex items-center gap-2 text-base font-medium" :class="getEntityHeadingClass(group.label)">
              <span class="h-3 w-3 rounded-full" :class="getEntityDotClass(group.label)"></span>
              <span>{{ localize(group.label) }} ({{ localize(group.items.length) }})</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(entity, index) in group.items"
                :key="`${group.label}-${entity.start}-${entity.end}-${index}`"
                class="rounded-full px-3 py-1 text-sm"
                :class="getEntityPillClass(group.label)"
              >
                {{ localize(entity.text) }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="detail-card">
        <h2 class="detail-title">{{ t("关系列表") }}<span class="ml-2 text-lg font-normal text-stone-500">{{ t("({0} 条)", [relations.length]) }}</span>
        </h2>

        <div v-if="relations.length" class="space-y-4">
          <div
            v-for="(relation, index) in relations"
            :key="index"
            class="rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:bg-stone-50"
          >
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  {{ localize(relation.subject.text) }}
                </span>
                <span class="text-stone-400">→</span>
                <span class="rounded px-3 py-1 text-sm font-medium" :class="getRelationClass(relation.label)">
                  {{ localize(relation.label) }}
                </span>
                <span class="text-stone-400">→</span>
                <span class="rounded bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                  {{ localize(relation.object.text) }}
                </span>
              </div>
              <div class="text-sm text-stone-500 md:ml-4">{{ t("置信度: {0}%", [(relation.confidence * 100).toFixed(1)]) }}</div>
            </div>
          </div>
        </div>

        <div v-else class="py-8 text-center text-stone-500">{{ t("暂无关系数据") }}</div>
      </section>

      <section class="detail-card">
        <h2 class="detail-title">{{ t("相似文物推荐") }}</h2>

        <div v-if="similarArtifacts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in similarArtifacts"
            :key="item.artifact.record_id"
            class="cursor-pointer rounded-lg border border-stone-200 p-4 transition-shadow hover:shadow-lg"
            @click="viewSimilar(item.artifact.record_id)"
          >
            <h4 class="mb-2 font-bold text-amber-900">
              {{ localize(item.artifact.器物名称 || '未命名文物') }}
            </h4>
            <div class="mb-3 space-y-1 text-sm text-stone-600">
              <p>{{ localize(item.artifact.乐器类型 || '未知类型') }} | {{ localize(item.artifact.时代 || '未知时代') }}</p>
            </div>

            <div class="mb-3">
              <div class="mb-1 flex justify-between text-sm">
                <span class="text-stone-600">{{ t("相似度") }}</span>
                <span class="font-medium text-amber-600">
                  {{ localize((item.score.total * 100).toFixed(1)) }}%
                </span>
              </div>
              <div class="h-2 w-full rounded-full bg-stone-200">
                <div
                  class="h-2 rounded-full bg-amber-600"
                  :style="{ width: `${item.score.total * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="py-8 text-center text-stone-500">{{ t("暂无相似文物推荐") }}</div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n'
const { t, localize, locale } = useI18n()
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useArtifactStore } from '../stores/artifactStore'

const router = useRouter()
const route = useRoute()
const store = useArtifactStore()

const artifact = ref(null)
const similarArtifacts = ref([])
const loading = ref(true)

const basicInfo = computed(() => {
  if (!artifact.value) return []
  return [
    { label: t("记录编号"), value: artifact.value.record_id },
    { label: t("器物名称"), value: artifact.value.器物名称 },
    { label: t("乐器类型"), value: artifact.value.乐器类型 },
    { label: t("数量"), value: artifact.value.数量 },
    { label: t("时代"), value: artifact.value.时代 },
    { label: t("收藏机构"), value: artifact.value.机构 },
    { label: t("文物编号"), value: artifact.value.编号 },
    { label: t("出土时间"), value: artifact.value.出土时间 },
    { label: t("移交时间"), value: artifact.value.移交时间 },
    { label: t("出土地点"), value: artifact.value.出土地点 },
    { label: t("原藏机构"), value: artifact.value.原藏机构 }
  ]
})

const relations = computed(() => artifact.value?.标注部分?.relations || [])
const entityTotal = computed(() => artifact.value?.标注部分?.entities?.length || 0)

const entityGroups = computed(() => {
  const entities = artifact.value?.标注部分?.entities || []
  const order = ['出土地点', '乐器部件', '数据属性', '纹饰']
  const groups = new Map()

  for (const entity of entities) {
    if (!groups.has(entity.label)) groups.set(entity.label, [])
    groups.get(entity.label).push(entity)
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => {
      const ai = order.indexOf(a)
      const bi = order.indexOf(b)
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    })
    .map(([label, items]) => ({ label, items }))
})

function displayValue(value) {
  if (value === null || value === undefined) return '-'
  const text = String(value).trim()
  return text || '-'
}

function getEntityHeadingClass(label) {
  const classes = {
    '出土地点': 'text-blue-700',
    '乐器部件': 'text-green-700',
    '数据属性': 'text-orange-700',
    '纹饰': 'text-purple-700'
  }
  return classes[label] || 'text-stone-700'
}

function getEntityDotClass(label) {
  const classes = {
    '出土地点': 'bg-blue-500',
    '乐器部件': 'bg-green-500',
    '数据属性': 'bg-orange-500',
    '纹饰': 'bg-purple-500'
  }
  return classes[label] || 'bg-stone-400'
}

function getEntityPillClass(label) {
  const classes = {
    '出土地点': 'bg-blue-100 text-blue-800',
    '乐器部件': 'bg-green-100 text-green-800',
    '数据属性': 'bg-orange-100 text-orange-800',
    '纹饰': 'bg-purple-100 text-purple-800'
  }
  return classes[label] || 'bg-gray-100 text-gray-800'
}

function getRelationClass(label) {
  const classes = {
    '形状说明': 'bg-teal-100 text-teal-800',
    '有直径': 'bg-cyan-100 text-cyan-800',
    '有高度': 'bg-indigo-100 text-indigo-800',
    '有长度': 'bg-blue-100 text-blue-800',
    '有宽度': 'bg-sky-100 text-sky-800',
    '有厚度': 'bg-rose-100 text-rose-800',
    '有间距': 'bg-amber-100 text-amber-800',
    '有数量': 'bg-lime-100 text-lime-800',
    '全高': 'bg-emerald-100 text-emerald-800',
    '全长': 'bg-green-100 text-green-800',
    '全宽': 'bg-teal-100 text-teal-800',
    '全重': 'bg-yellow-100 text-yellow-800',
    '全径': 'bg-orange-100 text-orange-800',
    '全体厚度': 'bg-red-100 text-red-800',
    '尺寸说明': 'bg-pink-100 text-pink-800'
  }
  return classes[label] || 'bg-gray-100 text-gray-800'
}

function loadArtifact() {
  loading.value = true
  const id = route.params.id
  artifact.value = store.getArtifactById(id)
  similarArtifacts.value = artifact.value ? store.getSimilarArtifacts(artifact.value, 6) : []
  loading.value = false
}

function viewSimilar(id) {
  router.push({ path: `/artifact/${id}` })
}

onMounted(loadArtifact)
watch(() => route.params.id, loadArtifact)
</script>

<style scoped>
.detail-card {
  @apply mb-8 rounded-lg bg-white p-6 shadow-md;
}

.detail-title {
  @apply mb-6 text-2xl font-bold text-amber-900;
}
</style>
