import { defineStore } from 'pinia'
import { ref } from 'vue'
import artifactsData from '../data/artifacts.json'

export const useArtifactStore = defineStore('artifacts', () => {
  const artifacts = ref(artifactsData)

  function getDecorations(artifact) {
    if (!artifact.标注部分?.entities) return []
    return artifact.标注部分.entities
      .filter(entity => entity.label === '纹饰')
      .map(entity => entity.text)
  }

  function getParts(artifact) {
    if (!artifact.标注部分?.entities) return []
    return artifact.标注部分.entities
      .filter(entity => entity.label === '乐器部件')
      .map(entity => entity.text)
  }

  function calculateSimilarity(artifact1, artifact2) {
    const parts1 = getParts(artifact1)
    const parts2 = getParts(artifact2)
    const decs1 = getDecorations(artifact1)
    const decs2 = getDecorations(artifact2)

    const jaccard = (left, right) => {
      const intersection = left.filter(item => right.includes(item))
      const union = [...new Set([...left, ...right])]
      return union.length > 0 ? intersection.length / union.length : 0
    }

    const dynastyOrder = ['商代', '西周', '春秋', '战国', '汉代', '唐代', '宋代', '元代', '明代', '清代']

    const eraScore = () => {
      const index1 = dynastyOrder.findIndex(era => artifact1.时代?.includes(era))
      const index2 = dynastyOrder.findIndex(era => artifact2.时代?.includes(era))
      if (index1 === -1 || index2 === -1) return 0
      return Math.max(0, 1 - Math.abs(index1 - index2) / 10)
    }

    const structure = jaccard(parts1, parts2)
    const decoration = jaccard(decs1, decs2)
    const era = eraScore()

    return {
      structure,
      decoration,
      era,
      total: structure * 0.4 + decoration * 0.4 + era * 0.2
    }
  }

  function getSimilarArtifacts(artifact, limit = 5) {
    return artifacts.value
      .filter(item => item.record_id !== artifact.record_id)
      .map(item => ({
        artifact: item,
        score: calculateSimilarity(artifact, item)
      }))
      .filter(item => item.score.total > 0.1)
      .sort((a, b) => b.score.total - a.score.total)
      .slice(0, limit)
  }

  function getArtifactById(id) {
    return artifacts.value.find(item => item.record_id === id)
  }

  return {
    artifacts,
    getDecorations,
    getParts,
    calculateSimilarity,
    getSimilarArtifacts,
    getArtifactById
  }
})
