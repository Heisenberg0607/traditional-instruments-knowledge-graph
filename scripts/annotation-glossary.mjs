// Context-specific English glossary. Bell anatomy references:
// https://asia-archive.si.edu/wp-content/uploads/2017/07/Resound-Large-print.pdf
// https://theme.npm.edu.tw/selection/Article.aspx?lang=2&sNo=04001042
// These are descriptive translations; source fragments and OCR errors are
// preserved alongside the English and are never silently corrected in data.
const table = text => Object.fromEntries(text.trim().split('\n').map(line => line.trim().split('\t')))
export const parts = table(`
于口	Arched mouth rim
两铣	Two lateral edges
甬	Shank
正鼓	Central striking area
鼓面	Striking surface
舞	Bell crown
铣	Lateral edge
口	Mouth
内唇	Inner lip
孔	Hole
鼓	Striking area
内	Interior
唇	Lip
中	Middle
柄	Handle
侧鼓	Side striking area
槽孔	Slot
腹	Belly
腔体	Resonating cavity
体	Body
镈体	Bo bell body
枚	Boss
墓口	Tomb opening
扁纽	Flattened suspension loop
篆	Decorative border zone
纽	Suspension loop
壁	Wall
腔面	Cavity surface
正	Central framed panel
墓道	Tomb passage
体腔	Body cavity
于	Arched rim
斡	Suspension ring
旋	Shank collar
衡	Shank end
右鼓	Right striking area
钟体	Bell body
钟腔	Bell cavity
曲于	Curved rim
腔	Cavity
内壁	Inner wall
钟口	Bell mouth
隧	Side strike zone
座	Base
横梁	Crossbeam
短	Short section
钟纽	Bell suspension loop
弧	Arc
下口	Lower opening
外	Exterior
腰	Waist
束	Constricted section
肩	Shoulder
底	Bottom
圆曲	Rounded curve
盘	Plate
器顶	Instrument top
胸	Chest
足	Foot
胸部	Chest section
耳	Lug
面	Surface
小孔	Small hole
锣架	Gong stand
器身	Instrument body
内腔	Inner cavity
阔腔	Wide cavity
鼓间	Distance between striking areas
圆筒	Cylinder
圆	Circle
方孔	Square hole
扉棱	Flange
扉	Flange panel
钟身	Bell body
钟旋	Bell shank collar
两铙	Two Nao bells
榫	Tenon
立	Upright section
方座	Square base
台	Platform
铙棱	Nao bell ridge
音脊	Tuning ridge
穿孔	Perforation
两角	Two corners
鼓部	Striking section
梁	Beam
上纽	Upper suspension loop
钲身	Zheng bell body
圆孔	Round hole
腹壁	Belly wall
底口	Bottom opening
口部	Mouth section
顶盘	Top plate
侈口	Flared mouth
腰部	Waist section
肩部	Shoulder section
纽座	Suspension-loop base
器	Instrument
残底	Surviving base fragment
顶	Top
鼓身	Drum body
鼓底	Drum bottom
锣面	Gong face
边	Edge
侧边	Side edge
脐	Central boss
折沿	Folded rim
折边	Folded edge
木架	Wooden stand
脐顶	Boss apex
形体	Overall form
脐部	Boss section
脐颈	Boss neck
弧曲	Curved section
廓	Outline
龙	Dragon
铣角	Lateral-edge corner
钟壁	Bell wall
端	End
基	Base
凹槽	Recessed groove
遗孔	Surviving hole
左鼓	Left striking area
衡面	Shank-end surface
于弧	Rim arc
椁底	Outer-coffin bottom
钮	Suspension loop
圆槽	Circular groove
槽	Groove
钟钩	Bell hook
透槽	Through-slot
钟钵	Bell bowl
根	Root
句	Gou section (source fragment)
音梁	Tuning ridge
钲体	Zheng bell body
圆盘	Circular plate
钲腔	Zheng bell cavity
底盘	Base plate
腰下	Below the waist
头	Head
臀	Rear section
胛	Shoulder blade
鼓冠	Drum crown
鼓胸	Drum chest
足部	Foot section
腰际	Waist line
突棱	Projecting ridge
鼓框	Drum frame
鼓足	Drum foot
口曲	Mouth curvature
腹部	Belly section
两侧	Both sides
口沿	Mouth rim
腹腔	Belly cavity
钟甬	Bell shank
身	Body
镈身	Bo bell body
直甬	Straight shank
小	Small section
空孔	Open hole
器表	Instrument surface
长柄	Long handle
器体	Instrument body
帽	Cap
短柄	Short handle
铙体	Nao bell body
胴	Body
两	Two (source fragment)
胎	Cast body
大嘴	Large mouth
浅	Shallow section
饶	Nao (source spelling)
棱	Ridge
环	Ring
曲	Curve
登	Deng (source fragment)
圈边	Circular rim
包	Covering
镈腔	Bo bell cavity
墩	Pedestal
穿	Perforation
把	Grip
鼓腹	Drum belly
鼓耳	Drum lug
耳面	Lug surface
大耳	Large lug
直	Straight section
铁钩	Iron hook
透孔	Through-hole
直柄	Straight handle
柄端	Handle end
门	Opening
突肩	Projecting shoulder
盘面	Plate surface
首尾	Head and tail
腰足	Waist and foot
唇边	Lip edge
侧壁	Side wall
脐心	Boss center
脐孔	Boss hole
钹面	Cymbal face
睛	Jing (source fragment)
内脐	Inner boss
喇叭	Trumpet-shaped section
铃舌	Bell clapper
口腔	Mouth cavity
台面	Platform surface
铙身	Nao bell body
铣口	Lateral-edge opening
基座	Base
钟架	Bell stand
镈口	Bo bell mouth
侧	Side
钮顶	Suspension-loop top
于部	Rim section
躯身	Main body
方榫	Square tenon
口内	Inside the mouth
钟钮	Bell suspension loop
声孔	Sound hole
音槽	Tuning groove
圆柱	Cylinder
窝	Recess
沟槽	Groove
翰	Han (source fragment)
钟枚	Bell boss
镇	Weight
长	Length
`)

