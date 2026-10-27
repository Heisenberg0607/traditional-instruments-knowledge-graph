<template>
  <div class="min-h-screen">
    <main class="container mx-auto px-6 py-16 max-w-3xl">
      <h2 class="text-3xl font-bold text-amber-900 mb-8">关于本系统</h2>

      <div class="bg-white rounded-xl shadow-md p-8 space-y-8 text-stone-700 leading-relaxed">
        <section>
          <h3 class="text-xl font-bold text-amber-800 mb-3">项目简介</h3>
          <p>
            本系统基于 NER+RE 模型对古代乐器文物进行自动标注，构建文物知识图谱，
            支持语义检索、相似推荐与多维统计分析。
          </p>
        </section>

        <section>
          <h3 class="text-xl font-bold text-amber-800 mb-3">数据说明</h3>
          <p>
            数据依据《中国音乐文物大系》相关文献整理。当前演示读取本地 JSON，共包含
            <strong class="text-amber-900">{{ total }}</strong> 条文物记录，
            涵盖 <strong class="text-amber-900">{{ types }}</strong> 种乐器类型。
          </p>
        </section>

        <section>
          <h3 class="text-xl font-bold text-amber-800 mb-3">技术栈</h3>
          <ul class="list-disc list-inside space-y-1 text-stone-600">
            <li>前端框架：Vue 3 + Composition API</li>
            <li>构建工具：Vite</li>
            <li>状态管理：Pinia</li>
            <li>数据可视化：D3.js</li>
            <li>关键词检索：自定义字符串匹配</li>
            <li>样式方案：Tailwind CSS</li>
          </ul>
        </section>
      </div>

      <router-link to="/" class="inline-block mt-8 text-amber-700 hover:text-amber-900 transition-colors">
        ← 返回首页
      </router-link>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useArtifactStore } from '../stores/artifactStore'

const store = useArtifactStore()

const total = computed(() => store.artifacts.length)
const types = computed(() => new Set(store.artifacts.map(a => a.乐器类型).filter(Boolean)).size)
const eras  = computed(() => new Set(store.artifacts.map(a => a.时代).filter(Boolean)).size)
</script>

