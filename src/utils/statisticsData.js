import { vocabularySearchText } from '../i18n'
import { englishRecordSearchText } from '../i18n/recordLabels'

export const INSTRUMENT_TREE = {
  name: '乐器',
  children: [
    {
      name: '体鸣乐器',
      children: [
        {
          name: '碰奏体鸣乐器',
          children: [
            { name: '铙' },
            { name: '钹' },
            { name: '板' }
          ]
        },
        {
          name: '敲奏体鸣乐器',
          children: [
            {
              name: '钟类',
              children: [
                { name: '钟' },
                { name: '甬钟' },
                { name: '钮钟' },
                { name: '扁钟' },
                { name: '圆钟' },
                { name: '梵钟' },
                { name: '镈' }
              ]
            },
            {
              name: '打击器类',
              children: [
                { name: '钲' },
                { name: '句鑃' },
                { name: '錞于' },
                { name: '铜鼓' },
                { name: '锣' },
                { name: '木鱼' }
              ]
            }
          ]
        },
        {
          name: '摇奏体鸣乐器',
          children: [
            { name: '铎' },
            { name: '铃' }
          ]
        }
      ]
    }
  ]
}

export const INSTRUMENT_LEAVES = [
  '铙', '钹', '板',
  '钟', '甬钟', '钮钟', '扁钟', '圆钟', '梵钟', '镈',
  '钲', '句鑃', '錞于', '铜鼓', '锣', '木鱼',
  '铎', '铃'
]

export const INSTRUMENT_COLOR = {
  乐器: '#7c2d12',
  体鸣乐器: '#b45309',
  碰奏体鸣乐器: '#2fbf6b',
  敲奏体鸣乐器: '#4f8edb',
  钟类: '#4f8edb',
  打击器类: '#e27f2d',
  摇奏体鸣乐器: '#9567d6',
  铙: '#2fbf6b',
  钹: '#3bc878',
  板: '#7fdb9b',
  钟: '#3d7fd1',
  甬钟: '#4f8edb',
  钮钟: '#72a7e2',
  扁钟: '#2f74c7',
  圆钟: '#2496b6',
  梵钟: '#8b6fd8',
  镈: '#a084e3',
  钲: '#e27f2d',
  句鑃: '#eb9648',
  錞于: '#dda62f',
  铜鼓: '#cf8f24',
  锣: '#dd5f55',
  木鱼: '#d24f69',
  铎: '#9567d6',
  铃: '#ba6bdc'
}

export const ERA_GROUPS = [
  { name: '新石器', aliases: ['新石器'] },
  { name: '商代', aliases: ['商代', '商', '商代早期', '商代中期', '商代晚期', '商晚期', '商代末期'] },
  { name: '西周', aliases: ['西周', '周', '西周早期', '西周中期', '西周晚期', '西周中晚期'] },
  { name: '春秋', aliases: ['东周', '春秋', '春秋早期', '春秋前期', '春秋中期', '春秋晚期', '春秋中晚期'] },
  { name: '战国', aliases: ['战国', '战国早期', '战国中期', '战国晚期', '战国至西汉'] },
  { name: '秦汉', aliases: ['秦', '秦汉', '汉', '西汉', '东汉', '新莽天凤四年（17）', '新莽', '汉魏', '西汉初期', '西汉前期', '西汉～六朝'] },
  { name: '南北朝', aliases: ['北朝', '南北朝', '东魏'] },
  { name: '隋唐', aliases: ['隋', '唐', '隋唐', '五代'] },
  { name: '宋代', aliases: ['宋', '北宋', '南宋', '辽', '金', '宋元'] },
  { name: '元代', aliases: ['元'] },
  { name: '明代', aliases: ['明', '明清', '明宣德年间'] },
  { name: '清代', aliases: ['清', '清末'] }
]

export const ERA_ORDER = ERA_GROUPS.map(item => item.name)

export const PREFIX_PROVINCE_MAP = {
  beijing: '北京',
  tianjin: '天津',
  hebei: '河北',
  shanxi: '山西',
  neimenggu: '内蒙古',
  shanghai: '上海',
  jiangsu: '江苏',
  shandong: '山东',
  henan: '河南',
  hubei: '湖北',
  hunan: '湖南',
  sichuan: '四川',
  shaanxi: '陕西',
  gansu: '甘肃',
  xinjiang: '新疆'
}

