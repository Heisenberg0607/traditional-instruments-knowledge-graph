<template>
  <header class="bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-lg">
    <div class="container mx-auto px-6 py-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <router-link to="/" class="text-2xl font-bold hover:text-amber-100 transition-colors">{{ t("🔔 文物知识图谱检索系统") }}</router-link>

        <nav class="flex flex-wrap items-center gap-4 text-sm font-medium">
          <router-link to="/" class="nav-link" exact-active-class="nav-link-active">{{ t("首页") }}</router-link>
          <router-link to="/about" class="nav-link" active-class="nav-link-active">{{ t("关于") }}</router-link>
          <router-link to="/statistics" class="nav-link" active-class="nav-link-active">{{ t("统计分析") }}</router-link>
          <label class="flex items-center gap-2">
            <span>{{ t('语言') }}</span>
            <select :value="locale" @change="setLocale($event.target.value)" :aria-label="t('语言')" class="rounded border border-amber-300 bg-amber-950 px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-amber-300">
              <option value="zh-CN" lang="zh-CN">中文</option>
              <option value="en" lang="en">English</option>
              <option value="ko" lang="ko">한국어</option>
            </select>
          </label>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  @apply hover:text-amber-200 transition-colors pb-1;
}

.nav-link-active {
  @apply text-amber-300 font-semibold border-b border-amber-300;
}
</style>

<script setup>
import { useI18n } from '../i18n'
const { t, locale, setLocale } = useI18n()
</script>