export const terms = table(`
合瓦形	Tile-pair cross-section
合瓦状	Tile-pair cross-section
合瓦	Tile-pair cross-section
弧曲	Curved
角上叉	Corners splay upward
尖锐上叉	Sharp upward-splaying corners
方块状	Block-shaped
凹弧形	Concave arc-shaped
三棱状	Three-ridged
圆柱形	Cylindrical
长方形	Rectangular
长方	Rectangular
方形	Square
圆形	Round
椭圆形	Oval
扁椭圆形	Flattened oval
扁圆形	Flattened round
圆角	Rounded corners
半圆形	Semicircular
半球形	Hemispherical
半圆环形	Semicircular ring
圆台形	Truncated-cone-shaped
圆锥形	Conical
圆锥状	Conical
圆筒形	Tubular
圆管形	Round tubular
圆管状	Round tubular
圆管	Round tube
方柱形	Square-section column
扁柱形	Flattened column
棱柱形	Prismatic
棱柱状	Prismatic
圆柱	Cylinder
圆筒	Cylinder
椭圆	Oval
扁圆	Flattened round
圆盘	Circular disc
圆饼	Disc
圆球	Sphere
球形	Spherical
圆梗	Round stem
柱形	Column-shaped
柱状	Column-shaped
管形	Tubular
管状	Tubular
筒形	Tubular
筒状	Tubular
方环形	Square ring
环形	Ring-shaped
圈形	Ring-shaped
圆环	Circular ring
方孔	Square hole
长条形	Elongated strip
三角形	Triangular
三角	Triangular
梯形	Trapezoidal
桥形	Bridge-shaped
楔形	Wedge-shaped
十字形	Cross-shaped
乳钉形	Boss-shaped
乳头形	Nipple-shaped
乳头状	Nipple-shaped
乳突状	Boss-like
乳钉状	Boss-like
乳形	Boss-shaped
乳状	Boss-like
乳钉	Boss
螺旋	Spiral
螺形	Spiral-shaped
泡形	Bubble-shaped
泡状	Bubble-like
泡	Raised round boss
葫芦形	Gourd-shaped
壶形	Vessel-shaped
莲蓬形	Lotus-seedpod-shaped
伞状	Umbrella-like
绳索形	Rope-shaped
绳索状	Rope-like
绳索	Rope
绳	Rope
带状	Band-shaped
圆凸	Rounded protrusion
合	Joined
中空	Hollow
空心	Hollow
实心	Solid
修长	Slender
瘦长	Slender
平齐	Flush
均平	Even and flat
平面	Flat surface
平头	Flat-topped
平底	Flat-bottomed
扁平	Flattened
斜直	Slanting and straight
内敛	Inward-contracted
外侈	Outward-flared
外扩	Outward-expanded
下垂	Drooping
上收	Curving inward above
上凹	Concave above
外突	Outward-projecting
内卷	Inward-curled
凸起	Raised
凸出	Projecting
凸	Convex
凹	Concave
空	Hollow
扁	Flattened
平	Flat
直	Straight
斜	Slanting
弧形	Arc-shaped
弧	Arc
曲	Curved
圆	Round
方	Square
椭	Oval (source fragment)
柱	Column
筒	Tube
棱	Ridge
环	Ring
节	Segment
叠	Tier
层	Tier
台	Platform
式	Style
状	Shaped
形	Shaped
体	Body
重量	Weight
通高	Overall height
上径	Upper diameter
下径	Lower diameter
外径	Outer diameter
内径	Inner diameter
面径	Face diameter
胸径	Chest diameter
腰径	Waist diameter
足径	Foot diameter
肩径	Shoulder diameter
盘径	Plate diameter
口径	Mouth diameter
壁厚	Wall thickness
身长	Body length
纽高	Loop height
钮高	Loop height
厚度	Thickness
直径	Diameter
截面	Cross-section
横断面	Cross-section
断面	Cross-section
重	Weight
高	Height
长	Long
宽	Wide
阔	Broad
窄	Narrow
狭	Narrow
短	Short
小	Small
大	Large
厚	Thick
薄	Thin
粗	Thick
细	Fine
尖	Pointed
锐	Sharp
敛	Contracted
硕	Bulky
近于	Nearly
略显	Slightly
大致	Approximately
略呈	Slightly
略带	Slightly
微带	Slightly
微	Slightly
略	Slightly
稍	Slightly
较	Comparatively
甚	Very
极	Extremely
近	Nearly
明显	Distinctly
轻	Light
弧度	Curvature
上部	Upper section
下部	Lower section
中部	Middle section
中间	Middle
两端	Both ends
两侧	Both sides
两面	Both faces
一面	One face
表面	Surface
上	Upper
下	Lower
内	Inner
外	Outer
面	Surface
端	End
角	Corner
有	With
无	Without
呈	In the form of
为	Is
而	And
与	And
并	And
且	And
但	But
由于	Due to
均	All
同	Same
共计	Total
共	Total
计	Total
余	More than
个	Items
枚	Bosses
对	Pairs
置	Positioned
饰	Decorated with
厘米	cm
千克	kg
毫米	mm
公斤	kg
公分	cm
厘	cm (source abbreviation)
千	kg (source abbreviation)
东西	East–west
南北	North–south
一	1
二	2
两	2
三	3
四	4
五	5
六	6
七	7
八	8
九	9
十	10
双	Double
单	Single
复	Multiple
浅绿色	Pale green
浅褐色	Light brown
灰褐色	Grayish brown
绿色	Green
褐色	Brown
青铜	Bronze
铜	Bronze
铁	Iron
木	Wood
石	Stone
绿色	Green
纹饰	Decoration
花纹	Motif
纹	Motif
素面	Undecorated
素	Undecorated
饕餮	Taotie mask
兽面	Animal mask
夔龙	Kui dragon
夔	Kui creature
蟠螭	Coiled chi dragon
蟠虺	Coiled serpent
蟠龙	Coiled dragon
蟠曲	Coiled
龙凤	Dragon and phoenix
凤鸟	Phoenix
凤	Phoenix
龙	Dragon
蛇	Snake
虺	Serpent
螭	Chi dragon
虎	Tiger
牛首	Ox head
象首	Elephant head
象	Elephant
兽首	Animal head
兽	Animal
鸟头	Bird head
凤首	Phoenix head
鱼尾	Fish tail
鱼	Fish
鸟	Bird
蝉	Cicada
螳螂	Mantis
蜻蜓	Dragonfly
虫	Insect
人面	Human face
人物	Human figure
舞人	Dancing figure
羽人	Feathered figure
翔鹭	Flying heron
人	Human
云雷	Cloud-and-thunder
雷	Thunder
云涡	Cloud scroll
卷云	Cloud scroll
云头	Cloud head
云	Cloud
漩涡	Whorl
涡	Whorl
回字	Squared spiral
回形	Squared spiral
回	Squared spiral
窃曲	Interlocking scroll
卷草	Scrolling foliage
缠枝	Scrolling stems
花卉	Floral
团花	Floral medallion
葵花	Mallow flower
菊花	Chrysanthemum
花叶	Flowers and leaves
花	Flower
蕉叶	Banana leaf
垂叶	Hanging leaf
叶脉	Leaf veins
叶翅	Leaf-shaped wing
叶	Leaf
鳞	Scale
羽状	Feather-like
羽	Feather
联珠	Linked beads
连珠	Linked beads
环带	Ring band
重环	Overlapping rings
重圈	Overlapping circles
圆圈	Circle
圈点	Ring-and-dot
圆点	Round dot
点	Dot
圈	Circle
方格	Square grid
菱形	Diamond
棱形	Diamond
格子	Grid
格	Grid
几何	Geometric
锯齿	Sawtooth
栉	Comb
齿	Tooth
条斑	Striped marking
条状	Striped
条	Strip
斑	Spot
波浪	Wave
水波	Water ripple
波曲	Wavy
波折	Zigzag wave
波	Wave
折线	Zigzag line
折角	Angular
曲尺	Carpenter-square
曲折	Zigzag
折	Fold
绞索	Twisted rope
绚索	Rope (source spelling)
绚	Rope (source spelling)
綢	Silk (source spelling)
辫	Braid
编	Braided
绞	Twisted
线条	Lines
阴线	Incised line
阳线	Raised line
阴刻	Incised
阳	Raised
阴	Incised
线	Line
纵向	Vertical
横向	Horizontal
横	Horizontal
纵	Vertical
方向	Direction
顺向	Same-direction
夹	Between
连续	Continuous
致密	Dense
精细	Fine
纤细	Slender
变形	Stylized
变体	Variant
简化	Simplified
简体	Simplified
简式	Simple
复式	Compound
散	Scattered
勾连	Interlinked
钩连	Interlinked
勾	Hook
钩	Hook
交	Interlaced
连体	Joined bodies
连	Linked
双头	Double-headed
无首	Headless
首	Head
鼻	Nose
卷	Curled
颈	Neck
身	Body
嘴	Mouth
火焰	Flame
太阳	Sun
手心	Palm
贝	Cowrie
船	Boat
竞渡	Boat race
泉	Quan coin
五铢钱	Wuzhu coin
钱	Coin
八卦	Eight trigrams
八宝	Eight treasures
十二生肖	Twelve zodiac animals
生肖	Zodiac animals
天干	Heavenly stems
二龙戏珠	Two dragons playing with a pearl
双龙戏珠	Two dragons playing with a pearl
戏珠	Playing with a pearl
童子戏	Children at play
戏	Playing
狮	Lion
寿	Longevity
珠	Pearl
旗	Banner
斿	Streaming
旂	Banner
斎	Banner (source spelling)
旃	Banner
翎眼	Feather-eye
眼	Eye
目	Eye
符	Symbol
字	Character
酉	You character
标记	Mark
地	Background
堆	Applied relief
浮雕	Relief
印	Impressed
朱色	Vermilion
朱	Vermilion
晕	Halo
篮	Basket
席	Mat
接缝	Seam
谷粒	Grain
棘	Spine
锤	Hammer
山	Mountain
团	Medallion
纹索	Rope pattern
状况	Condition
残	Fragmentary
不	Not
`)

