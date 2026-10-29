import fs from 'node:fs'
import { pinyin } from 'pinyin-pro'

// Build-time transliteration keeps the pronunciation dictionary out of the
// browser bundle. Edit these overrides when a historical name needs review.
const artifacts = JSON.parse(fs.readFileSync(new URL('../src/data/artifacts.json', import.meta.url), 'utf8'))
const romanize = text => {
  const result = pinyin(text, { toneType: 'none', type: 'array', nonZh: 'consecutive' }).join('')
  return result.charAt(0).toUpperCase() + result.slice(1)
}
const places = `北京 天津 河北 山西 内蒙古 辽宁 吉林 黑龙江 上海 江苏 浙江 安徽 福建 江西 山东 河南 湖北 湖南 广东 广西 海南 重庆 四川 贵州 云南 西藏 陕西 甘肃 青海 宁夏 新疆 香港 澳门 台湾 中国 青州 沂源 惠民 海阳 济南 烟台 长岛 临沂 滕州 青岛 阳信 诸城 曲阜 郯城 淄博 莒南 章丘 沂水 临淄 长清 龙口 苍山 牟平 长沙 宁乡 益阳 岳阳 株洲 衡阳 衡南 耒阳 桃江 永州 衡山 平江 湘西 石门 慈利 南岳 张家界 永定 凤凰 临湘 呼和浩特 喀喇沁 奈曼 巴林左 赤峰 土默特右 邯郸 承德 荆州 武昌 通山 孝感 通城 武穴 随州 武汉 恩施 鄂州 长阳 秭归 崇阳 涸水 咸丰 利川 五峰 巴东 建始 鹤峰 来凤 宜城 宣恩 枝城 襄阳 钟祥 沙市 襄樊 武当山 西安 宝鸡 扶风 眉县 咸阳 铜川 礼泉 扶风 洛阳 郑州 新郑 辉县 三门峡 平顶山 安阳 南京 镇江 徐州 苏州 扬州 邳州 东海 溧阳 吴江 成都 广汉 彭县 茂县 酉阳 涪陵 绵竹 德阳 万县 重庆 周原 齐鲁 邺城 京都 日本`.split(/\s+/)
const geographic = Object.fromEntries(places.map(name => [name, romanize(name)]))
Object.assign(geographic, { 陕西: 'Shaanxi', 山西: 'Shanxi', 中国: 'China', 内蒙古: 'Inner Mongolia', 香港: 'Hong Kong', 澳门: 'Macao', 西藏: 'Tibet', 日本: 'Japan', 京都: 'Kyoto' })
const properNames = {
  曾侯乙: 'Zeng Hou Yi', 曾侯: 'Zeng Hou', 曾伯: 'Zeng Bo', 单伯: 'Shan Bo', 召伯: 'Shao Bo', 刘家店子: 'Liujiadianzi', 苏埠屯: 'Subutun',
  院东头: 'Yuandongtou', 嘴子前: 'Zuiziqian', 西古现: 'Xiguxian', 小峨眉山: 'Xiao Emeishan',
  齐国: 'Qi State', 孔子: 'Confucius', 孔庙: 'Confucian Temple', 故宫: 'Palace',
  大成殿: 'Dacheng Hall', 大召寺: 'Dazhao Temple', 普宁寺: 'Puning Temple',
  泉屋博古馆: 'Sen-oku Hakukokan Museum', 土家族苗族自治州: 'Tujia and Miao Autonomous Prefecture',
  阿坝藏族羌族自治州: 'Aba Tibetan and Qiang Autonomous Prefecture',
  阿坝羌族自治州: 'Aba Qiang Autonomous Prefecture', 茂县: 'Mao County',
  土家族: 'Tujia', 苗族: 'Miao', 羌族: 'Qiang', 藏族: 'Tibetan', 自治州: 'Autonomous Prefecture', 自治县: 'Autonomous County',
  省: 'Province', 市: 'City', 县: 'County', 区: 'District', 旗: 'Banner', 乡: 'Township', 镇: 'Town', 村: 'Village', 岛: 'Island'
}
const instruments = {
  编钟: 'Chime Bells', 编铙: 'Nao Bell Set', 编镈: 'Bo Bell Set', 编磬: 'Chime Stone Set',
  甬钟: 'Yongzhong Bell', 钮钟: 'Niuzhong Bell', 铃钟: 'Ling Bell', 梵钟: 'Temple Bell',
  扁钟: 'Flattened Bell', 圆钟: 'Round Bell', 镈于: 'Chunyu Bell', 錞于: 'Chunyu Bell',
  编勾鑃: 'Goudiao Bell Set', 句鑃: 'Goudiao Bell', 勾鑃: 'Goudiao Bell', 铜鼓: 'Bronze Drum', 木鱼: 'Wooden Fish', 石磬: 'Stone Chime',
  铜扁鼓: 'Bronze Flat Drum', 镜: 'Mirror', 鼓棒: 'Drumstick',
  铜钟: 'Bronze Bell', 铁钟: 'Iron Bell', 铜铃: 'Bronze Small Bell', 铜铎: 'Bronze Duo Bell',
  钟: 'Bell', 鐘: 'Bell', 铙: 'Nao Bell', 鐃: 'Nao Bell', 钲: 'Zheng Bell', 鉦: 'Zheng Bell',
  镈: 'Bo Bell', 鎛: 'Bo Bell', 铎: 'Duo Bell', 鐸: 'Duo Bell', 铃: 'Small Bell', 鈴: 'Small Bell',
  钹: 'Cymbals', 锣: 'Gong', 磬: 'Chime Stone', 鼓: 'Drum', 板: 'Clapper',
  钮: 'Knob', 纽: 'Knob', 柄: 'Handle', 甬: 'Stem', 口: 'Mouth', 足: 'Foot',
  兽面纹: 'Animal-Mask Motif', 饕餮纹: 'Taotie Motif', 云雷纹: 'Cloud-and-Thunder Motif',
  蟠螭纹: 'Coiled-Dragon Motif', 龙纹: 'Dragon Motif', 凤纹: 'Phoenix Motif',
  弦纹: 'String Motif', 雷纹: 'Thunder Motif', 云纹: 'Cloud Motif', 素面: 'Undecorated',
  虎钮: 'Tiger Knob', 龙钮: 'Dragon Knob', 双鸟: 'Paired Birds', 龙凤纹: 'Dragon-and-Phoenix Motif',
  八棱: 'Eight-Ribbed', 直柄: 'Straight Handle', 棱柄: 'Ribbed Handle',
  蟠虺纹: 'Coiled-Serpent Motif', 夔龙纹: 'Kui-Dragon Motif', 夔纹: 'Kui Motif',
  蝉纹: 'Cicada Motif', 鸟纹: 'Bird Motif', 鱼纹: 'Fish Motif',
  垂叶纹: 'Hanging-Leaf Motif', 垂叶: 'Hanging Leaf', 八宝纹: 'Eight-Treasures Motif',
  乳钉纹: 'Boss Motif', 乳钉: 'Boss', 螺旋纹: 'Spiral Motif',
  仿木: 'Imitation Wood', 镂空: 'Openwork', 错金: 'Gold-Inlaid', 错银: 'Silver-Inlaid'
}
const context = {
  遗址博物馆: 'Site Museum', 文物考古研究所: 'Institute of Cultural Relics and Archaeology',
  文物保护研究所: 'Institute for Cultural Relics Conservation', 文物研究所: 'Institute of Cultural Relics',
  考古研究所: 'Institute of Archaeology', 文物管理委员会: 'Cultural Relics Administration Committee',
  文物管理所: 'Cultural Relics Administration Office', 文物管理处: 'Cultural Relics Administration Office',
  文物管理站: 'Cultural Relics Administration Station', 文管所: 'Cultural Relics Administration Office',
  文管处: 'Cultural Relics Administration Office', 文物工作队: 'Cultural Relics Team',
  考古工作队: 'Archaeological Team', 文物陈列室: 'Cultural Relics Exhibition Room',
  文物商店: 'Cultural Relics Store', 博物馆: 'Museum', 博物院: 'Museum',
  纪念馆: 'Memorial Museum', 历史系: 'Department of History', 陈列室: 'Exhibition Room',
  社会科学院: 'Academy of Social Sciences', 科学院: 'Academy of Sciences',
  管理委员会: 'Administration Committee', 公安局: 'Public Security Bureau',
  文化局: 'Bureau of Culture', 文化馆: 'Cultural Center', 大学: 'University',
  旧藏: 'Former Collection', 原藏: 'Formerly Held by', 转交: 'Transferred to', 今不存: 'No Longer Extant',
  墓葬: 'Burial', 墓地: 'Cemetery', 遗址: 'Site', 故城: 'Ancient City', 石棺墓: 'Stone-Coffin Tomb', 陪葬坑: 'Burial Pit',
  寺: 'Temple', 宫: 'Palace', 殿: 'Hall', 王府: 'Princely Residence',
  商代: 'Shang Dynasty', 西周: 'Western Zhou', 春秋: 'Spring and Autumn Period', 战国: 'Warring States Period',
  西汉: 'Western Han', 东汉: 'Eastern Han', 汉初: 'Early Han', 汉代: 'Han Dynasty',
  唐代: 'Tang Dynasty', 宋代: 'Song Dynasty', 元代: 'Yuan Dynasty', 明代: 'Ming Dynasty', 清代: 'Qing Dynasty',
  王墓: 'Royal Tomb', 石墓: 'Stone Tomb', 号墓: 'Tomb', 号: 'No.', 第: 'No.', 墓: 'Tomb',
  出土: 'Excavated', 采集: 'Collected', 发掘: 'Excavation', 东北部: 'Northeastern Area',
  西北: 'Northwest', 东北: 'Northeast', 西南: 'Southwest', 东南: 'Southeast',
  北侧: 'North Side', 南侧: 'South Side', 东侧: 'East Side', 西侧: 'West Side',
  北坡: 'North Slope', 南坡: 'South Slope', 东坡: 'East Slope', 西坡: 'West Slope',
  取土场: 'Earth Extraction Area', 建筑工地: 'Construction Site', 工地: 'Construction Site',
  水库: 'Reservoir', 博物馆藏: 'Museum Collection',
  米: 'm', 千米: 'km'
}

