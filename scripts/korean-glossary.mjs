export const table = text => Object.fromEntries(text.trim().split('\n').map(line => line.trim().split('\t')))

export const recordTerms = table(`
中国	중국
日本	일본
京都	교토
内蒙古	네이멍구
西藏	시짱
香港	홍콩
澳门	마카오
曾侯乙	증후을
曾侯	증후
曾伯	증백
单伯	선백
召伯	소백
齐国	제나라
孔子	공자
孔庙	공자 사당
故宫	고궁
大成殿	대성전
大召寺	다자오사
普宁寺	푸닝사
泉屋博古馆	센오쿠하쿠코칸 박물관
阿坝藏族羌族自治州	아바 티베트족·창족 자치주
阿坝羌族自治州	아바 창족 자치주
土家族苗族自治州	투자족·먀오족 자치주
土家族	투자족
苗族	먀오족
羌族	창족
藏族	티베트족
自治州	자치주
自治县	자치현
省	성
市	시
县	현
区	구
旗	기
乡	향
镇	진
村	촌
岛	섬
编钟	편종
编铙	요 세트
编镈	박 세트
编磬	편경
甬钟	용종
钮钟	뉴종
铃钟	방울종
梵钟	범종
扁钟	납작한 종
圆钟	둥근 종
镈于	순우
錞于	순우
编勾鑃	구조 세트
句鑃	구조
勾鑃	구조
铜鼓	청동 북
木鱼	목어
石磬	돌 경
铜扁鼓	납작한 청동 북
镜	거울
鼓棒	북채
铜钟	청동 종
铁钟	철제 종
铜铃	청동 방울
铜铎	청동 탁
钟	종
鐘	종
铙	요
鐃	요
钲	정
鉦	정
镈	박
鎛	박
铎	탁
鐸	탁
铃	방울
鈴	방울
钹	발
锣	징
磬	경
鼓	북
板	박판
钮	고리
纽	고리
柄	자루
甬	종의 자루
口	입구
足	다리
兽面纹	짐승 얼굴 무늬
饕餮纹	도철무늬
云雷纹	운뢰문
蟠螭纹	서린 이룡무늬
龙纹	용무늬
凤纹	봉황무늬
弦纹	가로줄무늬
雷纹	뇌문
云纹	구름무늬
素面	민무늬
虎钮	호랑이 모양 고리
龙钮	용 모양 고리
双鸟	한 쌍의 새
龙凤纹	용·봉황무늬
八棱	여덟 모서리
直柄	곧은 자루
棱柄	모서리가 있는 자루
蟠虺纹	서린 뱀무늬
夔龙纹	기룡무늬
夔纹	기무늬
蝉纹	매미무늬
鸟纹	새무늬
鱼纹	물고기무늬
垂叶纹	늘어진 잎무늬
垂叶	늘어진 잎
八宝纹	팔보무늬
乳钉纹	돌기무늬
乳钉	돌기
螺旋纹	나선무늬
仿木	나무를 본뜬
镂空	투각
错金	금상감
错银	은상감
遗址博物馆	유적박물관
文物考古研究所	문물고고연구소
文物保护研究所	문물보호연구소
文物研究所	문물연구소
考古研究所	고고연구소
文物管理委员会	문물관리위원회
文物管理所	문물관리소
文物管理处	문물관리처
文物管理站	문물관리소
文管所	문물관리소
文管处	문물관리처
文物工作队	문물조사대
考古工作队	고고조사대
工作站	조사소
文物陈列室	문물전시실
文物商店	문물상점
博物馆	박물관
博物院	박물원
纪念馆	기념관
历史系	역사학과
陈列室	전시실
社会科学院	사회과학원
科学院	과학원
管理委员会	관리위원회
公安局	공안국
文化局	문화국
文化馆	문화관
大学	대학교
旧藏	옛 소장품
原藏	이전 소장
转交	이관
今不存	현재 소재 불명
墓葬	무덤
墓地	묘역
遗址	유적
故城	옛 성터
石棺墓	석관묘
陪葬坑	부장품 구덩이
寺	사찰
宫	궁
殿	전각
王府	왕부
商代	상나라
西周	서주
春秋	춘추시대
战国	전국시대
西汉	전한
东汉	후한
汉初	한나라 초기
汉代	한나라
唐代	당나라
宋代	송나라
元代	원나라
明代	명나라
清代	청나라
王墓	왕묘
石墓	돌무덤
号墓	호묘
号	호
第	제
墓	묘
出土	출토
采集	수집
发掘	발굴
东北部	북동부
西北	북서쪽
东北	북동쪽
西南	남서쪽
东南	남동쪽
北侧	북쪽
南侧	남쪽
东侧	동쪽
西侧	서쪽
北坡	북쪽 비탈
南坡	남쪽 비탈
东坡	동쪽 비탈
西坡	서쪽 비탈
取土场	토사 채취장
建筑工地	건설 현장
工地	공사 현장
水库	저수지
博物馆藏	박물관 소장
米	m
千米	km
`)