export const PROVINCE_NAMES = [
  '北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆','香港','澳门','台湾'
]

export const PROVINCE_TILE_LAYOUT = [
  { name:'新疆', x:0, y:2 }, { name:'西藏', x:1, y:4 }, { name:'青海', x:2, y:3 }, { name:'甘肃', x:3, y:2 }, { name:'宁夏', x:4, y:2 },
  { name:'内蒙古', x:5, y:1 }, { name:'黑龙江', x:8, y:0 }, { name:'吉林', x:8, y:1 }, { name:'辽宁', x:7, y:2 },
  { name:'北京', x:6, y:2 }, { name:'天津', x:7, y:3 }, { name:'河北', x:6, y:3 }, { name:'山西', x:5, y:3 }, { name:'陕西', x:4, y:4 },
  { name:'山东', x:7, y:4 }, { name:'河南', x:5, y:4 }, { name:'江苏', x:7, y:5 }, { name:'上海', x:8, y:5 }, { name:'安徽', x:6, y:5 },
  { name:'湖北', x:5, y:5 }, { name:'四川', x:3, y:5 }, { name:'重庆', x:4, y:5 }, { name:'浙江', x:7, y:6 }, { name:'江西', x:6, y:6 },
  { name:'湖南', x:5, y:6 }, { name:'贵州', x:4, y:6 }, { name:'福建', x:7, y:7 }, { name:'广东', x:6, y:7 }, { name:'广西', x:5, y:7 },
  { name:'云南', x:3, y:7 }, { name:'海南', x:6, y:8 }, { name:'香港', x:7, y:8 }, { name:'澳门', x:5, y:8 }, { name:'台湾', x:8, y:7 }
]

const PROVINCE_ALIASES = {
  北京: ['北京', '北京市'],
  天津: ['天津', '天津市'],
  河北: ['河北', '冀', '邯郸', '涉县', '易县', '平山'],
  山西: ['山西', '晋', '侯马', '曲沃', '太原'],
  内蒙古: ['内蒙古', '呼和浩特', '包头', '赤峰'],
  辽宁: ['辽宁', '沈阳', '辽阳'],
  吉林: ['吉林', '长春'],
  黑龙江: ['黑龙江', '哈尔滨'],
  上海: ['上海', '上海市'],
  江苏: ['江苏', '南京', '镇江', '丹徒', '邳州', '徐州', '苏州', '扬州'],
  浙江: ['浙江', '杭州', '绍兴'],
  安徽: ['安徽', '寿县', '淮南', '合肥'],
  福建: ['福建', '福州', '泉州'],
  江西: ['江西', '南昌'],
  山东: ['山东', '青州', '沂源', '淄博', '临淄', '海阳', '沂水'],
  河南: ['河南', '陕县', '洛阳', '郑州', '辉县', '邓县'],
  湖北: ['湖北', '荆州', '江陵', '武昌', '钟祥', '通山', '恩施', '长阳', '随州'],
  湖南: ['湖南', '长沙', '宁乡', '望城', '溆浦', '泸溪'],
  广东: ['广东', '广州'],
  广西: ['广西', '桂林', '南宁'],
  海南: ['海南'],
  重庆: ['重庆', '涪陵'],
  四川: ['四川', '成都', '广汉', '彭县'],
  贵州: ['贵州', '贵阳'],
  云南: ['云南', '昆明'],
  西藏: ['西藏', '拉萨'],
  陕西: ['陕西', '宝鸡', '扶风', '眉县', '周原', '西安'],
  甘肃: ['甘肃', '兰州'],
  青海: ['青海', '西宁'],
  宁夏: ['宁夏', '银川'],
  新疆: ['新疆', '吉木萨尔', '北庭'],
  香港: ['香港'],
  澳门: ['澳门'],
  台湾: ['台湾', '台北']
}

export function normalizeProvinceName(raw = '') {
  const value = String(raw || '').trim()
  if (!value) return ''
  const direct = PROVINCE_NAMES.find(name => value === name || value.includes(name))
  if (direct) return direct
  for (const [province, aliases] of Object.entries(PROVINCE_ALIASES)) {
    if (aliases.some(alias => value.includes(alias))) return province
  }
  return value.replace(/省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/g, '')
}

