import 'dotenv/config'
import mongoose from 'mongoose'
import { Profile } from './models/Profile'
import { Blog } from './models/Blog'
import { Project } from './models/Project'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-blog'

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  await Profile.deleteMany({})
  await Blog.deleteMany({})
  await Project.deleteMany({})

  await Profile.create({
    name: 'Jiahua Duojie',
    title: 'Human-Centered AI Researcher | Data Scientist | MSc Student',
    bio: 'I am a Human-centered AI researcher focused on designing systems where LLMs perform structured analytical work while humans retain control over interpretation and critical decisions. My MSc thesis engineers a reproducible, privacy-preserving LLM agent that delivers personality-adaptive coaching, advancing the development of trustworthy personalized support systems.\n\nMy research focuses on agentic AI workflows, privacy-preserving local LLM systems, and human-in-the-loop evaluation frameworks. I aim to build AI technologies that extend human expertise in sensitive domains such as health, research, and decision-making.\n\nOutside the lab, I enjoy exploring the intersection of technology and Tibetan contemplative practices, cooking, and learning new languages.',
    avatar: '',
    motto: 'Technology must enhance our intelligence, not replace us.',
    socialLinks: {
      github: 'https://github.com/jahua',
      linkedin: 'https://www.linkedin.com/in/duojie-jiahua/',
      email: 'jiahua.duojie@hotmail.com',
    },
    academicProfiles: {
      orcid: 'https://orcid.org/0009-0008-4656-1977',
    },
    cvUrl: '/cv.pdf',
    researchProfile: 'Human-centered AI researcher focused on designing systems where LLMs perform structured analytical work while humans retain control over interpretation and critical decisions. Engineering reproducible, privacy-preserving LLM agents for trustworthy personalized support systems.',
    researchInterests: [
      'Agentic AI & Workflow Automation',
      'LLM Evaluation & Benchmarking',
      'Privacy-Preserving Local LLM',
      'Adaptive Conversational AI',
      'Human-in-the-Loop Design',
      'AI for Health & Social Science'
    ],
    education: [
      {
        degree: 'MSc Applied Information and Data Science',
        meta: 'Lucerne University of Applied Sciences and Arts (HSLU) · 2023 – Sep 2026',
        thesis: 'Adaptive LLM-Based Chatbot with Personality-Aware Dialogue for Human-Centered Applications: A Formal Preliminary Study Focused on Swiss Informal Caregivers',
        supervisor: 'Prof. Dr. Guang Lu · Advisor: Samuel Devdas'
      },
      {
        degree: 'BEng Computer Science',
        meta: 'Nankai University, Tianjin, China · 2013–2017 · GPA 83/100'
      }
    ],
    publications: [
      { badge: 'In Preparation', title: 'Adaptive LLM-Based Chatbot with Personality-Aware Dialogue for Human-Centered Applications', meta: 'Duojie, J. (2026) · MSc Thesis, HSLU' },
      { badge: '2024', title: 'Tourism Data Chatbot for Complex Data Access', meta: 'Duojie, J. (2024) · Internal Research Report, HSLU' }
    ],
    experience: [
      { role: 'Data Engineer', meta: 'Qinghai Big Data Co., Ltd. · 01/2021 – 12/2022', responsibilities: ['Architected IoT sensor data pipelines for large-scale collection, processing, and streaming into cloud data lakes', 'Designed and optimised ETL workflows using SQL, Python, and Apache Airflow', 'Built cloud data lakes on AWS and Azure with monitoring, logging, and alerting'] },
      { role: 'Project Manager', meta: 'Darui Media & Tech · 02/2017 – 11/2020', responsibilities: ['Led development of web applications and e-commerce platforms with integrated stock management', 'Managed microservices deployment pipelines and distributed system releases', 'Designed PostgreSQL databases for product catalogues, inventory, and customer data'] },
      { role: 'Web Developer', meta: 'Himalaya Travel Service · 04/2012 – 01/2017', responsibilities: ['Developed responsive booking platform with custom modules and SEO optimisation', 'Integrated secure payment systems and built sales performance reporting'] }
    ],
    skills: [
      { category: 'Agentic Workflows', items: ['LangGraph', 'CrewAI', 'AutoGen', 'N8N', 'ReAct Prompting'] },
      { category: 'LLM & Post-Training', items: ['HuggingFace', 'Ollama', 'LangChain', 'LlamaIndex', 'LoRA/QLoRA', 'Prompt Engineering'] },
      { category: 'AI Evaluation', items: ['RAGAS', 'DeepEval', 'LangSmith', 'Langfuse', 'G-Eval', "Cohen's κ"] },
      { category: 'Data Engineering', items: ['Airflow', 'Kafka', 'Spark', 'Databricks', 'PostgreSQL', 'MongoDB', 'Redis'] },
      { category: 'Cloud & DevOps', items: ['AWS', 'Azure AI', 'Docker', 'Kubernetes', 'CI/CD'] },
      { category: 'Programming', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'PHP', 'C#'] }
    ],
    certifications: [
      { title: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals', meta: 'SC-900 · March 2025' }
    ],
    languages: [
      { name: 'Chinese (Mandarin) & Tibetan', proficiency: 'Native' },
      { name: 'English', proficiency: 'Fluent (professional and academic)' },
      { name: 'German', proficiency: 'A2 · B1 course in progress (target June 2026)' }
    ]
  })

  const blogs = [
    {
      title: 'Building Personality-Adaptive LLM Agents: Lessons from My MSc Thesis',
      slug: 'personality-adaptive-llm-agents',
      summary:
        'How I designed a six-stage agentic pipeline that stabilises Big Five personality estimates across dialogue turns using confidence-aware EMA smoothing — enabling trustworthy personalisation without clinical labels.',
      content: `# Building Personality-Adaptive LLM Agents

## The Problem

Per-turn personality estimates from LLMs are volatile — each utterance reveals only a partial, context-dependent signal. Naïve trait inference produces unstable downstream behaviour, which is particularly harmful for vulnerable users such as caregivers under chronic stress.

## The Approach

My MSc thesis at HSLU tackles this with a **six-stage agentic pipeline**:

1. **Ingest** — Parse and normalise user input
2. **Detect** — LLM-based Big Five trait inference with confidence scores
3. **Regulate** — Confidence-aware EMA smoothing (α = 0.3; turns below confidence 0.4 discarded)
4. **Generate** — Personality-adapted response using the Zurich Model of Social Motivation
5. **Verify** — Automated quality-gating (conversations below κ = 0.70 escalate to human review)
6. **Persist** — Full JSONL audit trail for reproducibility

## Key Innovation: Confidence-Aware Temporal Smoothing

Instead of treating each turn's personality estimate as ground truth, I apply exponential moving average smoothing weighted by the model's own confidence. This produces stable OCEAN trait profiles that enable consistent downstream personalisation.

## Tech Stack

- **LLMs**: GPT-4.1, Gemini 2.5 Pro
- **Orchestration**: N8N with deterministic JSON contracts
- **Storage**: PostgreSQL, Redis
- **Deployment**: Docker Compose
- **Compliance**: Swiss FADP (rev. 2023)

## Evaluation Protocol

Three-stream evaluation:
- Expert pilot study
- N ≥ 250 simulated conversations
- Real caregiver testing (n = 20–30)
- Inter-rater reliability threshold: κ ≥ 0.75

## Takeaways

Building AI for vulnerable populations requires fundamentally different engineering choices. Every design decision must prioritise stability, transparency, and human oversight over raw capability.`,
      coverImage: '',
      tags: ['LLM', 'Agentic AI', 'Personality', 'Research', 'Thesis'],
      published: true,
    },
    {
      title: 'Agentic RAG for Tourism Data: Beyond Simple Retrieval',
      slug: 'agentic-rag-tourism-data',
      summary:
        'How I built an intention-aware query routing system with automated multi-step retrieval flows for complex tourism analytics — moving beyond simple RAG to agentic data access.',
      content: `# Agentic RAG for Tourism Data

## Beyond Simple Q&A

Standard RAG systems retrieve documents and generate answers. But tourism data analysis requires something more — understanding user *intent* and orchestrating multi-step analytical workflows.

## Architecture

The Tourism Data Chatbot uses an **agentic RAG architecture** with:

- **Intention-Aware Query Routing**: Classifies queries into analytical categories (trend analysis, comparison, forecasting) and routes to specialised retrieval pipelines
- **Multi-Step Retrieval**: Complex queries trigger automated chains — e.g., "Compare visitor trends across Swiss regions" decomposes into parallel sub-queries
- **Structured Output**: Results formatted for both natural language responses and data visualisations

## Tech Stack

- **Frontend**: Streamlit
- **Models**: HuggingFace Transformers
- **Database**: PostgreSQL
- **Cloud**: Azure

## Lessons Learned

1. Intent classification is more important than retrieval quality for complex data queries
2. Structured intermediate representations between retrieval and generation improve factual accuracy
3. Users trust systems more when they can see the analytical steps

[View on GitHub → github.com/jahua/chatbot](https://github.com/jahua/chatbot)

See also the [RAG-chat](https://github.com/jahua/RAG-chat) repo for a complementary document-based RAG system.`,
      coverImage: '',
      tags: ['RAG', 'Agentic AI', 'Tourism', 'NLP', 'Project'],
      published: true,
    },
    {
      title: 'Tibetan Language Technology: From Spell-Checking to TTS',
      slug: 'tibetan-language-technology',
      summary:
        'Exploring my contributions to Tibetan language technology — forking and extending FCH-TTS for Tibetan speech synthesis, working with Tibetan corpora, and building culturally-situated AI systems.',
      content: `# Tibetan Language Technology: From Spell-Checking to TTS

## Why Tibetan NLP Matters

Tibetan is a low-resource language with unique computational challenges — its agglutinative script, complex morphology, and limited digital corpora make it an underserved language in the NLP community. As a native Tibetan speaker and AI researcher, I feel a responsibility to contribute.

## FCH-TTS: Fast Text-to-Speech for Tibetan

I forked and extended the [FCH-TTS](https://github.com/jahua/FCH-TTS) project to include Tibetan language support. The model now handles English, Mandarin, Japanese, Korean, Russian, and Tibetan — making it one of the few open TTS systems supporting Tibetan.

Key challenges:
- **Tonal representation** — Tibetan's tonal system differs significantly from Mandarin
- **Script processing** — Tibetan Unicode handling requires specialised tokenisation
- **Data scarcity** — Limited paired text-audio datasets for training

## Tibetan Corpora

Working with the [Tibetan Corpora](https://github.com/jahua/Corpora) project (forked from Esukhia) provided essential training data for various NLP tasks.

## Culturally-Situated AI

My research proposal for [Uncertainty-Aware JITAI for Tibetan Mindfulness](/projects) takes this further — designing an AI system grounded in Tibetan contemplative practices for stress regulation.

## The Bigger Picture

Language technology for underrepresented languages isn't just a technical challenge — it's about preserving cultural heritage and ensuring AI benefits all communities.`,
      coverImage: '',
      tags: ['Tibetan', 'NLP', 'TTS', 'Low-Resource Languages', 'Cultural AI'],
      published: true,
    },
    {
      title: 'Privacy-Preserving Local LLM Deployment: A Practical Guide',
      slug: 'privacy-preserving-local-llm',
      summary:
        'Exploring practical approaches to deploying LLMs locally for sensitive applications — covering quantisation techniques (AWQ, GPTQ, GGUF), Ollama/LM Studio workflows, and Swiss FADP compliance.',
      content: `# Privacy-Preserving Local LLM Deployment

## Why Local?

When working with sensitive data — healthcare records, personal conversations, caregiver stress assessments — sending data to cloud APIs is often not an option. Swiss FADP (rev. 2023) and GDPR impose strict requirements on data handling.

## Quantisation: Making Large Models Fit

Modern quantisation techniques make it practical to run powerful models locally:

| Method | Precision | Use Case |
|--------|-----------|----------|
| **AWQ** | 4-bit | Production inference |
| **GPTQ** | 4-bit | GPU-optimised inference |
| **GGUF** | 2-8 bit | CPU/mixed inference (llama.cpp) |
| **LoRA/QLoRA** | Mixed | Fine-tuning with limited VRAM |

## Recommended Open-Weight Models (2025)

- **Llama 4** — Strong general reasoning
- **DeepSeek-V3** — Excellent code and analysis
- **Qwen3** — Competitive multilingual performance

## Local Deployment Tools

### Ollama
Best for quick experimentation and API-compatible serving.

### LM Studio
Excellent GUI for model management and testing.

## Compliance Checklist

- [ ] All data processed on-premise or in compliant cloud
- [ ] Pseudonymisation applied before any model inference
- [ ] Full audit trail (JSONL) for all interactions
- [ ] Data retention policies documented and enforced
- [ ] Human escalation path for edge cases

## Conclusion

Local LLM deployment is no longer a compromise — with the right quantisation and tooling, you can achieve production-quality inference while maintaining full data sovereignty.`,
      coverImage: '',
      tags: ['LLM', 'Privacy', 'Local Deployment', 'Swiss FADP', 'Tutorial'],
      published: true,
    },
    {
      title: 'From IoT Pipelines to LLM Agents: My Engineering Journey',
      slug: 'iot-pipelines-to-llm-agents',
      summary:
        'Reflecting on my path from building IoT data pipelines at scale in Qinghai to designing human-centered AI systems at HSLU — and how data engineering fundamentals shape better AI systems.',
      content: `# From IoT Pipelines to LLM Agents

## The Data Engineering Foundation

At Qinghai Big Data Co., I spent two years building IoT sensor data pipelines — collecting, processing, and streaming data from thousands of sensors into cloud data lakes. This experience taught me principles that directly apply to building reliable LLM systems:

1. **Data quality is upstream** — garbage in, garbage out applies equally to sensor data and training data
2. **Monitoring is not optional** — alerting frameworks saved us countless hours in production
3. **Local-first for sensitive data** — processing sensitive records on-premise was a governance requirement long before LLM privacy concerns

## The Entrepreneurial Chapter

At Darui Media & Tech, managing web application development and e-commerce platforms taught me about building systems that real users depend on. Microservices, PostgreSQL schema design, and deployment pipelines — these skills transfer directly to building production AI systems.

## The Research Pivot

At HSLU, I discovered my passion for human-centered AI. The question shifted from "can we build it?" to "should we build it this way?" — designing systems where AI augments human expertise rather than replacing human judgment.

## Key Insight

The best AI systems are built by engineers who understand both the infrastructure and the human context. Data engineering discipline makes AI systems reliable; human-centered design makes them trustworthy.`,
      coverImage: '',
      tags: ['Career', 'Data Engineering', 'AI', 'Reflection'],
      published: true,
    },
  ]

  await Blog.insertMany(blogs)

  console.log('Seed data inserted successfully')
  const projects = [
    // ── Research & Thesis ──────────────────────────────
    {
      title: 'Swiss Caregiver Coaching Assistant',
      repo: '',
      period: '2025–2026',
      category: 'MSc Thesis',
      section: 'Research & Thesis',
      description:
        'Privacy-preserving LLM agent delivering personality-adaptive coaching for Swiss informal caregivers. Addresses volatile per-turn personality estimates with confidence-aware EMA smoothing.',
      highlights: [
        'Six-stage agentic pipeline (Ingest → Detect → Regulate → Generate → Verify → Persist) via N8N',
        'Confidence-aware EMA smoothing (α = 0.3) stabilises OCEAN traits without clinical labels',
        'Zurich Model of Social Motivation maps traits to motivational directives',
        'RAG module for Swiss healthcare policy with automated citation verification',
        'Automated quality-gating: conversations below κ = 0.70 escalate to human review',
      ],
      stack: ['GPT-4.1', 'Gemini 2.5 Pro', 'N8N', 'PostgreSQL', 'Redis', 'Docker Compose'],
      links: [],
      order: 1,
    },
    {
      title: 'PhD Application – LLM4Humans',
      repo: 'phd-application-llm4humans',
      period: '2026',
      category: 'Research',
      section: 'Research & Thesis',
      language: 'Python',
      license: 'MIT',
      description:
        'Research materials and codebase for PhD application on human-centered LLM systems. Explores how large language models can be designed to augment rather than replace human decision-making.',
      highlights: [
        'Human-centered LLM system design principles',
        'Research proposal and experimental framework',
      ],
      stack: ['Python'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/phd-application-llm4humans', icon: 'github' }],
      order: 2,
    },
    {
      title: 'Personality-Adaptive Conversational AI',
      repo: '',
      period: '2024–2025',
      category: 'Research',
      section: 'Research & Thesis',
      description:
        'Multi-turn agentic loop integrating real-time Big Five detection with the Zurich Model of Social Motivation for context-modulated emotional support dialogue.',
      highlights: [
        'Structured behavioural regulation directives as intermediate representations',
        'Expert-reviewed evaluation with 100% adaptation accuracy in controlled simulation',
        'Manuscript in preparation',
      ],
      stack: ['PyTorch', 'LangChain', 'React'],
      links: [],
      order: 3,
    },
    {
      title: 'Uncertainty-Aware JITAI for Tibetan Mindfulness',
      repo: '',
      period: '2025',
      category: 'Research Proposal',
      section: 'Research & Thesis',
      description:
        'Just-In-Time Adaptive Intervention system combining multimodal physiological sensing, uncertainty quantification, and human-in-the-loop calibration for stress-regulation triggering.',
      highlights: [
        'Grounded in Tibetan contemplative practices as culturally-situated AI',
        'Multimodal physiological sensing with uncertainty quantification',
      ],
      stack: ['Multimodal Sensing', 'Uncertainty Quantification', 'HITL'],
      links: [],
      order: 4,
    },

    // ── AI & Machine Learning ──────────────────────────
    {
      title: 'Tourism Data RAG Chatbot',
      repo: 'chatbot',
      period: '2025',
      category: 'Applied AI',
      section: 'AI & Machine Learning',
      language: 'Python',
      license: 'MIT',
      stars: 1,
      description:
        'Agentic RAG system with intention-aware query routing and automated multi-step retrieval for complex tourism analytics. Features text-to-SQL generation for relational database access.',
      highlights: [
        'Intention-aware query routing for analytical question types',
        'Text-to-SQL generation for direct database querying',
        'Multi-step retrieval for complex analytical queries',
      ],
      stack: ['Python', 'RAG', 'Text2SQL', 'PostgreSQL', 'Azure'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/chatbot', icon: 'github' }],
      order: 1,
    },
    {
      title: 'RAG Chat',
      repo: 'RAG-chat',
      period: '2025',
      category: 'Applied AI',
      section: 'AI & Machine Learning',
      language: 'Python',
      license: 'MIT',
      description:
        'Retrieval-Augmented Generation chatbot for document-based conversational AI. Provides an interactive interface for querying and analysing document collections.',
      highlights: [
        'Document ingestion and vector store pipeline',
        'Conversational RAG with context-aware retrieval',
      ],
      stack: ['Python', 'RAG', 'LLM'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/RAG-chat', icon: 'github' }],
      order: 2,
    },
    {
      title: 'FCH-TTS: Multilingual Text-to-Speech',
      repo: 'FCH-TTS',
      period: '2026',
      category: 'NLP / Speech',
      section: 'AI & Machine Learning',
      language: 'Python',
      license: 'MIT',
      description:
        'Fast Text-to-Speech model supporting English, Mandarin/Chinese, Japanese, Korean, Russian, and Tibetan. Fork with contributions for Tibetan language support.',
      highlights: [
        'Multi-language TTS including Tibetan',
        'Fast inference for real-time speech synthesis',
      ],
      stack: ['Python', 'PyTorch', 'TTS'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/FCH-TTS', icon: 'github' }],
      order: 3,
    },
    {
      title: 'CV Colorization with GANs',
      repo: 'cv_colorization_Gan',
      period: '2024',
      category: 'Computer Vision',
      section: 'AI & Machine Learning',
      language: 'Jupyter Notebook',
      description:
        'Image colorization using Generative Adversarial Networks. Applies deep learning to automatically add colour to grayscale images.',
      highlights: [
        'GAN-based automatic image colorization',
        'Training pipeline with Jupyter notebooks',
      ],
      stack: ['Python', 'PyTorch', 'GANs', 'Jupyter'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/cv_colorization_Gan', icon: 'github' }],
      order: 4,
    },
    {
      title: 'Applied ML & Predictive Modelling',
      repo: 'MPM',
      period: '2023',
      category: 'Machine Learning',
      section: 'AI & Machine Learning',
      stars: 1,
      description:
        'Coursework and projects from Applied Machine Learning and Predictive Modelling class. Covers supervised/unsupervised learning, model evaluation, and real-world prediction tasks.',
      highlights: [
        'End-to-end ML pipelines with evaluation',
        'Multiple prediction and classification tasks',
      ],
      stack: ['Python', 'Scikit-learn', 'Pandas'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/MPM', icon: 'github' }],
      order: 5,
    },

    // ── Data Engineering & Analytics ──────────────────
    {
      title: 'Swiss Shared Mobility Insights',
      repo: 'Swiss_Mobility_Insights',
      period: '2023–2024',
      category: 'Data Science',
      section: 'Data Engineering & Analytics',
      language: 'Jupyter Notebook',
      license: 'Apache-2.0',
      description:
        'ETL automation and unsupervised clustering for urban mobility pattern analysis across Swiss shared-mobility networks.',
      highlights: [
        'Automated ETL pipeline for Swiss mobility data',
        'Unsupervised clustering for pattern discovery',
        'Tableau dashboards for stakeholder reporting',
      ],
      stack: ['Python', 'AWS Lambda', 'PostgreSQL', 'Tableau'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/Swiss_Mobility_Insights', icon: 'github' }],
      order: 1,
    },
    {
      title: 'RedSea Stock Time-Series Analysis',
      repo: 'redsea-stock-timeseries-analysis',
      period: '2025',
      category: 'Data Science',
      section: 'Data Engineering & Analytics',
      description:
        'Time-series analysis and forecasting for stock market data.',
      highlights: [
        'Time-series decomposition and trend analysis',
        'Forecasting models for stock price prediction',
      ],
      stack: ['Python', 'Time Series', 'Statistics'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/redsea-stock-timeseries-analysis', icon: 'github' }],
      order: 2,
    },
    {
      title: 'Geo Insights',
      repo: 'geo_insights',
      period: '2025',
      category: 'Data Visualization',
      section: 'Data Engineering & Analytics',
      language: 'JavaScript',
      description:
        'Geographic data analysis and visualization platform with interactive maps and spatial analytics.',
      highlights: [
        'Interactive geospatial visualizations',
        'Location-based data analytics',
      ],
      stack: ['JavaScript', 'GeoJSON', 'Maps'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/geo_insights', icon: 'github' }],
      order: 3,
    },
    {
      title: 'Data Warehouse',
      repo: 'data_warehouse',
      period: '2024–2025',
      category: 'Data Engineering',
      section: 'Data Engineering & Analytics',
      language: 'Jupyter Notebook',
      description:
        'Data warehouse design and implementation covering dimensional modelling, ETL processes, and analytical query patterns.',
      highlights: [
        'Dimensional modelling and star schema design',
        'ETL pipeline implementation',
      ],
      stack: ['Python', 'SQL', 'Jupyter'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/data_warehouse', icon: 'github' }],
      order: 4,
    },

    // ── Software Engineering ───────────────────────────
    {
      title: 'Micro Dashboard',
      repo: 'micro_dashboard',
      period: '2025',
      category: 'Full-Stack',
      section: 'Software Engineering',
      description:
        'Lightweight dashboard application for microservices monitoring and management.',
      highlights: [
        'Real-time service health monitoring',
        'Lightweight microservices dashboard',
      ],
      stack: ['Web', 'Dashboard'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/micro_dashboard', icon: 'github' }],
      order: 1,
    },
    {
      title: 'Invoice System',
      repo: 'Invoice_system',
      period: '2025',
      category: 'Enterprise',
      section: 'Software Engineering',
      language: 'C#',
      description:
        'Invoice management system built with C#/.NET. Handles invoice generation, tracking, and reporting.',
      highlights: [
        'Invoice generation and PDF export',
        'Business reporting and tracking',
      ],
      stack: ['C#', '.NET'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/Invoice_system', icon: 'github' }],
      order: 2,
    },
    {
      title: 'Resume / Portfolio',
      repo: 'Resume',
      period: '2025',
      category: 'Web',
      section: 'Software Engineering',
      language: 'TypeScript',
      description:
        'Personal resume and profile page built with TypeScript. Showcases professional experience, skills, and project portfolio.',
      highlights: [
        'TypeScript-based portfolio site',
        'Responsive design with modern UI',
      ],
      stack: ['TypeScript', 'Web'],
      links: [{ label: 'GitHub', url: 'https://github.com/jahua/Resume', icon: 'github' }],
      order: 3,
    },
  ]

  await Project.insertMany(projects)

  console.log('- 1 profile (Jiahua Duojie) created')
  console.log(`- ${blogs.length} blog posts created`)
  console.log(`- ${projects.length} projects created`)

  await mongoose.disconnect()
}

seed().catch(console.error)