// Exact descriptions preserve natural English for frequent compounds and
// ambiguous bell terminology rather than composing a word-for-word label.
export const descriptions = table(`
合瓦形	Tile-pair-shaped cross-section
合瓦形体	Body with a tile-pair cross-section
弧曲	Curved
角上叉	Corners splay upward
方块状	Block-shaped
凹	Concave
凹弧形	Concave arc-shaped
棱斜直	Slanting, straight lateral edges
修长	Slender and elongated
微弧，平于	Slightly curved, with a flat rim
圆中见方	Rounded with a squarish outline
乳钉纹	Boss motif
兽面纹	Animal-mask motif
云雷纹	Cloud-and-thunder motif
饕餮纹	Taotie-mask motif
`)

Object.assign(terms, table(`
锥度	Taper
锥柱	Tapered column
锥	Cone
半	Half
平展	Flat and spread out
组	Groups
修	Length (bell crown)
螺	Spiral
横杠	Crossbar
多	Multiple
侈	Flared
通	Overall
底口径	Bottom-opening diameter
底径	Base diameter
脐径	Boss diameter
中径	Middle diameter
孔径	Hole diameter
握径	Grip diameter
帽径	Cap diameter
包径	Central-cover diameter
握高	Grip height
通长	Overall length
高度	Height
跨度	Span
拱度	Arch rise
径	Diameter
边沿	Rim
微微	Slightly
上翘	Upturned
莲瓣	Lotus petal
莲花	Lotus flower
花瓣	Petal
瓣	Petal
隆起	Raised
隆突	Raised boss
分明	Distinct
犬牙形	Canine-tooth-shaped
犬牙状	Canine-tooth-shaped
犬牙	Canine tooth
瓦	Tile
长圆	Oblong
疏	Sparse
渐	Gradually
或	Or
朝东	Facing east
素边	Undecorated border
的	Of
深	Deep
出沿	Projecting rim
突出	Projecting
出	Projecting
前后	Front and back
前	Front
后	Back
实	Solid
向内	Inward
向外	Outward
向	Toward
相通	Connected
凸雕	Raised relief
边框	Border frame
组成	Composed of
横截面	Cross-section
横截	Cross-section (source fragment)
内倾	Inward-sloping
倾	Sloping
作	Formed as
形似	Shaped like
景	Boss pedestal
分	Fen (traditional length unit)
框	Frame
拱形	Arched
拱弧	Arched
拱	Arch
封	Closed
起棱	Raised ridges
突尖	Projecting point
突起	Protrusion
突	Projecting
残缺	Damaged
残损	Damaged
每	Each
各	Each
合计	Total
实体	Solid body
内收	Contracted inward
上出	Projects above
出景	Projects above boss pedestal
覆帽	Cap-shaped cover
镂空	Openwork
相对	Facing each other
相	Mutually
如	Like
桶	Barrel
卧鸟	Recumbent bird
卧	Recumbent
由	From
之	Of
相隔	Separated by
隔	Separated
悬挂	Suspension
悬	Hanging
挂	Hanging
以便	To allow
以	With
从	From
往	Toward
橄榄形	Olive-shaped
蘑菇状	Mushroom-shaped
光泽	Luster
箍	Hoop
坡形	Sloping
背	Back
四周	Around the perimeter
错金	Gold-inlaid
错银	Silver-inlaid
错	Inlaid
金	Gold
银	Silver
钉	Stud
敞口	Open mouth
敞	Open
甲片	Plate A
片	Piece
皆	All
约	Approximately
雄浑	Bold and substantial
竹节	Bamboo node
竹	Bamboo
股	Strands
索	Cord
连峰	Linked peaks
峰	Peak
广	Width
矩形	Rectangular
矩	Square
梅花	Plum blossom
梅	Plum blossom
浑圆	Fully rounded
角部	Corner section
处	Position
部分	Section
部	Section
最	Most
圭形	Gui-tablet-shaped
饼	Disc
弓	Bow
列	Rows
排	Rows
设	Provided with
尺	Chi (traditional length unit)
寸	Cun (traditional length unit)
乎	Nearly
段	Segments
高耸	Tall and upright
瘦	Slender
衔	Holding in the mouth
弦	String-line
如意	Ruyi-scepter
乳	Boss
乳丁	Boss (source spelling)
顾龙	Backward-looking dragon
回顾	Looking backward
顾	Looking backward
正反面	Front and back faces
行	Rows
须	Whisker
加	And
旌旗	Ceremonial banner
旌	Ceremonial banner
串枝	Intertwining branches
枝	Branch
水叶	Aquatic leaf
水	Water
甲	Jia character
星	Star
等	And other
绦	Ribbon
粟	Millet
刻	Engraved
双脚	Both feet
脚	Foot
左右	Left and right
左	Left
右	Right
王	Wang character
图案	Design
符号	Symbol
图	Design
号	Number
菱	Diamond
晕	Band
划船	Rowing a boat
划	Incised
水滴	Water droplet
滴水	Droplet
滴	Droplet
飞鸟	Flying bird
飞	Flying
五铢	Wuzhu coin
铢	Zhu (weight unit)
鹭	Heron
和	And
朵	Blossoms
花冠	Floral crown
冠	Crown
对角	Diagonal
函	Han character
道	Bands
米字	Mi-character
米	Mi character
亦	Also
牛头	Ox head
牛	Ox
刀	Blade
界栏式	Framed-panel style
尾	Tail
鸾鸟	Luan bird
鸾	Luan bird
对称	Symmetrical
缠丝	Twisted threads
交缠	Intertwined
缠	Coiled
火	Flame
同心圆	Concentric circles
同心	Concentric
心	Center
仙	Immortal
蝶	Butterfly
丝	Thread
坠头	Pendant head
编织	Woven
织	Woven
宝珠	Precious pearl
宝焰	Sacred flame
人字形	Chevron
蜂窝	Honeycomb
漫漶	Worn and indistinct
竖	Vertical
海浪	Ocean wave
海波	Ocean wave
海	Sea
倒	Inverted
浪	Wave
长翼	Long-winged
芒	Radiating rays
网格	Mesh
网	Net
圆心	Circle center
丿	Pie stroke
蚕蛹	Silkworm chrysalis
菊	Chrysanthemum
毛	Mao character
腾龙	Soaring dragon
蒂	Calyx
建鼓	Jian drum
茅旗	Mao banner
巴蜀	Ba–Shu
手臂	Arm
轮廓	Outline
鲤鱼	Carp
望船	Wang boat (source fragment)
日月	Sun and moon
日	Sun
月	Moon
方块	Square block
块	Block
亻	Ren radical
法轮	Dharma wheel
宝瓶	Treasure vase
宝	Treasure
吉祥结	Auspicious knot
尊胜	Victory emblem
红珊	Red coral (source fragment)
爰	Yuan character
铸	Cast
窃	Qie (source fragment)
旋转	Rotating
绣球	Embroidered ball
穿山甲	Pangolin
羽翅	Feathered wing
象征	Symbolic
变	Variant
展	Spread
生	Sheng (source fragment)
带	Band
成	Forming
及	And
起	Raised
分	Section
在	At
周	Circuits
跨	Spanning
轮	Wheel
势	Form
货	Huo character (source fragment)
通身	Entire body
`))