export function getArtifactProvince(artifact) {
  const prefix = String(artifact?.record_id || '').split('_')[0]
  if (PREFIX_PROVINCE_MAP[prefix]) return PREFIX_PROVINCE_MAP[prefix]

  const fields = [artifact?.出土地点, artifact?.机构, artifact?.原藏机构, artifact?.标注部分?.text]
    .filter(Boolean)
    .join(' ')
  for (const [province, aliases] of Object.entries(PROVINCE_ALIASES)) {
    if (aliases.some(alias => fields.includes(alias))) return province
  }
  return '未知'
}

export function getNormalizedType(raw = '') {
  const value = String(raw || '').trim()
  if (!value) return '未知'
  if (INSTRUMENT_LEAVES.includes(value)) return value
  if (value.includes('甬钟')) return '甬钟'
  if (value.includes('钮钟')) return '钮钟'
  if (value.includes('扁钟')) return '扁钟'
  if (value.includes('圆钟')) return '圆钟'
  if (value.includes('梵钟')) return '梵钟'
  if (value.includes('铜鼓')) return '铜鼓'
  if (value.includes('錞')) return '錞于'
  if (value.includes('句鑃')) return '句鑃'
  if (value.includes('镈')) return '镈'
  if (value.includes('铙')) return '铙'
  if (value.includes('钹')) return '钹'
  if (value.includes('钲')) return '钲'
  if (value.includes('锣')) return '锣'
  if (value.includes('木鱼')) return '木鱼'
  if (value.includes('铎') || value.includes('鐸')) return '铎'
  if (value.includes('铃') || value.includes('鈴')) return '铃'
  if (value.includes('板')) return '板'
  if (value.includes('钟')) return '钟'
  return value
}

export function getArtifactPrimaryType(artifact = {}) {
  const name = String(artifact?.器物名称 || '')
  const rawType = String(artifact?.乐器类型 || '')
  const text = `${name} ${rawType}`

  // 铎、铃在原始数据中经常被写进器物名称，而乐器类型字段仍标为钲、钹或钮钟。
  // 为了让“摇奏体鸣乐器”在层级饼图、分布图和共现图中被正确呈现，这里优先识别名称中的铎/铃。
  if (/[铎鐸]/.test(text)) return '铎'
  if (/[铃鈴]/.test(text)) return '铃'

  return getNormalizedType(rawType)
}

export function getTypeMajorGroup(type) {
  const normalized = getNormalizedType(type)
  if (['铙', '钹', '板'].includes(normalized)) return '碰奏体鸣乐器'
  if (['钟', '甬钟', '钮钟', '扁钟', '圆钟', '梵钟', '镈'].includes(normalized)) return '钟类'
  if (['钲', '句鑃', '錞于', '铜鼓', '锣', '木鱼'].includes(normalized)) return '打击器类'
  if (['铎', '铃'].includes(normalized)) return '摇奏体鸣乐器'
  return '其他'
}

export function parseQuantity(value) {
  const text = String(value ?? '').trim()
  if (!text || text === '-' || text === '未知') return 1
  const nums = text.match(/\d+(?:\.\d+)?/g)
  if (!nums) return 1
  const total = nums.map(Number).filter(Number.isFinite).reduce((sum, n) => sum + n, 0)
  return total > 0 ? total : 1
}

export function normalizeEraGroup(raw = '') {
  const s = String(raw || '').trim()
  if (!s) return '未知'
  if (s.includes('新石器')) return '新石器'
  if (s.includes('明清') || s.includes('明宣德') || s.includes('明')) return '明代'
  if (s.includes('清')) return '清代'
  if (s.includes('宋') || s.includes('辽') || s.includes('金')) return '宋代'
  if (s.includes('元')) return '元代'
  if (s.includes('隋') || s.includes('唐') || s.includes('五代')) return '隋唐'
  if (s.includes('北朝') || s.includes('南北朝') || s.includes('东魏')) return '南北朝'
  if (s.includes('秦汉') || s.includes('新莽') || s.includes('西汉') || s.includes('东汉') || s.includes('汉') || s === '秦' || s.includes('汉魏') || s.includes('六朝')) return '秦汉'
  if (s.includes('战国')) return '战国'
  if (s.includes('东周') || s.includes('春秋')) return '春秋'
  if (s.includes('西周') || s === '周') return '西周'
  if (s.includes('商')) return '商代'

  for (const group of ERA_GROUPS) {
    if (group.aliases.some(alias => s.includes(alias) || alias.includes(s))) return group.name
  }
  return s
}

