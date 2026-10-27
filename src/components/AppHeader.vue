<template>
  <header class="bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-lg">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="text-2xl font-bold hover:text-amber-100 transition-colors">
          🔔 文物知识图谱检索系统
        </router-link>

        <nav class="flex items-center gap-6 text-sm font-medium">
          <router-link to="/" class="nav-link" exact-active-class="nav-link-active">
            首页
          </router-link>
          <router-link to="/about" class="nav-link" active-class="nav-link-active">
            关于
          </router-link>
          <router-link to="/statistics" class="nav-link" active-class="nav-link-active">
            统计分析
          </router-link>
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