function termsFor(kind) {
  const result = { ...geographic, ...properNames, ...context, ...(kind === 'artifact' ? instruments : {}) }
  if (kind === 'institution') {
    result.省 = 'Provincial'
    result.市 = 'Municipal'
    // A bare province name is a proper name, e.g. Shanghai Museum.
  }
  return Object.entries(result).sort(([a], [b]) => b.length - a.length)
}
const lexicons = Object.fromEntries(['artifact', 'institution', 'site'].map(kind => [kind, termsFor(kind)]))
const overrides = {
  institution: {
    故宫博物院: 'Palace Museum', 中国历史博物馆: 'National Museum of Chinese History',
    中国人民革命军事博物馆: "Military Museum of the Chinese People's Revolution",
    山东省文物考古研究所: 'Shandong Provincial Institute of Cultural Relics and Archaeology',
    齐国故城遗址博物馆: 'Museum of the Ancient City of Qi State'
  },
  artifact: {}, site: {}
}

function translate(source, kind) {
  if (!/\p{Script=Han}/u.test(source) || ['未知', '无', '不详', '未详'].includes(source)) return source
  if (overrides[kind][source]) return overrides[kind][source]
  const input = source.replace(/第?\s*(\d+)\s*号(?:(商代|西周|春秋|战国|汉代|唐代|宋代|元代|明代|清代))?(墓)?/g,
    (_, number, period, tomb) => ` ${period ? context[period] + ' ' : ''}${tomb ? 'Tomb ' : ''}No. ${number} `)
  const entries = lexicons[kind]
  const tokens = []
  let pending = ''
  const flush = () => { if (pending) { tokens.push(romanize(pending)); pending = '' } }
  for (let i = 0; i < input.length;) {
    const match = entries.find(([term]) => input.startsWith(term, i))
    if (match) { flush(); tokens.push(match[1]); i += match[0].length }
    else if (/\p{Script=Han}/u.test(input[i])) { pending += input[i++]; }
    else {
      flush()
      const run = input.slice(i).match(/^[^\p{Script=Han}]+/u)[0]
      tokens.push(run.replace(/[、，；;]/g, '; ').replace(/[（]/g, '(').replace(/[）]/g, ')'))
      i += run.length
    }
  }
  flush()
  return tokens.join(' ').replace(/\s+/g, ' ').replace(/\s+([,;.)])/g, '$1').replace(/\(\s+/g, '(').trim()
}

