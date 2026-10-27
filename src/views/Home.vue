<template>
  <div class="min-h-screen">
    <!-- 主内容 -->
    <main class="container mx-auto px-6 py-12">
      <!-- 搜索区域 -->
      <section class="max-w-4xl mx-auto text-center mb-16">
        <h2 class="text-4xl font-bold text-amber-900 mb-4">探索古代乐器的奥秘</h2>
        <p class="text-lg text-stone-600 mb-8">
          基于NER+RE模型自动标注的文物知识图谱，支持语义检索和相似文物推荐
        </p>
        
        <!-- 搜索框 -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文物名称、纹饰、尺寸..."
            class="w-full px-6 py-4 text-lg border-2 border-amber-200 rounded-full shadow-lg focus:outline-none focus:border-amber-500 transition-colors"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
          >
            搜索
          </button>
        </div>
      </section>

      <!-- 筛选面板 -->
      <section class="max-w-6xl mx-auto mb-12">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-amber-900 mb-4">筛选条件</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 时代筛选 -->
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-2">时代</label>
              <select v-model="selectedEra" class="w-full px-3 py-2 border rounded-lg">
                <option value="">全部时代</option>
                <option v-for="era in eras" :key="era" :value="era">{{ era }}</option>
              </select>
            </div>

            <!-- 类型筛选 -->
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-2">乐器类型</label>
              <select v-model="selectedType" class="w-full px-3 py-2 border rounded-lg">
                <option value="">全部类型</option>
                <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <!-- 纹饰筛选 -->
            <div>
              <label class="block text-sm font-medium text-stone-700 mb-2">纹饰</label>
              <select v-model="selectedDecoration" class="w-full px-3 py-2 border rounded-lg">
                <option value="">全部纹饰</option>
                <option v-for="dec in decorations" :key="dec" :value="dec">{{ dec }}</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex gap-4">
            <button
              @click="applyFilters"
              class="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              应用筛选
            </button>
            <button
              @click="resetFilters"
              class="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg hover:bg-stone-300 transition-colors"
            >
              重置
            </button>
          </div>
        </div>
      </section>

      <!-- 统计信息 -->
      <section class="max-w-6xl mx-auto mb-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-3xl font-bold text-amber-600">{{ stats.total }}</div>
            <div class="text-stone-600">文物总数</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-3xl font-bold text-green-600">{{ stats.types }}</div>
            <div class="text-stone-600">乐器类型</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-3xl font-bold text-blue-600">先秦-清</div>
            <div class="text-stone-600">历史时代</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-3xl font-bold text-purple-600">{{ stats.relations }}</div>
            <div class="text-stone-600">关系总数</div>
          </div>
        </div>
      </section>

      <!-- 文物列表 -->
      <section class="max-w-6xl mx-auto">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">精选文物</h3>
        
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
          <p class="mt-4 text-stone-600">加载中...</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="artifact in artifacts"
            :key="artifact.record_id"
            class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
            @click="viewDetail(artifact.record_id)"
          >
            <h4 class="text-xl font-bold text-amber-900 mb-2">{{ artifact.器物名称 || '未命名文物' }}</h4>
            <div class="space-y-2 text-sm">
              <p class="text-stone-600">
                <span class="font-medium">类型：</span>{{ artifact.乐器类型 || '未知' }}
              </p>
              <p class="text-stone-600">
                <span class="font-medium">时代：</span>{{ artifact.时代 || '未知' }}
              </p>
              <p class="text-stone-600">
                <span class="font-medium">机构：</span>{{ artifact.机构 || '未知' }}
              </p>
            </div>
            
            <!-- 实体标签 -->
            <div v-if="artifact.标注部分?.entities" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="entity in artifact.标注部分.entities.slice(0, 5)"
                :key="entity.start"
                class="px-2 py-1 text-xs rounded"
                :class="getEntityClass(entity.label)"
              >
                {{ entity.text }}
              </span>
              <span v-if="artifact.标注部分.entities.length > 5" class="text-xs text-stone-500">
                +{{ artifact.标注部分.entities.length - 5 }}
              </span>
            </div>

            <!-- 关系数量 -->
            <div v-if="artifact.标注部分?.relations" class="mt-4 text-sm text-stone-500">
              {{ artifact.标注部分.relations.length }} 条关系
            </div>
          </div>
        </div>

        <div v-if="!loading && artifacts.length === 0" class="text-center py-12">
          <p class="text-stone-600">未找到符合条件的文物</p>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-stone-800 text-white py-8 mt-16">
      <div class="container mx-auto px-6 text-center">
        <p class="text-stone-400">
          基于NER+RE模型的知识图谱检索系统 | 数据来源：古代乐器考古资料
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArtifactStore } from '../stores/artifactStore'

const router = useRouter()
const store = useArtifactStore()

const searchQuery = ref('')
const selectedEra = ref('')
const selectedType = ref('')
const selectedDecoration = ref('')
const loading = ref(true)

const eras = ['商代', '西周', '春秋', '战国', '汉代', '唐代', '宋代', '元代', '明代', '清代']
const types = computed(() => {
  const typeSet = new Set()
  store.artifacts.forEach(a => {
    if (a.乐器类型) typeSet.add(a.乐器类型)
  })
  return Array.from(typeSet).sort()
})
const decorations = ['兽面纹', '云雷纹', '饕餮纹', '蝉纹', '龙纹', '凤纹']

const artifacts = computed(() => {
  let result = store.artifacts
  
  if (selectedEra.value) {
    result = result.filter(a => a.时代?.includes(selectedEra.value))
  }
  if (selectedType.value) {
    result = result.filter(a => a.乐器类型 === selectedType.value)
  }
  if (selectedDecoration.value) {
    result = result.filter(a => {
      const decs = store.getDecorations(a)
      return decs.includes(selectedDecoration.value)
    })
  }
  
  return result.slice(0, 12) // 只显示前12个
})

const stats = computed(() => {
  const typeSet = new Set()
  const eraSet = new Set()
  let totalRelations = 0
  
  store.artifacts.forEach(a => {
    if (a.乐器类型) typeSet.add(a.乐器类型)
    if (a.时代) eraSet.add(a.时代)
    if (a.标注部分?.relations) totalRelations += a.标注部分.relations.length
  })
  
  return {
    total: store.artifacts.length,
    types: typeSet.size,
    eras: eraSet.size,
    relations: totalRelations
  }
})

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
  if (searchQuery.value) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

function viewDetail(id) {
  router.push({ path: `/artifact/${id}` })
}

function applyFilters() {
  // 筛选已经通过computed属性自动应用
}

function resetFilters() {
  selectedEra.value = ''
  selectedType.value = ''
  selectedDecoration.value = ''
}

onMounted(() => {
  loading.value = false
})
</script>
