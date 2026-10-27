// Supplied query examples; not executed against the database in this review.
MATCH (i:乐器 {name:'芦古城子遗址镈于'})
OPTIONAL MATCH p=(i)-[]->()
RETURN p;

MATCH p=(c:本体类 {name:'乐器'})<-[:`subclass of`*1..3]-(sub:本体类)
RETURN p;

MATCH p=(i:乐器)-[:制作于时期]->(t:历史时期)
WHERE t.name CONTAINS '春秋'
RETURN p LIMIT 30;

MATCH p=(place:出土地点)<-[:出土自]-(i:乐器)-[:现藏于]->(org:机构)
RETURN p;

MATCH p=(i:乐器)-[:有纹饰]->(w:纹饰)<-[:有纹饰]-(j:乐器)
WHERE i <> j
RETURN p;
