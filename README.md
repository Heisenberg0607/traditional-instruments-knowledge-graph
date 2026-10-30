# Knowledge Graph of Traditional Chinese Musical Instrument Artifacts

[English](README.md) | [한국어](README.ko.md) | [简体中文](README.zh-CN.md)

This is a team project completed for a knowledge graph course.

**Brief project description:**
This project extracts data from books on traditional Chinese musical instruments and builds an ontology-based knowledge graph. Scanned PDFs were converted to text with MinerU, and a subset of the data was manually annotated. Rule-based extraction was combined with named entity recognition and relation extraction using BERT-family models to structure the data. LLM-based extraction was evaluated in comparative experiments, and the final data was connected to a demo website supporting statistical visualization and artifact search.

[Visit the demo website](https://traditional-instruments-knowledge-g.vercel.app/)

## Website Language Support

The language menu at the top offers 中文, English, and 한국어. The selection persists across page navigation and refreshes; Chinese is the default. Translations cover menus, filters, detail fields, charts and tooltips, instrument classifications, and common period and region names. Korean and English classification names, such as `상하이 용종` and `Shanghai Yongzhong`, can also be used for searches.

## Project Overview

**Problem:** Descriptions of the form, excavation site, period, and collection of traditional Chinese musical instrument artifacts are scattered across individual entries in the literature. This makes it difficult to find artifacts that meet specific criteria or explore their relationships together. The project focuses on organizing these descriptions into interconnected data.

**Approach:** Materials from 《中国音乐文物大系》 were organized, and instruments, parts, materials, decorative motifs, periods, places, and institutions were modeled in an ontology. The team combined rule-based extraction with BERT-based entity recognition and relation extraction to construct the graph, and implemented a Vue and D3 demo for exploring the results.

**Use of the results:** Users can search artifact records by keywords and filters such as region and instrument type, and inspect detailed attributes, extraction results, and similar artifacts. Charts show distributions by instrument type, region, and period, as well as co-occurrence based on excavation sites.

- Main deliverables: demo data with 1,080 records, an ontology schema, a graph database dump, and a search and visualization web demo.
- Personal responsibilities: OCR, data preprocessing, data annotation, ontology construction, and participation in BERT modeling and training.
- Project status: a completed course team project.

## Key Results and Representative Images

The web demo provides search and filtering, artifact detail views, and recommendations of similar artifacts. The statistics page supports exploration of distributions by instrument type, region, and period, as well as co-occurrence based on excavation sites. The following figures show the web demo, ontology design, and Neo4j exploration results.

### Figure 1. Statistical dashboard by instrument type, region, and period

![Web demo statistics showing the instrument type hierarchy and distributions by region and period](docs/images/demo-statistics.png)

This view summarizes the scale and distribution of 1,080 artifact records. A sunburst chart presents instrument classifications, while donut charts show regional and chronological distributions. Record counts and counts of physical artifacts on the screen are separate measures.

### Figure 2. Knowledge graph schema centered on instruments

![Ontology schema connecting instruments with physical characteristics, archaeological context, and musical performance](docs/schema/schema.png)

The schema connects instruments to parts, materials, decorative motifs, inscriptions, historical periods, excavation sites, institutions, literature, people, and musical performance. It shows both the data properties of each class and the relationships between classes.

### Figure 3. Instrument class hierarchy with detailed idiophone categories

![Instrument class hierarchy expanding idiophones by playing method and specific type](docs/schema/report-instrument-hierarchy.jpeg)

This instrument class hierarchy appears in the knowledge extraction report. It includes upper-level categories such as idiophones, chordophones, aerophones, and membranophones, and subdivides idiophones—the actual research focus—by playing method and specific types such as bells and chime stones. The scope of the overall ontology design is broader than the idiophone dataset used in this demo.

### Figure 4. Class hierarchy for standardizing part terminology

![Instrument part hierarchy separating common parts from idiophone, bell, and bronze drum parts](docs/schema/part-hierarchy.png)

Instrument parts are divided into common parts and parts specific to instrument families, with idiophone parts further subdivided into bell and bronze drum parts. This hierarchy provides a reference for mapping part expressions in the literature to shared concepts and organizing dimensional and morphological attributes for each part.

### Figure 5. Connecting an individual artifact to its parts, material, and excavation site

![Neo4j subgraph linking a single artifact to its parts, material, inscription, and excavation site](docs/images/artifact-subgraph.png)

This Neo4j exploration example shows the parts, copper material, inscription, and excavation site connected to a selected artifact. The right panel displays attributes including the record ID, archaeological description, form, and dimensions.

### Figure 6. Exploring artifacts in the same collection and their excavation sites

![Neo4j subgraph showing multiple artifacts connected to the same collecting institution and their excavation sites](docs/images/location-institution-subgraph.png)

The graph connects several instruments held by the same institution to their respective excavation sites. Users can follow relationships from the institution to artifacts and from artifacts to excavation sites. Figures 5 and 6 are separate Neo4j/Cypher exploration views.

## Personal Contributions

- OCR: used MinerU to extract Chinese text from image-based PDF books.
- Data preprocessing: organized paragraphs and fields in the OCR output and split the text into artifact records to prepare annotation tasks and model inputs.
- Data annotation: participated in manual annotation using Label Studio.
- Ontology construction: participated in modeling domain concepts and relationships with Protégé, referencing the classical-music ontology framework.
- BERT modeling: participated in modeling and training BERT-family models for named entity recognition and relation extraction.

## Data and Preprocessing

The data comes from 15 regional volumes of 《中国音乐文物大系》. The final dataset contains 1,080 artifact records centered on idiophones, of which 533 include musical performance information. The report gives a total of 2,817 physical artifacts. Since one record can describe multiple physical artifacts, record counts and artifact quantities are distinguished.

The source material consists of scanned PDF books in which text is stored as images. MinerU was used for Chinese OCR and document layout analysis, followed by Python processing to clean the text and split it into artifact records. Text with standardized fields was imported into Label Studio, and a total of 206 idiophone records from the Hubei and Beijing volumes were manually annotated.

`src/data/artifacts.json` contains basic fields such as artifact name, instrument type, period, institution, excavation site, and literature, along with source text, entities, and relations under `标注部分`. Entities include text, labels, and start and end positions; relations contain subjects, objects, types, and confidence values. All 1,080 record IDs are unique.

The following one-line example selects only key fields from the first record in the [actual JSON source](https://github.com/Heisenberg0607/traditional-instruments-knowledge-graph/blob/main/src/data/artifacts.json). Entities, relations, and other fields are omitted.

```json
{"record_id": "shandong_0017", "器物名称": "青州苏埠屯8号墓编铙", "乐器类型": "铙", "数量": "3", "时代": "商代晚期", "机构": "山东省文物考古研究所", "出土地点": "青州苏埠屯8号商代墓"}
```

This record describes 3 late Shang bian nao (编铙) excavated from Tomb No. 8 at Subutun, Qingzhou, as a single record, together with their instrument type, period, collecting institution, and excavation site.

## Construction Methods and System Architecture

| Stage | Method and role |
| --- | --- |
| Literature digitization | Apply MinerU's Chinese OCR and layout analysis to image-based PDF books to obtain machine-readable text |
| Preprocessing and manual annotation | Use Python to clean text, split artifact records, and standardize fields, then manually annotate in Label Studio |
| Ontology modeling | Reference the classical-music ontology framework and use Protégé to connect instruments, parts, materials, and decorative motifs with historical and excavation contexts |
| Rule-based extraction | Extract relatively consistently formatted record-level fields such as artifact name, type, period, institution, excavation site, identifiers, and literature |
| BERT named entity recognition | Use `hfl/chinese-roberta-wwm-ext` with BIOES and CRF to recognize 5 types: instrument parts, decorative motifs, data attributes, institutions, and excavation sites |
| BERT relation extraction | Mark entity pairs with `[E1]` and `[E2]`, feed them into RoBERTa, and classify relations such as overall dimensions, part dimensions, quantities, and shape descriptions |
| Rule-based postprocessing | Remove duplicates, merge fields, validate overall and part attributes, preserve identifier formats, and correct location boundaries |
| LLM comparative experiments | Compare prompting, 5-shot, and fine-tuning settings for Qwen2.5-7B and Qwen3-14B; adopt rules + BERT for final extraction |
| Graph construction | Integrate entities and relations according to the ontology, store them in Neo4j, and explore them with Cypher |
| Web exploration | Build views with Vue 3 and Vue Router, manage data with Pinia, and visualize distributions and relationships with D3 |

The processing flow is **scanned PDFs → MinerU OCR → text preprocessing → manual annotation of a subset of records → rules + BERT extraction → rule-based postprocessing → ontology-guided graph and JSON construction → search and visualization**. The ontology provides shared concepts and relationships for annotation, extraction, and graph construction; LLMs were used in comparative extraction experiments.

The web demo reads local JSON. Search uses string matching, while similar-artifact recommendations use a weighted sum of part overlap (0.4), decorative motif overlap (0.4), and chronological proximity (0.2). These weights are configuration values for the recommendation rules.

## Evaluation Methods and Results

### Evaluation criteria

Precision, Recall, and F1 are summarized from the experiments in Chapters 4–6 of the knowledge extraction report. All performance values below are percentages (%). The BERT experiments used an 8:1:1 training/validation/test split. Strict NER evaluation requires matching entity boundaries and types; RE evaluation requires matching the subject, object, and relation type.

The LLM experiments distinguish strict and relaxed matching. Relaxed matching allows boundary differences involving units or some prefixes and suffixes when labels agree and the differences satisfy the rules. The 5 BERT NER types are parts, decorative motifs, data attributes, institutions, and excavation sites; the 5 LLM NER types are instruments, parts, excavation sites, data attributes, and institutions. The values below therefore describe each experimental setting and should not be interpreted as a direct ranking under identical labels and evaluation sets.

### BERT-family model results

| Task | Setting | Precision | Recall | F1 |
| --- | --- | ---: | ---: | ---: |
| Named entity recognition (NER) | BIOES + RoBERTa + CRF | 77.27 | 75.22 | **76.23** |
| Relation extraction (RE) | RoBERTa relation classification with gold entities | 72.00 | 94.74 | **81.82** |

NER F1 improved from 71.00% for the BIO + RoBERTa baseline to 73.00% with BIOES and 76.23% after adding CRF. The final model improved by **5.23 percentage points** over the baseline. By entity type, F1 reached 94.12% for excavation sites and 85.71% for decorative motifs, while institutions scored 50.00% and require further improvement.

### LLM results

| Task | Model and setting | Precision | Recall | F1 |
| --- | --- | ---: | ---: | ---: |
| NER | Qwen2.5-7B, simple prompt, no fine-tuning | 24.79 | 37.04 | 29.70 |
| NER, strict matching | Qwen3-14B, prompt optimization + 5-shot | 47.61 | 60.72 | **53.37** |
| NER, relaxed matching | Qwen3-14B, prompt optimization + 5-shot | 56.46 | 72.01 | **63.29** |
| NER, strict matching | Qwen3-14B, prompt optimization + 5-shot + fine-tuning | 45.67 | 57.89 | 51.06 |
| NER, relaxed matching | Qwen3-14B, prompt optimization + 5-shot + fine-tuning | 55.88 | 70.83 | 62.48 |
| RE with gold entities | Qwen2.5-7B, simple prompt, no fine-tuning | 8.06 | 13.89 | 10.20 |
| RE with gold entities | Qwen3-14B, prompt optimization + 5-shot | 87.62 | 84.79 | 86.18 |
| RE with gold entities | Qwen3-14B, fine-tuned/deployed version in the report | 88.32 | 85.14 | **86.70** |

### Pipeline evaluation with predicted entities

The RE tables above assume that gold entities are provided. In actual processing, passing NER predictions to RE propagates errors to the next stage, so this setting is reported separately.

| Task | Input or condition | Precision | Recall | F1 |
| --- | --- | ---: | ---: | ---: |
| BERT pipeline RE | Predicted NER entities | Not reported | Not reported | **Approx. 5.56** |
| Qwen3-14B pipeline NER | Strict matching | 46.47 | 60.95 | 52.73 |
| Qwen3-14B pipeline NER | Relaxed matching | 55.77 | 73.14 | 63.28 |
| Qwen3-14B pipeline RE | Predicted NER entities | 28.15 | 35.02 | **31.21** |

Entity boundary errors substantially reduced relation extraction performance for both model families. The final construction approach was **rule-based extraction + BERT extraction + rule-based postprocessing**, considering output stability, reproducibility, and ease of correction. The pipeline values above are results from the respective model experiments; the report does not provide a separate accuracy evaluation of the final rule-combined approach.

### Data and deliverable scale

| Item | Basis | Result |
| --- | --- | --- |
| Demo JSON scale | Direct count of `src/data/artifacts.json` | 1,080 records, 23,394 entity entries, and 8,951 relation entries |
| Literature and artifact coverage | Knowledge extraction report | 15 regional volumes, 2,817 physical artifacts in total, and 533 records with musical performance information |
| Manual annotation | Knowledge extraction report | A total of 206 idiophone records from the Hubei and Beijing volumes |
| Graph documentation scale | Values listed in `docs/schema/classes.csv` | 1,170 instrument nodes |

Entity and relation entry counts describe the file contents and include repeated mentions. Instrument nodes in the graph, demo records, and physical artifacts have different counting scopes. Model extraction performance and web search/recommendation quality are also separate evaluation targets; quantitative evaluation of search and recommendations remains future work.

## Installation and Execution

Run the following commands from the repository root in an environment with Node.js and npm.

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

Open the development site at the address printed by Vite. The web demo runs on the included JSON. Graph database materials are available in the [dump file](data/graph/知识图谱文件.dump), and exploration examples are provided as [Cypher queries](docs/queries.cypher) and an [original Word document with figures](docs/original/cypher-queries.docx). Restore the database in a separate Neo4j environment.

## Main Directory Structure

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

## Limitations and Future Improvements

- Reproducibility: currently published materials focus on result data, the graph dump, design documents, and the exploration demo. Reproducing OCR and extraction also requires organizing the processing code and execution settings.
- Data consistency: the counting scopes of demo records and graph nodes need to be aligned, and the provenance of source text, annotations, and extraction results needs to be linked.
- Evaluation: the report includes BERT and LLM extraction evaluations, but comparisons with unified labels and evaluation sets and a separate evaluation of the final rule-combined pipeline are needed. Quantitative evaluation of OCR and search/recommendation quality also remains future work.
- Statistical interpretation: regions are estimated heuristically, and unknown quantities are treated as 1. The literature's coverage and the counting rules should be considered together.

## References and Terms of Use

- [Original final poster](docs/original/final-poster.pptx)
- [Cypher exploration examples and graph views](docs/original/cypher-queries.docx)
- [Core class schema](docs/schema/classes.csv) · [Relation schema](docs/schema/relations.csv)
- Literature source: 《中国音乐文物大系》.

This is a joint deliverable of a course team project. Use and redistribution of the literature data, images, and code are subject to the rights associated with each resource and the team's agreements.
