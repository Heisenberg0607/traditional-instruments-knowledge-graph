import englishRecords from './english-records.json'
import englishAnnotations from './english-annotations.json'

export function englishRecordLabel(source, kind) {
  return englishRecords[kind]?.[source] || source
}

export function englishRecordSearchText(artifact) {
  return [
    englishRecordLabel(artifact.器物名称, 'artifact'),
    englishRecordLabel(artifact.机构, 'institution'),
    englishRecordLabel(artifact.原藏机构, 'institution'),
    englishRecordLabel(artifact.出土地点, 'site'),
    englishAnnotations.period[artifact.时代],
    ...(artifact.标注部分?.entities || []).map(entity => {
      if (entity.label === '出土地点') return englishRecordLabel(entity.text, 'site')
      if (entity.label === '机构') return englishRecordLabel(entity.text, 'institution')
      const kind = { 乐器部件: 'part', 数据属性: 'attribute', 纹饰: 'decoration' }[entity.label]
      return englishAnnotations[kind]?.[entity.text]
    })
  ].filter(Boolean).join(' ').toLowerCase()
}