export function eraIndex(era) {
  const index = ERA_ORDER.indexOf(era)
  return index === -1 ? ERA_ORDER.length + 1 : index
}

export function cloneTreeWithCounts(artifacts) {
  const counts = new Map()
  artifacts.forEach(artifact => {
    const type = getArtifactPrimaryType(artifact)
    counts.set(type, (counts.get(type) || 0) + 1)
  })

  function clone(node) {
    const next = { name: node.name }
    if (node.children) {
      next.children = node.children.map(clone)
    } else {
      next.count = counts.get(node.name) || 0
    }
    return next
  }
  return clone(INSTRUMENT_TREE)
}

function summarizeEraArtifacts(artifacts) {
  const map = new Map(ERA_ORDER.map(name => [name, { era: name, records: 0, quantity: 0, types: new Set(), typeQuantities: new Map() }]))

  artifacts.forEach(artifact => {
    const era = normalizeEraGroup(artifact.时代)
    if (!map.has(era)) map.set(era, { era, records: 0, quantity: 0, types: new Set(), typeQuantities: new Map() })
    const row = map.get(era)
    const type = getArtifactPrimaryType(artifact)
    const quantity = parseQuantity(artifact.数量)
    row.records += 1
    row.quantity += quantity
    if (type && type !== '未知') {
      row.types.add(type)
      row.typeQuantities.set(type, (row.typeQuantities.get(type) || 0) + quantity)
    }
  })

  return Array.from(map.values())
    .filter(row => row.records > 0 || row.quantity > 0)
    .sort((a, b) => eraIndex(a.era) - eraIndex(b.era))
}


export function buildEraEvolutionData(artifacts) {
  const rows = summarizeEraArtifacts(artifacts)
  const typeSet = new Set()
  rows.forEach(row => row.typeQuantities.forEach((value, key) => {
    if (value > 0) typeSet.add(key)
  }))
  const types = INSTRUMENT_LEAVES.filter(type => typeSet.has(type))
  const data = rows.map(row => {
    const item = { era: row.era, total: row.quantity }
    types.forEach(type => {
      item[type] = row.typeQuantities.get(type) || 0
    })
    return item
  })
  return { eras: data.map(d => d.era), types, data }
}