// Whole phrases are preferred to word composition, especially for anatomy and
// common shapes. The Chinese-key overrides below take precedence everywhere.
export const exact = table(`
于口	활 모양으로 휜 종 입구 가장자리
两铣	양쪽 모서리
甬	종의 자루
正鼓	중앙 타격부
侧鼓	측면 타격부
鼓面	타격면
舞	종의 윗면
铣	종의 옆 모서리
正	중앙 구획면
篆	장식 구획띠
枚	돌기
于	종 입구의 곡선 가장자리
斡	매다는 고리
旋	자루의 테두리띠
衡	자루 끝부분
隧	측면 타격 지점
音梁	조율용 돌출부
音脊	조율용 돌출부
合瓦形	기와 두 장을 맞댄 형태
合瓦形体	기와 두 장을 맞댄 단면의 몸체
弧曲	활처럼 휜 형태
角上叉	모서리가 위로 벌어진 형태
方块状	각진 덩어리 형태
凹	오목한 형태
凹弧形	오목한 곡선 형태
圆柱形	원기둥 모양
圆柱状	원기둥 모양
圆筒形	원통 모양
中空	속이 빈 형태
实心	속이 찬 형태
长方形	직사각형
方形	정사각형
圆形	원형
椭圆形	타원형
三角形	삼각형
三棱状	세 모서리가 있는 형태
平	평평한 형태
斜直	비스듬하고 곧은 형태
二层圆台形	2단 원뿔대 모양
三层圆台形	3단 원뿔대 모양
内凹呈弧形	안쪽으로 오목하게 휜 형태
蟠龙形	몸을 감은 용 모양
二节圆柱形	두 마디 원기둥 모양
断面呈椭圆形	타원형 단면
环形	고리 모양
长方环形	직사각형 고리 모양
椭圆筒形	타원형 원통 모양
平直	평평하고 곧은 형태
扁圆筒形	납작한 원통 모양
扁阔	납작하고 넓은 형태
圆盘形	원판 모양
圆盘状	원판 모양
平头柱状	윗면이 평평한 기둥 모양
微敛	안쪽으로 약간 오므라든 형태
棱直	곧은 모서리
圆角方形	모서리를 둥글린 정사각형
弧曲上收	위쪽으로 오므라들며 휜 형태
修长	가늘고 길쭉한 형태
略修长	약간 가늘고 길쭉한 형태
微弧	살짝 휜 형태
顶平	평평한 윗면
方形凸	네모난 돌출부
两侧略呈弧形	양쪽이 약간 휜 형태
内唇	입구 안쪽 테두리
腹	몸통의 배 부분
柄	자루
扁纽	납작한 매달기 고리
扁圆柱状	납작한 원기둥 형태
弧曲极大	매우 크게 휜 형태
尖锐上叉	모서리가 뾰족하게 위로 벌어진 형태
弧曲略呈方形	약간 네모꼴로 휜 형태
一面平一面圆的半圆柱状	한쪽은 평평하고 다른 쪽은 둥근 반원기둥 형태
甚扁，合瓦形	매우 납작하며 기와 두 장을 맞댄 형태
弧曲极大，但弧曲略呈方形	크게 휘었으나 윤곽은 약간 네모꼴인 형태
短小，扁柱形	짧고 작은 납작한 기둥 형태
微弧，平于	살짝 휘었으며 입구 가장자리는 평평한 형태
椭圆形，稍敛，平	타원형이며 약간 오므라들고 평평한 형태
方环形	네모난 고리 형태
乳突状	젖꼭지 모양 돌출부
较窄	비교적 좁은 형태
略斜	약간 기울어진 형태
稍敛	약간 오므라든 형태
扁椭圆形	납작한 타원형
桥形	다리처럼 휜 형태
螺旋状泡形	나선형으로 솟은 둥근 돌기 형태
扁椭圆体	납작한 타원형 몸체
柱形	기둥 모양
乳钉形	둥근 돌기 형태
弧度极微，近于斜直	거의 비스듬한 직선에 가까울 정도로 조금 휜 형태
圆乳钉形	둥근 돌기 형태
平齐	높이가 가지런한 형태
二节乳头形	두 마디로 된 젖꼭지 모양
简式半圆环形	단순한 반원 고리 형태
稍修长	약간 가늘고 긴 형태
圆柱形长	긴 원기둥 형태
螺旋形	나선형
二节	두 마디
两对	두 쌍
蟠龙形	몸을 감은 용 모양
尖角	뾰족한 모서리
下垂	아래로 처진 형태
中空与体相通	속이 비어 있고 몸체 내부와 연결된 형태
中空与体内相通	속이 비어 있고 몸체 내부와 연결된 형태
中空与内腔相通	속이 비어 있고 내부 공간과 연결된 형태
中空与体腔相通	속이 비어 있고 몸체 내부 공간과 연결된 형태
中空不与体相通	속이 비어 있으나 몸체 내부와 연결되지 않은 형태
每面有长枚6组，两面共计36枚	각 면에 긴 돌기 6묶음이 있으며 양면 합계 36개
每面有螺形短枚6组,两面合计36枚	각 면에 짧은 나선형 돌기 6묶음이 있으며 양면 합계 36개
每面有螺形短枚6组，共36枚，各枚均由螭盘成	각 면에 짧은 나선형 돌기 6묶음이 있고 합계 36개이며, 각 돌기는 이룡이 서린 모양
每面有螺形枚6组，每组3枚，两面合计36枚	각 면에 3개씩 6묶음의 나선형 돌기가 있으며 양면 합계 36개
每面有乳钉 6 组共计 36 枚,各组乳钉之间以弦纹或绳纹相隔	각 면에 돌기 6묶음이 있고 합계 36개이며, 묶음 사이는 가로줄무늬나 끈무늬로 구분됨
两面共有36覆帽状圆枚	양면에 덮개 모양의 둥근 돌기 합계 36개
前后两面共有 36 圆枚	앞뒷면에 둥근 돌기 합계 36개
三尺六寸六分	3척 6촌 6푼 (전통 길이 단위)
三尺四寸	3척 4촌 (전통 길이 단위)
圆柱状，空心，上下同径，端内有横杠	속이 빈 원기둥으로 위아래 지름이 같고 끝부분 안쪽에 가로대가 있는 형태
形似钟但较短阔,弧于,侈铣	종과 비슷하나 더 짧고 넓으며, 입구 가장자리는 휘고 양옆 모서리는 벌어진 형태
两面均饰变形蟠螭纹，四周、钲、鼓部均饰有错金云纹，壁薄，内壁一面有一圆钉	양면에 변형 이룡무늬가 있고 둘레·중앙 구획면·타격부에는 금상감 구름무늬가 있음. 벽이 얇고 한쪽 안쪽 벽면에 둥근 돌기 하나가 있음
横断面呈椭圆形，两侧起凸棱，于弧铣侈，枚长出景	타원형 단면에 양옆 능선이 돌출되고 입구는 휘며 모서리는 벌어짐. 긴 돌기는 받침보다 높게 돌출됨
双卧鸟形，尖嘴、圆眼，头向外，二鸟头上长冠相连	한 쌍의 엎드린 새 모양으로 부리는 뾰족하고 눈은 둥글며 머리는 바깥을 향함. 두 새의 긴 볏이 서로 이어짐
6棱圆柱形，近端处有凸棱，柄端作蘑菇状，面有4道凸斜纹，中心有一孔，与体腔相通	여섯 모서리의 원기둥 형태로 끝 근처에 돌출 능선이 있고 자루 끝은 버섯 모양임. 표면에 비스듬한 돌출선 4개가 있으며 중앙 구멍은 몸체 내부와 연결됨
实心扁体8棱形，两侧2棱极短，正背两面各3棱等宽，中间平，两侧坡形	속이 찬 납작한 여덟 모서리 몸체. 양옆의 두 모서리는 매우 짧고 앞뒷면의 세 모서리는 각각 너비가 같으며, 중앙은 평평하고 양옆은 비탈진 형태
宽	너비
长	길이
高	높이
重	무게
重量	무게
上径	윗부분 지름
下径	아랫부분 지름
兽面纹	짐승 얼굴 무늬
云雷纹	구름·번개무늬
饕餮纹	도철무늬
螺旋纹	나선무늬
龙纹	용무늬
凤纹	봉황무늬
蝉纹	매미무늬
素面	민무늬
`)

