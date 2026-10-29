<template>
  <div class="min-h-screen bg-stone-50">
    <main class="container mx-auto px-6 py-8">
      <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <router-link :to="backTarget" class="text-amber-700 hover:text-amber-900 transition-colors">← {{ localize(backText) }}</router-link>
          <h2 class="mt-4 text-3xl font-bold text-amber-900">{{ t("搜索结果") }}</h2>
          <div v-if="activeFilters.length" class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="filter in activeFilters"
              :key="filter.label"
              class="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800"
            >
              {{ localize(filter.label) }}：{{ localize(filter.value) }}
            </span>
          </div>
        </div>
        <span class="text-stone-500">{{ t("找到 {0} 条结果", [filteredArtifacts.length]) }}</span>
      </div>
    </main>

    <div class="bg-white shadow-md">
      <div class="container mx-auto px-6 py-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder='t("继续搜索...")'
            class="w-full px-6 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-700"
          >{{ t("搜索") }}</button>
        </div>
      </div>
    </div>

    <main class="container mx-auto px-6 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
        <p class="mt-4 text-stone-600">{{ t("加载中...") }}</p>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="artifact in filteredArtifacts"
          :key="artifact.record_id"
          class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
          @click="viewDetail(artifact.record_id)"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-amber-900 mb-3">
                {{ recordText(artifact.器物名称 || '未命名文物', 'artifact') }}
              </h3>

              <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm">
                <div>
                  <span class="font-medium text-stone-600">{{ t("地区：") }}</span>
                  <span class="text-stone-800">{{ localize(getArtifactProvince(artifact)) }}</span>
                </div>
                <div>
                  <span class="font-medium text-stone-600">{{ t("类型：") }}</span>
                  <span class="text-stone-800">{{ localize(artifact.乐器类型 || '未知') }}</span>
                </div>
                <div>
                  <span class="font-medium text-stone-600">{{ t("时代：") }}</span>
                  <span class="text-stone-800">{{ periodText(artifact.时代 || '未知') }}</span>
                </div>
                <div>
                  <span class="font-medium text-stone-600">{{ t("机构：") }}</span>
                  <span class="text-stone-800">{{ recordText(artifact.机构 || '未知', 'institution') }}</span>
                </div>
                <div>
                  <span class="font-medium text-stone-600">{{ t("编号：") }}</span>
                  <span class="text-stone-800">{{ localize(artifact.编号 || '无') }}</span>
                </div>
              </div>

              <div v-if="artifact.标注部分?.entities" class="mb-4">
                <h4 class="text-sm font-medium text-stone-600 mb-2">{{ t("识别实体：") }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="entity in artifact.标注部分.entities.slice(0, 8)"
                    :key="`${artifact.record_id}-${entity.start}-${entity.end}-${entity.text}`"
                    class="px-3 py-1 text-sm rounded-full"
                    :class="getEntityClass(entity.label)"
                  >
                    {{ entityText(entity) }}
                  </span>
                  <span v-if="artifact.标注部分.entities.length > 8" class="text-sm text-stone-500">{{ t("+{0} 更多", [artifact.标注部分.entities.length - 8]) }}</span>
                </div>
              </div>

              <div v-if="artifact.标注部分?.relations" class="text-sm text-stone-500">{{ t("包含 {0} 条关系", [artifact.标注部分.relations.length]) }}</div>
            </div>

            <div class="ml-4 text-amber-600">→</div>
          </div>
        </div>

        <div v-if="filteredArtifacts.length === 0" class="text-center py-12">
          <p class="text-xl text-stone-600 mb-4">{{ t("未找到匹配的文物") }}</p>
          <router-link to="/" class="text-amber-600 hover:text-amber-700">{{ t("返回首页重新搜索") }}</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n'
const { t, localize, recordText, entityText, periodText } = useI18n()
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useArtifactStore } from '../stores/artifactStore'
import { getArtifactProvince, getNormalizedType, searchArtifactText } from '../utils/statisticsData'

const router = useRouter()
const route = useRoute()
const store = useArtifactStore()

const searchQuery = ref('')
const selectedProvince = ref('')
const selectedType = ref('')
const loading = ref(true)

const backTarget = computed(() => route.query.from === 'statistics' ? '/statistics' : '/')
const backText = computed(() => route.query.from === 'statistics' ? t("返回统计分析") : t("返回首页"))

const activeFilters = computed(() => {
  const filters = []
  if (searchQuery.value) filters.push({ label: t("关键词"), value: searchQuery.value })
  if (selectedProvince.value) filters.push({ label: t("地区"), value: selectedProvince.value })
  if (selectedType.value) filters.push({ label: t("乐器类型"), value: selectedType.value })
  return filters
})

const filteredArtifacts = computed(() => {
  const keywords = searchQuery.value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  return store.artifacts.filter(artifact => {
    if (selectedProvince.value && getArtifactProvince(artifact) !== selectedProvince.value) return false
    if (selectedType.value && getNormalizedType(artifact.乐器类型) !== selectedType.value) return false

    if (!keywords.length) return true
    const text = searchArtifactText(artifact)
    return keywords.every(keyword => text.includes(keyword))
  })
})

function syncRouteQuery() {
  searchQuery.value = route.query.q ? String(route.query.q) : ''
  selectedProvince.value = route.query.province ? String(route.query.province) : ''
  selectedType.value = route.query.type ? String(route.query.type) : ''
}

function getEntityClass(label) {
  const classes = {
    '出土地点': 'bg-blue-100 text-blue-800',
    '乐器部件': 'bg-green-100 text-green-800',
    '数据属性': 'bg-orange-100 text-orange-800',
    '纹饰': 'bg-purple-100 text-purple-800'
  }
  return classes[label] || 'bg-gray-100 text-gray-800'
}

function handleSearch() {
  router.push({
    path: '/search',
    query: {
      ...(searchQuery.value ? { q: searchQuery.value } : {}),
      ...(selectedProvince.value ? { province: selectedProvince.value } : {}),
      ...(selectedType.value ? { type: selectedType.value } : {}),
      ...(route.query.from === 'statistics' ? { from: 'statistics' } : {})
    }
  })
}

function viewDetail(id) {
  router.push({ path: `/artifact/${id}` })
}

onMounted(() => {
  syncRouteQuery()
  loading.value = false
})

watch(() => route.query, syncRouteQuery, { deep: true })
</script>
