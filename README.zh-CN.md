# 中国传统乐器考古文物知识图谱

课程小组项目：通过 BERT 命名实体识别与 LLM 关系抽取，将考古文献中的乐器描述结构化，连接领域本体、知识图谱与检索可视化演示系统。

[English](README.md) | [한국어](README.ko.md) | [简体中文](README.zh-CN.md)

## 项目概述

问题定义：中国传统乐器文物的形制、出土地点、时代和收藏信息分散在文献条目中，难以按条件检索并同时考察文物之间的关联。本项目着重将这些描述整理为可连接的结构化数据。

解决方法：团队整理《中国音乐文物大系》相关资料，使用领域本体组织乐器、部件、材质、纹饰、时代、地点和机构。通过 BERT 识别实体、LLM 抽取语义关系并构建图谱，再以 Vue 和 D3 演示系统支持结果探索。

成果用途：用户可以按关键词、地区、乐器类型等条件检索和筛选文物记录，查看属性、抽取结果及相似文物。图表支持探索器类、地区、时代分布，以及按出土地点统计的共现关系。

- 主要成果：1,080 条记录的演示数据、本体 Schema、图数据库 dump、检索与可视化网页演示。
- 个人职责：OCR、数据预处理、数据标注、本体构建。
- 项目性质：已完成的课程小组项目。

## 主要成果与代表图片

网页演示提供检索、筛选、文物详情及相似推荐。可视化涵盖器类层级、地区分布、地区×器类热力图、各时代器类分布，以及按出土地点统计的乐器共现关系。独立的 Cypher 材料展示单件文物的关联，以及出土地点与收藏机构之间的连接。

以下图片来自团队原始演示、本体结构图和 Cypher 文档。乐器与部件层级图展示的本体设计范围大于演示系统以体鸣乐器为主的范围。

![检索与可视化演示的统计页面](docs/images/demo-statistics.png)

![本体总体 Schema](docs/schema/schema.png)

![单件文物的属性与关联](docs/images/artifact-subgraph.png)

![出土地点、乐器与收藏机构的连接](docs/images/location-institution-subgraph.png)

![乐器核心类层级](docs/schema/instrument-hierarchy.png)

![乐器部件类层级](docs/schema/part-hierarchy.png)

## 个人贡献

- OCR：负责原始材料的文字识别工作。
- 数据预处理：整理原始材料，为后续工作准备数据。
- 数据标注：参与文献数据的标注工作。
- 本体构建：参与通过本体构建组织领域知识。

## 数据与预处理

数据来源于《中国音乐文物大系》，海报以湖北卷、北京卷、陕西卷为代表性资料。演示 JSON 还包含其他地区的记录。

通过文献整理与标注，将文物基本信息和基于文本的抽取结果组织为可联合探索的数据。`src/data/artifacts.json` 包含器物名称、乐器类型、时代、机构、出土地点、文献等字段，以及实体和关系条目。实体包含文本、标签和位置偏移；关系包含主语、宾语、类型与置信度。

1,080 条记录的 ID 均唯一。一条记录可能描述多件实物，因此记录数与实物数量分别理解。

## 构建方法与系统结构

| 阶段 | 方法与作用 |
| --- | --- |
| 文献整理与标注 | 整理非结构化描述，为实体识别准备数据 |
| 本体建模 | 参考 classical-music 本体框架，连接乐器、部件、材质、纹饰及历史和出土背景 |
| BERT 命名实体识别 | 识别文献中的乐器名称、时代、材质、形制、出土地、收藏地等实体 |
| LLM 关系抽取 | 抽取乐器与时代、地域、材质、用途、文献来源之间的语义关系 |
| 图谱构建 | 整合实体与关系，保存为 Neo4j 图数据库并通过 Cypher 探索 |
| 网页探索 | Vue 3 与 Vue Router 组织页面，Pinia 管理数据，D3 展示分布与关联 |

网页演示读取本地 JSON。检索采用字符串匹配。相似文物推荐将部件重合度、纹饰重合度和时代接近度按 0.4、0.4、0.2 加权求和，这些权重是推荐规则的组成参数。

## 评估方法与结果

| 核查对象 | 方法 | 结果 |
| --- | --- | --- |
| 演示数据规模 | 直接统计 JSON 记录与条目 | 1,080 条记录、23,394 个实体条目、8,951 个关系条目 |
| 图谱文档规模 | `docs/schema/classes.csv` 记载值 | 1,170 个乐器节点 |
| 前端构建 | Node.js 24.22.1 / npm 11.9.0 环境安装依赖并构建 | `npm ci`、`npm run build` 通过 |

实体和关系条目数反映导出文件规模，包含重复提及。乐器节点数来自 Schema 文档，与演示记录的统计范围不同。这些结果体现数据与成果规模及构建验证；抽取准确率和检索质量属于后续评估内容。

## 安装与运行

在安装 Node.js 和 npm 的环境中，于仓库根目录运行：

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

在 Vite 输出的地址打开开发页面。网页演示使用所附 JSON 运行。图谱资源见 [数据库 dump](data/graph/知识图谱文件.dump)、[Cypher 查询](docs/queries.cypher) 和 [含插图的 Word 原件](docs/original/cypher-queries.docx)。数据库恢复需要另行准备 Neo4j 环境。

## 主要目录结构

```text
src/
  data/artifacts.json
  stores/artifactStore.js
  utils/statisticsData.js
  views/
data/graph/
  知识图谱文件.dump
docs/
  images/
  schema/
    classes.csv
    relations.csv
  original/
    final-poster.pptx
    cypher-queries.docx
  queries.cypher
package.json
package-lock.json
README.md
README.ko.md
README.zh-CN.md
```

## 局限与后续工作

- 可复现范围：当前公开材料以结果数据、图谱 dump、设计文档和探索演示为主。复现 OCR 与抽取阶段还需要配套整理处理代码和运行配置。
- 数据一致性：统一演示记录与图谱节点的统计范围，连接原文、标注和抽取结果的来源记录。
- 评估：整理标注规范与测试集，分别评估 OCR、实体识别、关系抽取和检索。
- 统计解读：地区推断采用启发式规则，未知数量默认按 1 处理。解读图表时需要考虑文献覆盖范围与统计规则。

## 参考资料与使用条件

- [期末海报原件](docs/original/final-poster.pptx)
- [Cypher 探索案例与图谱画面](docs/original/cypher-queries.docx)
- [核心类 Schema](docs/schema/classes.csv) · [关系 Schema](docs/schema/relations.csv)
- 文献来源：《中国音乐文物大系》。

本项目为课程小组共同成果。文献数据、图片与代码的使用和再分发应遵循各项材料的权利及团队约定。