export const phrases = table(`
source fragment	원문 일부
source spelling	원문 표기
source abbreviation	원문 약기
central striking area	중앙 타격부
side striking area	측면 타격부
striking area	타격부
striking surface	타격면
arched mouth rim	활 모양으로 휜 종 입구 가장자리
lateral edge	옆 모서리
bell crown	종의 윗면
shank collar	자루의 테두리띠
shank end	자루 끝부분
suspension loop	매다는 고리
suspension ring	매다는 고리
central framed panel	중앙 구획면
decorative border zone	장식 구획띠
side strike zone	측면 타격 지점
tuning ridge	조율용 돌출부
sound hole	소리 구멍
outer-coffin bottom	덧널 바닥
resonating cavity	공명 공간
body cavity	몸체 내부 공간
inner cavity	내부 공간
inner wall	안쪽 벽면
mouth rim	입구 가장자리
bell body	종 몸체
drum body	북 몸체
bell clapper	방울 추
tile-pair-shaped cross-section	기와 두 장을 맞댄 단면
cross-section	단면
round tubular	원통 모양
round tube	둥근 관
truncated-cone-shaped	원뿔대 모양
truncated-cone form	원뿔대 형태
square-section column	사각기둥
flat-topped	윗면이 평평한
flat-bottomed	바닥이 평평한
coiled-chi-dragon	서린 이룡
chi dragon	이룡
chi-dragon	이룡
kui dragon	기룡
kui-dragon	기룡
kui creature	외발 신수
taotie mask	도철
taotie-mask	도철
animal-mask	짐승 얼굴
animal mask	짐승 얼굴
cloud-and-thunder	구름·번개
string-line	가로줄
coiled-kui	서린 기룡
gold-inlaid	금상감
silver-inlaid	은상감
coiled-snake	서린 뱀
coiled-dragon	몸을 감은 용
dragon and phoenix	용과 봉황
hanging leaf	늘어진 잎
palace museum	고궁박물원
institute of cultural relics and archaeology	문물고고연구소
eight trigrams	팔괘
eight treasures	팔보
twelve zodiac animals	십이지 동물
two dragons playing with a pearl	쌍룡희주
mi-character	쌀 미 자
wang character	임금 왕 자
wuzhu coin	오수전
zhu weight unit	주 무게 단위
traditional length units	전통 길이 단위
traditional length unit	전통 길이 단위
more than	초과
in the form of	형태
connected to the body cavity	몸체 내부 공간과 연결됨
connected to the inner cavity	내부 공간과 연결됨
connected to the cavity	내부 공간과 연결됨
front and back faces	앞뒷면
front and back	앞뒤
both faces	양면
both sides	양쪽
each face	각 면
on each face	각 면에
in total	총합
between the petals	꽃잎 사이
formed by	이루어진
inward-concave arc	안쪽으로 오목한 곡선
laterally	옆으로
`)