const catalog = { artifact: {}, institution: {}, site: {} }
function add(value, kind) {
  if (typeof value === 'string' && value.trim() && /\p{Script=Han}/u.test(value)) catalog[kind][value] = translate(value, kind)
}
for (const artifact of artifacts) {
  add(artifact.器物名称, 'artifact')
  add(artifact.机构, 'institution')
  add(artifact.原藏机构, 'institution')
  add(artifact.出土地点, 'site')
  const entities = [...(artifact.标注部分?.entities || []), ...(artifact.标注部分?.relations || []).flatMap(relation => [relation.subject, relation.object])]
  for (const entity of entities) {
    if (entity.label === '出土地点') add(entity.text, 'site')
    if (entity.label === '机构') add(entity.text, 'institution')
  }
  // Statistics uses shortened site strings as grouping keys. Keep grouping raw,
  // but provide a display entry for those strings too.
  const site = String(artifact.出土地点 || '').replace(/\s+/g, '').replace(/[，。；;].*$/g, '').replace(/\d+号.*$/g, '').replace(/第[一二三四五六七八九十0-9]+.*$/g, '').trim()
  add(site, 'site')
  const compactSite = String(artifact.出土地点 || '').replace(/\s+/g, '').replace(/[，。；;].*$/g, '').replace(/第[一二三四五六七八九十0-9]+.*$/g, '').replace(/\d+号.*$/g, '').trim()
  add(compactSite, 'site')
}
for (const kind of Object.keys(catalog)) catalog[kind] = Object.fromEntries(Object.entries(catalog[kind]).sort(([a], [b]) => a.localeCompare(b, 'zh')))
fs.writeFileSync(new URL('../src/i18n/english-records.json', import.meta.url), JSON.stringify(catalog, null, 2) + '\n')
console.log('Generated English record labels:', Object.fromEntries(Object.entries(catalog).map(([kind, values]) => [kind, Object.keys(values).length])))