Object.assign(descriptions, table(`
二层圆台形	Two-tiered truncated-cone form
三层圆台形	Three-tiered truncated-cone form
内凹呈弧形	Inward-concave arc
蟠龙形	Coiled-dragon-shaped
尖角	Pointed corners
螺旋形	Spiral-shaped
二节圆柱形	Two-section cylinder
断面呈椭圆形	Oval cross-section
圆柱状	Cylindrical
长方环形	Rectangular ring
椭圆筒形	Oval tube
平直	Flat and straight
弧曲稍大	Slightly greater curvature
扁圆筒形	Flattened cylindrical tube
扁阔	Flattened and broad
弧曲稍小	Slightly smaller curvature
圆盘形	Disc-shaped
圆盘状	Disc-shaped
平头柱状	Flat-topped column
微敛	Slightly contracted inward
棱直	Straight ridges
呈	In the form of (source fragment)
二节	Two sections
圆角方形	Square with rounded corners
弧曲上收	Curved inward toward the top
略修长	Slightly slender and elongated
微弧	Slightly curved
中空与	Hollow and … (source fragment)
顶平	Flat top
方形凸	Square protrusion
两侧略呈弧形	Slightly curved on both sides
两面置	Positioned on both faces (source fragment)
一面平一面圆的半圆柱状	Semicylindrical, with one flat side and one rounded side
外侈,向上收成弧形	Flared outward, curving inward toward the top
三角形复线垂	Hanging triangular double lines (source fragment)
圆柱状，空心，上下同径，端内有横杠	Hollow cylinder of equal upper and lower diameter, with an internal end crossbar
中空与腔通	Hollow and connected to the cavity
圆柱形实	Solid cylindrical form (source fragment)
中空与体相通	Hollow and connected to the body cavity
中空与体内相通	Hollow and connected to the body interior
中空与内腔相通	Hollow and connected to the inner cavity
中空与体腔相通	Hollow and connected to the body cavity
中空不与体相通	Hollow but not connected to the body cavity
圆形,中空,顶端残损,有旋,窄而细,斡呈半环形	Round and hollow; damaged top; collar present; narrow and slender; semicircular suspension ring
中空与体腔相通,柄上有旋无斡,旋上饰云纹及4个小乳钉	Hollow and connected to the body cavity; handle has a collar but no suspension ring; collar decorated with cloud motifs and four small bosses
每面有长枚6组，两面共计36枚	Six groups of elongated bosses on each face, 36 bosses in total
每面有螺形短枚6组,两面合计36枚	Six groups of short spiral bosses on each face, 36 bosses in total
每面有螺形短枚6组，共36枚，各枚均由螭盘成	Six groups of short spiral bosses on each face, 36 in total, each formed by a coiled chi dragon
每面有螺形枚6组，每组3枚，两面合计36枚	Six groups of three spiral bosses on each face, 36 bosses in total
每面有乳钉 6 组共计 36 枚,各组乳钉之间以弦纹或绳纹相隔	Six groups of bosses on each face, 36 in total; groups separated by string-line or rope motifs
两面共有36覆帽状圆枚	36 round, cap-shaped bosses across both faces
前后两面共有 36 圆枚	36 round bosses across the front and back faces
形似钟但较短阔,弧于,侈铣	Bell-like but shorter and broader, with a curved rim and flared lateral edges
横断面呈椭圆形，两侧起凸棱，于弧铣侈，枚长出景	Oval cross-section with projecting side ridges, arched rim and flared lateral edges; elongated bosses project beyond their pedestals
作半球状,上饰涡纹,枚上出景,呈乳头状	Hemispherical, with whorl decoration; nipple-shaped bosses project above their pedestals
饰以粗线条组成的兽面纹	Animal-mask motif formed by thick lines
作螭形，通身饰乳钉纹和蟠螭纹	Chi-dragon-shaped, decorated throughout with boss and coiled-chi-dragon motifs
双卧鸟形，尖嘴、圆眼，头向外，二鸟头上长冠相连	Pair of recumbent birds with pointed beaks, round eyes and outward-facing heads; their long crests are joined
6棱圆柱形，近端处有凸棱，柄端作蘑菇状，面有4道凸斜纹，中心有一孔，与体腔相通	Six-ribbed cylindrical form with a raised ridge near the end, mushroom-shaped handle tip, four raised diagonal bands, and a central hole connected to the body cavity
实心扁体8棱形，两侧2棱极短，正背两面各3棱等宽，中间平，两侧坡形	Solid flattened eight-ribbed body; two very short side ribs and three equal-width ribs on each face; flat center with sloping sides
两面均饰变形蟠螭纹，四周、钲、鼓部均饰有错金云纹，壁薄，内壁一面有一圆钉	Both faces have stylized coiled-chi-dragon motifs; gold-inlaid cloud motifs surround the central panel and striking area; thin walls, with one round stud on an inner wall
盘内在立虎前及左右两侧刻有	Engraved inside the plate, in front of and on both sides of the standing tiger (source fragment)
纹饰，双脚前虎头下有一虎纹及“王”字，虎左右各有4个不同的图案符号	Decoration includes a tiger motif and the Wang character below the tiger head; four different symbols appear on either side of the tiger (source fragment)
三尺六寸六分	3 chi, 6 cun and 6 fen (traditional length units)
三尺四寸	3 chi and 4 cun (traditional length units)
十二生	Twelve zodiac animals (source fragment)
人脚旂旂纹	Human-foot and banner motif (source spelling)
斡弦纹	Suspension-ring string-line motif
四出钱纹	Four-projection coin motif
钲素面	Undecorated central panel
直铙	Straight Nao bell (source fragment)
线条间点状纹	Dot motifs between lines
游旗纹	Streaming-banner motif
游旂纹	Streaming-banner motif
长圆，中间略鼓，瓣间微翘	Oblong, slightly bulging at the center, with slightly upturned sections between the petals
半球状	Hemispherical
沿内倾,略凹呈弧形	Inward-sloping rim, with a slightly concave arc
两面均饰大面积蟠夔纹	Both faces extensively decorated with coiled-kui motifs
宽带状蟠	Broad band of coiled decoration (source fragment)
细且长，两侧有垂直突棱，中空	Long, slender and hollow, with vertical projecting ridges on both sides
蟠蛇纹	Coiled-snake motif
钲部几何形纹	Geometric motif on the central panel
蟠夔纹	Coiled-kui motif
微垂	Slightly drooping
微垂，略敞	Slightly drooping and slightly open
微垂，略敞，微弧	Slightly drooping, open and curved
呈螺旋状，较低，共	Spiral-shaped and comparatively low; total (source fragment)
球弧面	Spherical curved surface
`))