// Atomic terms are used only while building catalogs, after exact phrases.
// Values can be literal fragments because the extraction itself contains
// fragments; originals are always retained beside the Korean display.
export const words = {}
for (const group of `
a|an|the|of|in|on|at|as|by|to=
and|with=및
without=없는
or=또는
but=그러나
not=아닌
is|are|has|have=있음
also=또한
all=전체
each=각
both=양쪽
same=같은
other|different=다른
more=더
most=가장
very=매우
extremely=매우
comparatively=비교적
slightly=약간
approximately=약
nearly=거의
probably=추정
distinctly|distinct=뚜렷한
fully=완전히
gradually=점차
overall=전체
total=총
above|upper=위쪽
below|lower=아래쪽
inner|internal|inside|interior=안쪽
outer|external|exterior=바깥쪽
front=앞쪽
back|rear=뒤쪽
left=왼쪽
right=오른쪽
middle|central|center=중앙
near=가까운
end|ends|tip=끝
root=뿌리
top|topped=윗면
bottom|bottomed=바닥
side|sides=옆면
around=주변
across=양쪽에
between=사이
beyond=바깥으로
toward=방향으로
from=에서
out=밖으로
upward|upturned=위로 벌어진
outward=바깥으로
inward=안쪽으로
short|shorter=짧은
long|elongated=길쭉한
small|smaller=작은
large=큰
wide|broad|broader=넓은
narrow=좁은
thick=두꺼운
thickness=두께
thin=얇은
fine|slender=가는
bold|substantial=육중한
bulky=두툼한
light=옅은
pale=연한
deep=깊은
low=낮은
tall|upright=높이 솟은
shallow=얕은
height=높이
width=너비
length=길이
diameter=지름
weight=무게
distance=간격
span=폭
rise=높이
position|positioned=위치
surface=표면
face|faces=면
wall|walls=벽
body|bodies=몸체
section|sections|part=부분
outline=윤곽
form|formed|forming=형태
shape|shaped=모양
area|areas=부분
corner|corners=모서리
edge|edges=모서리
rim|lip=가장자리
mouth|opening|openings=입구
open=벌어진
closed=막힌
foot=다리
waist=허리
shoulder=어깨
chest=가슴
belly=배
head|heads|headed=머리
tail=꼬리
neck=목
ear|lug=귀
eye|eyes=눈
nose=코
beaks|beak=부리
arm=팔
palm=손바닥
wing|winged=날개
whisker=수염
crown=윗면
shank=자루
handle|grip=손잡이
cap=덮개
cover|covering=덮개
base|pedestal|pedestals=받침
platform|plate=판
beam|crossbeam|crossbar=가로대
ring|rings=고리
loop=고리
collar=테두리띠
band|bands|belt=띠
strip|strands=줄
border=테두리
zone=구획
panel=구획면
frame|framed=틀
stand=받침대
tenon=장부
hole=구멍
perforation=뚫린 구멍
slot=홈
groove=홈
recess|recessed=오목한 홈
cavity=내부 공간
resonating=공명
tuning=조율용
strike|striking=타격
sound=소리
bell|bells=종
nao=요
zheng=정
zhong=종
bo=박
duo=탁
goudiao=구조
chunyu=순우
cymbal|cymbals=발
gong|gongs=징
drum=북
clapper=추
wooden=나무
fish=물고기
instrument=악기
boss|bosses|stud=돌기
nipple=젖꼭지
ridge|ridges|ridged|ribbed|ribs=능선
flange=돌출 테두리
protrusion|projection=돌출부
project|projecting=돌출된
raised=도드라진
convex=볼록한
concave=오목한
flat|flattened=납작한
round|rounded=둥근
circle|circles|circular=원형
square|squared|squarish=사각
rectangular=직사각형
oval=타원형
oblong=긴 타원형
triangular=삼각형
angular=각진
trapezoidal=사다리꼴
geometric=기하학
cylinder|cylindrical=원기둥
column=기둥
tube|tubular=원통
prismatic=각기둥
cone|conical=원뿔
truncated=잘린
sphere|spherical=구형
hemispherical=반구형
semicircular=반원형
semicylindrical=반원기둥형
disc=원판
ball=공
block=덩어리
solid=속이 찬
hollow=속이 빈
taper|tapered=점차 가늘어지는
curve|curved|curving=휜
curvature=굽은 정도
arc|arch|arched=활 모양
straight=곧은
slanting|sloping|diagonal=비스듬한
drooping|hanging=늘어진
curled|coiled=감긴
splay|splaying=벌어진
flared|expanded|spread=벌어진
contracted|constricted=오므라든
bulging=불룩한
point|pointed|sharp=뾰족한
flush|even=평평한
openwork=투각
relief=부조
applied=덧붙인
incised|engraved=새긴
cast=주조한
inlaid=상감
gold=금
silver=은
iron=철
bronze=청동
brown=갈색
grayish=회색빛
green=녹색
red=붉은
vermilion=주홍색
luster=광택
damaged|fragmentary=파손된
surviving=남아 있는
worn|indistinct=닳아 불분명한
decoration|decorative|decorated=장식
motif|motifs|pattern|design|mark|marking=무늬
undecorated=민무늬
background=바탕
line|lines=선
dot|spot=점
beads=구슬
pearl=구슬
rope|cord=끈
braid|braided=꼰 끈
twisted=꼬인
thread|threads=실
woven=엮은
ribbon=리본
mesh|net|grid=그물
striped=줄
scroll|scrolling=덩굴
whorl|spiral=나선
wave|wavy|ripple=물결
cloud=구름
thunder=번개
water=물
sea|ocean=바다
flame=불꽃
sun=해
moon=달
star=별
mountain|peak|peaks=산봉우리
leaf|leaves=잎
petal|petals=꽃잎
flower|flowers|blossom|blossoms|floral=꽃
foliage=잎사귀
stem|stems|branches=줄기
veins=잎맥
calyx=꽃받침
lotus=연꽃
plum=매화
chrysanthemum=국화
mallow=아욱꽃
banana=파초
gourd=표주박
olive=올리브
seedpod=씨방
millet|grain=곡식 알갱이
bamboo=대나무
animal|animals|creature=동물
mask=얼굴
dragon|dragons=용
serpent|snake=뱀
bird|birds=새
phoenix=봉황
luan=난조
heron=왜가리
tiger=호랑이
ox=소
elephant=코끼리
lion=사자
carp=잉어
cicada=매미
butterfly=나비
mantis=사마귀
dragonfly=잠자리
insect=곤충
silkworm=누에
chrysalis=번데기
pangolin=천산갑
cowrie=조개
human=사람
figure=형상
children=동자
immortal=신선
dancing=춤추는
feather|feathered=깃털
flying|soaring=나는
recumbent=누운
standing=선
headless=머리가 없는
looking=바라보는
backward=뒤돌아보는
playing|play=노는
holding=물고 있는
boat=배
rowing=노를 젓는
race=경주
sacred=신성한
auspicious=길상
treasure|treasures|precious=보배
vase|vessel=병
dharma=법
wheel=바퀴
victory=승리
emblem=상징
knot=매듭
longevity=장수
coral=산호
banner|ceremonial=깃발
streaming=나부끼는
coin=동전
quan=천
wuzhu=오수전
symbol|symbols|symbolic=기호
character|radical=글자
stroke=획
heavenly=천간
trigrams=괘
zodiac=십이지
symmetrical=대칭
interlaced|intertwined|intertwining|interlinked|interlocking=서로 얽힌
linked|joined|connected=이어진
continuous=연속
concentric=동심
overlapping=겹친
scattered=흩어진
sparse=성긴
dense=촘촘한
simple|simplified=간략한
stylized|variant=변형된
compound|multiple=여러 겹
double|two|pair|pairs=두
single|one=한
three=세
four=네
five=다섯
six=여섯
eight=여덟
twelve=열두
half=반
tier|tiered=단
segment|segments|node=마디
groups=묶음
rows=줄
circuits=겹
items=개
piece=조각
direction=방향
horizontal=가로
vertical=세로
east=동쪽
west=서쪽
north=북쪽
south=남쪽
northern=북부
southern=남부
east–west=동서
north–south=남북
chinese=중국
source=원문
fragment=일부
spelling=표기
abbreviation=약기
notes=기록
additional=추가
retained=유지
ambiguous=불명확
entry=기록
labels=표기
includes=포함
present=있음
provided=있는
extensively=넓게
throughout=전체에
surround=둘러싼
separated=분리된
appear=나타나는
allow=가능한
their=그
equal=같은
greater=큰
through=뚫린
units=단위
traditional=전통
cm=cm
mm=mm
kg=kg
chi=척
cun=촌
fen=푼
ba=파
shu=촉
taotie=도철
kui=기
gou=구
han=한
huo=화
jia=갑
jing=경
mao=모
mi=미
pie=삐에
qie=절
ren=인
wang=왕
you=유
gui=규
ruyi=여의
jian=건
apex=꼭대기
aquatic=수생
barrel=통
basket=바구니
blade=칼날
bow=활
bowl=그릇
bridge=다리
bubble=둥근 돌기
canine=송곳니
carpenter=목공용
chevron=갈매기형
comb=빗살
crests=볏
cross=십자
deng=등
diamond=마름모
droplet=물방울
due=때문에
either=어느 한쪽
embroidered=수놓은
facing=향한
fold|folded=접힌
honeycomb=벌집
hook=갈고리
hoop=테
inverted=뒤집힌
lateral=옆
like=같은
main=주요
mat=자리
medallion=원형 장식
mushroom=버섯
mutually=서로
no=없는
passage=통로
pendant=드리개
radiating=방사형
rays=햇살
rotating=회전
sawtooth=톱니
scale=비늘
scepter=홀
seam=이음새
silk=비단
style=방식
suspension=매다는
tablet=판
tile=기와
tomb=무덤
tooth=이빨
trumpet=나팔
umbrella=우산
wedge=쐐기
yuan=원
zigzag=지그재그
` .trim().split('\n')) {
  const split = group.lastIndexOf('=')
  for (const word of group.slice(0, split).split('|')) words[word] = group.slice(split + 1)
}
