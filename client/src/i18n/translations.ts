export type Locale = 'en' | 'zh' | 'bo'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  bo: 'བོད་སྐད།',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: 'EN',
  zh: '中',
  bo: 'བོད',
}

const translations = {
  // Navbar
  'nav.home': {
    en: 'Home',
    zh: '首页',
    bo: 'གཙོ་ངོས།',
  },
  'nav.projects': {
    en: 'Projects',
    zh: '项目',
    bo: 'ལས་གཞི།',
  },
  'nav.blog': {
    en: 'Blog',
    zh: '博客',
    bo: 'རྩོམ་ཡིག',
  },
  'nav.cv': {
    en: 'CV',
    zh: '简历',
    bo: 'མཐའ་དོན།',
  },
  'nav.contact': {
    en: 'Contact',
    zh: '联系',
    bo: 'འབྲེལ་གཏུགས།',
  },

  // Hero
  'hero.cv_button': {
    en: 'Curriculum Vitae',
    zh: '下载简历',
    bo: 'མཐའ་དོན་ཕབ་ལེན།',
  },

  // About
  'about.title': {
    en: 'About Me',
    zh: '关于我',
    bo: 'ངའི་སྐོར།',
  },
  'about.academic_profiles': {
    en: 'Academic Profiles',
    zh: '学术主页',
    bo: 'ཞིབ་འཇུག་ངོ་སྤྲོད།',
  },

  // Blog
  'blog.title': {
    en: 'Blog',
    zh: '博客',
    bo: 'རྩོམ་ཡིག',
  },
  'blog.subtitle': {
    en: 'Thoughts, tutorials, and insights',
    zh: '思考、教程与见解',
    bo: 'བསམ་ཚུལ། སློབ་ཁྲིད། དང་གནས་ཚུལ།',
  },
  'blog.latest': {
    en: 'Latest Posts',
    zh: '最新文章',
    bo: 'གསར་བའི་རྩོམ་ཡིག',
  },
  'blog.view_all': {
    en: 'View all posts',
    zh: '查看全部文章',
    bo: 'རྩོམ་ཡིག་ཚང་མ་ལྟ།',
  },
  'blog.read_more': {
    en: 'Keep reading',
    zh: '继续阅读',
    bo: 'མུ་མཐུད་ཀློག',
  },
  'blog.back': {
    en: 'Back to Blog',
    zh: '返回博客',
    bo: 'རྩོམ་ཡིག་ལ་ཕྱིར་ལོག',
  },
  'blog.not_found': {
    en: 'Blog post not found',
    zh: '文章未找到',
    bo: 'རྩོམ་ཡིག་རྙེད་མ་བྱུང་།',
  },
  'blog.no_posts': {
    en: 'No blog posts found.',
    zh: '暂无文章。',
    bo: 'རྩོམ་ཡིག་གང་ཡང་མེད།',
  },
  'blog.filtered_by': {
    en: 'Filtered by:',
    zh: '筛选：',
    bo: 'བཀག་འདོམས།',
  },
  'blog.clear': {
    en: 'Clear',
    zh: '清除',
    bo: 'གཙང་སེལ།',
  },
  'blog.previous': {
    en: 'Previous',
    zh: '上一页',
    bo: 'སྔོན་མ།',
  },
  'blog.next': {
    en: 'Next',
    zh: '下一页',
    bo: 'རྗེས་མ།',
  },
  'blog.page_of': {
    en: 'Page {page} of {total}',
    zh: '第 {page} 页 / 共 {total} 页',
    bo: 'ཤོག་གྲངས་ {page} / {total}',
  },

  // Projects
  'projects.title': {
    en: 'Research & Projects',
    zh: '研究与项目',
    bo: 'ཞིབ་འཇུག་དང་ལས་གཞི།',
  },
  'projects.subtitle': {
    en: 'From agentic AI systems to data engineering — exploring human-centered technology',
    zh: '从智能体 AI 系统到数据工程 — 探索以人为本的技术',
    bo: 'AI རང་སྟོབས་མ་ལག་ནས་གཞི་གྲངས་འཕྲུལ་རིག་བར། མིའི་ལྟེ་གནས་ཀྱི་ལག་རྩལ་རྒྱ་ཆེར་བཤེར།',
  },
  'projects.view_github': {
    en: 'View all on GitHub',
    zh: '在 GitHub 查看全部',
    bo: 'GitHub ནང་ཚང་མ་ལྟ།',
  },
  'projects.section.research': {
    en: 'Research & Thesis',
    zh: '研究与论文',
    bo: 'ཞིབ་འཇུག་དང་དཔྱད་རྩོམ།',
  },
  'projects.section.ai': {
    en: 'AI & Machine Learning',
    zh: 'AI 与机器学习',
    bo: 'AI དང་འཕྲུལ་རིག་སློབ་སྦྱོང་།',
  },
  'projects.section.data': {
    en: 'Data Engineering & Analytics',
    zh: '数据工程与分析',
    bo: 'གཞི་གྲངས་འཕྲུལ་རིག་དང་དཔྱད་ཞིབ།',
  },
  'projects.section.software': {
    en: 'Software Engineering',
    zh: '软件工程',
    bo: 'མཉེན་ཆས་འཕྲུལ་རིག',
  },

  // CV
  'cv.title': {
    en: 'Curriculum Vitae',
    zh: '个人简历',
    bo: 'མཐའ་དོན།',
  },
  'cv.download': {
    en: 'Download PDF',
    zh: '下载 PDF',
    bo: 'PDF ཕབ་ལེན།',
  },
  'cv.research_profile': {
    en: 'Research Profile',
    zh: '研究简介',
    bo: 'ཞིབ་འཇུག་ངོ་སྤྲོད།',
  },
  'cv.research_interests': {
    en: 'Research Interests',
    zh: '研究方向',
    bo: 'ཞིབ་འཇུག་ཁ་ཕྱོགས།',
  },
  'cv.education': {
    en: 'Education',
    zh: '教育背景',
    bo: 'སློབ་གསོ།',
  },
  'cv.publications': {
    en: 'Publications',
    zh: '发表论文',
    bo: 'པར་སྐྲུན།',
  },
  'cv.experience': {
    en: 'Professional Experience',
    zh: '工作经历',
    bo: 'ལས་ཀའི་ཉམས་མྱོང་།',
  },
  'cv.skills': {
    en: 'Technical Competencies',
    zh: '技术能力',
    bo: 'ལག་རྩལ་ཤེས་ཡོན།',
  },
  'cv.certifications': {
    en: 'Certifications',
    zh: '资格认证',
    bo: 'ཡིག་ཆའི་ར་སྤྲོད།',
  },
  'cv.languages': {
    en: 'Languages',
    zh: '语言能力',
    bo: 'སྐད་ཡིག',
  },

  // Contact
  'contact.title': {
    en: 'Contact',
    zh: '联系我',
    bo: 'འབྲེལ་གཏུགས།',
  },
  'contact.subtitle': {
    en: 'Want to discuss ideas or collaborations? Send me a message!',
    zh: '想讨论想法或合作？给我留言！',
    bo: 'བསམ་ཚུལ་གླེང་མོལ་ཡང་ན་མཉམ་ལས་བྱེད་འདོད་ན། ང་ལ་འཕྲིན་སྐུར།',
  },
  'contact.name': {
    en: 'Name',
    zh: '姓名',
    bo: 'མིང་།',
  },
  'contact.email': {
    en: 'Email',
    zh: '电子邮件',
    bo: 'གློག་འཕྲིན།',
  },
  'contact.message': {
    en: 'Message',
    zh: '留言',
    bo: 'འཕྲིན་ཡིག',
  },
  'contact.send': {
    en: 'Send Message',
    zh: '发送消息',
    bo: 'འཕྲིན་སྐུར།',
  },
  'contact.sending': {
    en: 'Sending...',
    zh: '发送中...',
    bo: 'སྐུར་བཞིན་པ...',
  },
  'contact.success_title': {
    en: 'Message Sent!',
    zh: '消息已发送！',
    bo: 'འཕྲིན་ཡིག་བསྐུར་ཟིན།',
  },
  'contact.success_text': {
    en: "Thank you for reaching out. I'll get back to you soon.",
    zh: '感谢您的留言，我会尽快回复您。',
    bo: 'འབྲེལ་གཏུགས་བྱས་པར་བཀའ་དྲིན་ཆེ། ང་མགྱོགས་མྱུར་ལན་སྤྲོད་བྱེད་ཀྱི་ཡིན།',
  },
  'contact.send_another': {
    en: 'Send another message',
    zh: '再发一条',
    bo: 'འཕྲིན་ཡིག་གཞན་ཞིག་སྐུར།',
  },
  'contact.placeholder_name': {
    en: 'Your name',
    zh: '您的姓名',
    bo: 'ཁྱེད་ཀྱི་མིང་།',
  },
  'contact.placeholder_email': {
    en: 'your@email.com',
    zh: 'your@email.com',
    bo: 'your@email.com',
  },
  'contact.placeholder_message': {
    en: 'Your message...',
    zh: '您的留言...',
    bo: 'ཁྱེད་ཀྱི་འཕྲིན་ཡིག...',
  },

  // Footer
  'footer.built_by': {
    en: 'Built with {heart} by Jiahua Duojie',
    zh: '由 Jiahua Duojie 用 {heart} 构建',
    bo: 'Jiahua Duojie ཡིས་ {heart} སྤྱོད་ནས་བཟོས།',
  },
  'footer.rights': {
    en: '© {year} Jiahua Duojie. All rights reserved.',
    zh: '© {year} Jiahua Duojie 版权所有',
    bo: '© {year} Jiahua Duojie ། ཁེ་དབང་ཡོངས་རྫོགས་ཉར་ཚགས།',
  },

  // Common
  'common.loading': {
    en: 'Loading...',
    zh: '加载中...',
    bo: 'སྣོན་འཇུག་བྱེད་བཞིན་པ...',
  },
  'common.welcome': {
    en: 'Welcome',
    zh: '欢迎',
    bo: 'བསུ་བ་ཞུ།',
  },
  'common.seed_hint': {
    en: 'Run npm run seed to populate the database with sample data.',
    zh: '运行 npm run seed 来填充示例数据。',
    bo: 'npm run seed བཀོལ་ནས་གཞི་གྲངས་མཛོད་ཁར་དཔེ་གཞི་གྲངས་སྣོན།',
  },
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey, locale: Locale, vars?: Record<string, string>): string {
  const entry = translations[key]
  let text: string = entry?.[locale] || entry?.en || key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v)
    }
  }
  return text
}

export default translations
