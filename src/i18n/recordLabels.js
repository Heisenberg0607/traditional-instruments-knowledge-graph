import englishRecords from './english-records.json'

export function englishRecordLabel(source, kind) {
  return englishRecords[kind]?.[source] || source
}

export function englishRecordSearchText(artifact) {
  return [
    englishRecordLabel(artifact.器物名称, 'artifact'),
    englishRecordLabel(artifact.机构, 'institution'),
    englishRecordLabel(artifact.原藏机构, 'institution'),
    englishRecordLabel(artifact.出土地点, 'site'),
    ...(artifact.标注部分?.entities || []).filter(entity => entity.label === '出土地点').map(entity => englishRecordLabel(entity.text, 'site'))
  ].filter(Boolean).join(' ').toLowerCase()
}