function topCounts(items, limit = 999) {
  const counter = new Map()
  items.filter(Boolean).forEach(item => counter.set(item, (counter.get(item) || 0) + 1))
  return Array.from(counter, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh'))
    .slice(0, limit)
}

export function buildProvinceStats(artifacts) {
  const map = new Map()
  artifacts.forEach(artifact => {
    const province = getArtifactProvince(artifact)
    if (!map.has(province)) {
      map.set(province, {
        province,
        records: 0,
        totalCount: 0,
        typeSet: new Set(),
        typesRaw: [],
        erasRaw: [],
        institutionsRaw: [],
        locationsRaw: [],
        musicRecords: []
      })
    }
    const row = map.get(province)
    const type = getArtifactPrimaryType(artifact)
    row.records += 1
    row.totalCount += parseQuantity(artifact.数量)
    if (type && type !== '未知') row.typeSet.add(type)
    row.typesRaw.push(type)
    row.erasRaw.push(normalizeEraGroup(artifact.时代))
    if (artifact.机构) row.institutionsRaw.push(artifact.机构)
    if (artifact.出土地点) row.locationsRaw.push(artifact.出土地点)
    if (artifact.音乐性能 && String(artifact.音乐性能).trim()) {
      row.musicRecords.push({
        name: artifact.器物名称 || artifact.record_id,
        type,
        text: String(artifact.音乐性能).trim()
      })
    }
  })

  return Array.from(map.values()).map(row => ({
    ...row,
    typeCount: row.typeSet.size,
    mainTypes: topCounts(row.typesRaw, 999),
    institutions: topCounts(row.institutionsRaw, 999),
    eraDistribution: topCounts(row.erasRaw, 999),
    locations: topCounts(row.locationsRaw, 999),
    musicRecords: row.musicRecords.slice(0, 4)
  }))
}

export function buildProvinceTypeMatrix(artifacts) {
  const provinceMap = new Map()
  const typeSet = new Set()

  artifacts.forEach(artifact => {
    const province = getArtifactProvince(artifact)
    const type = getArtifactPrimaryType(artifact)
    if (!province || province === '未知' || !type || type === '未知') return
    typeSet.add(type)
    if (!provinceMap.has(province)) provinceMap.set(province, new Map())
    const row = provinceMap.get(province)
    row.set(type, (row.get(type) || 0) + 1)
  })

  const typeOrder = INSTRUMENT_LEAVES.filter(type => typeSet.has(type))
  const provinces = Array.from(provinceMap.keys()).sort((a, b) => {
    const at = PROVINCE_TILE_LAYOUT.find(p => p.name === a)
    const bt = PROVINCE_TILE_LAYOUT.find(p => p.name === b)
    if (at && bt) return at.y - bt.y || at.x - bt.x
    return a.localeCompare(b, 'zh')
  })

  const cells = []
  provinces.forEach(province => {
    typeOrder.forEach(type => {
      cells.push({ province, type, count: provinceMap.get(province)?.get(type) || 0 })
    })
  })

  return { provinces, types: typeOrder, cells }
}

function cleanLocation(location = '') {
  return String(location || '')
    .replace(/\s+/g, '')
    .replace(/[，。；;].*$/g, '')
    .replace(/\d+号.*$/g, '')
    .replace(/第[一二三四五六七八九十0-9]+.*$/g, '')
    .trim()
}

export function buildCooccurrenceData(artifacts) {
  const groups = new Map()

  artifacts.forEach(artifact => {
    const type = getArtifactPrimaryType(artifact)
    if (!type || type === '未知') return
    const location = cleanLocation(artifact.出土地点)
    if (!location || location.includes('未详') || location === '-') return
    const era = normalizeEraGroup(artifact.时代)
    const institution = artifact.机构 || artifact.原藏机构 || ''
    const key = `地点|${location}`
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        location,
        era,
        institution,
        artifacts: [],
        types: new Set()
      })
    }
    const group = groups.get(key)
    group.artifacts.push(artifact)
    group.types.add(type)
  })

  const pairMap = new Map()
  groups.forEach(group => {
    const types = Array.from(group.types).sort((a, b) => INSTRUMENT_LEAVES.indexOf(a) - INSTRUMENT_LEAVES.indexOf(b))
    if (types.length < 2) return
    for (let i = 0; i < types.length; i += 1) {
      for (let j = i + 1; j < types.length; j += 1) {
        const source = types[i]
        const target = types[j]
        const pairKey = `${source}__${target}`
        if (!pairMap.has(pairKey)) {
          pairMap.set(pairKey, { source, target, count: 0, recordCount: 0, examples: [] })
        }
        const pair = pairMap.get(pairKey)
        pair.count += 1
        pair.recordCount += group.artifacts.length
        if (pair.examples.length < 4) {
          pair.examples.push({
            location: group.location,
            era: group.era,
            institution: group.institution,
            types,
            artifacts: group.artifacts.slice(0, 5).map(item => item.器物名称 || item.record_id)
          })
        }
      }
    }
  })

  const links = Array.from(pairMap.values())
    .sort((a, b) => b.count - a.count || b.recordCount - a.recordCount)
    .slice(0, 24)

  const nodeSet = new Set()
  links.forEach(link => {
    nodeSet.add(link.source)
    nodeSet.add(link.target)
  })
  const nodes = Array.from(nodeSet).map(id => ({
    id,
    group: getTypeMajorGroup(id),
    color: INSTRUMENT_COLOR[id] || '#92400e',
    degree: links.filter(link => link.source === id || link.target === id).reduce((sum, link) => sum + link.count, 0)
  }))

  return { nodes, links, pairs: links }
}

export function searchArtifactText(artifact) {
  return [
    artifact.record_id,
    artifact.器物名称,
    artifact.乐器类型,
    artifact.时代,
    normalizeEraGroup(artifact.时代),
    artifact.机构,
    artifact.编号,
    artifact.出土时间,
    artifact.出土地点,
    artifact.原藏机构,
    artifact.文献,
    artifact.音乐性能,
    artifact.标注部分?.text,
    getArtifactProvince(artifact),
    englishRecordSearchText(artifact),
    vocabularySearchText([
      getArtifactPrimaryType(artifact),
      getTypeMajorGroup(getArtifactPrimaryType(artifact)),
      normalizeEraGroup(artifact.时代),
      getArtifactProvince(artifact),
      ...(artifact.标注部分?.entities || []).filter(entity => entity.label === '纹饰').map(entity => entity.text)
    ])
  ].filter(Boolean).join(' ').toLowerCase()
}
