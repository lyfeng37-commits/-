const publicAsset = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

export const profile = {
  name: 'LI YIFENG',
  title: '内容运营 / 内容增长 / 品牌叙事',
  location: '福建 厦门',
  email: '374127705@qq.com',
  phone: '+86 151 0602 6855',
  intro:
    '我关注内容如何从选题、表达、分发到转化形成闭环。擅长把用户洞察转化为可执行的栏目、活动与增长实验，并用数据复盘持续优化内容效率。',
  portraitCaption: 'Content Operator',
  about:
    '具备账号选题、脚本、剪辑及社群维护经验，可完成从选题、脚本、分镜到成片和数据复盘的内容生产。 近期通过AI协作在11天内完成「年轮」家族时间轴Web Demo，并负责原创IP《塔可的星际日记》的世界观、角色人设、剧情及内容规划，擅长角色化、情绪化内容表达。',
  whatICanDo: [
    {
      title: '快速学习与信息研究',
      description: '面对陌生领域，能够快速检索、整理资料并形成可执行方案。',
    },
    {
      title: 'AI协作与项目落地',
      description: '使用 Codex、Trae、生成式AI等工具辅助内容、产品原型及项目实现。',
    },
    {
      title: '项目推进与跨部门沟通',
      description: '有客户、设计、运营、售前售后等多角色协作经历，能够持续跟进问题直至解决。',
    },
    {
      title: '内容与视觉表达',
      description: '具备脚本、视频剪辑、视觉设计基础，能够独立完成基础内容输出。',
    },
  ],
  facts: [
    { label: '求职方向', value: '创始人助理（AI / 项目协同方向）' },
    { label: '核心能力', value: '用户洞察 / 内容策划 / 短视频 / AIGC' },
    { label: '手机', value: '15106026855' },
    { label: '邮箱', value: '374127705@qq.com' },
  ],
  building: ['AI陪伴产品研究', '角色内容策划', 'AIGC内容工作流', '小红书内容运营'],
  metrics: [
    { value: '用户洞察', label: '从反馈中提炼需求' },
    { value: '内容全流程', label: '选题、脚本、剪辑、发布' },
    { value: 'AI协作', label: '策划、生成、迭代、落地' },
    { value: '4', label: '主导运营渠道', note: '公众号 / 小红书 / 社群 / 视频' },
  ],
};

export const navigation = [
  { label: '项目', href: '#projects' },
  { label: '经历', href: '#experience' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
];

export const experience = [
  {
    eyebrow: '内容策略',
    title: '从用户问题出发建立选题系统',
    body: '围绕目标用户的场景、痛点和决策链路拆解内容主题，建立选题池、内容日历和栏目机制，让内容产出不依赖灵感。',
  },
  {
    eyebrow: '内容生产',
    title: '兼顾表达质量与发布节奏',
    body: '能独立完成资料调研、标题结构、脚本撰写、图文排版与短视频分镜，也能和设计、产品、销售协同完成重点内容。',
  },
  {
    eyebrow: '数据复盘',
    title: '用数据判断内容是否真正有效',
    body: '关注阅读完成率、互动率、收藏转发、线索转化与用户反馈，将复盘结论沉淀为下一轮选题和分发策略。',
  },
];

export const careerPath = [
  {
    period: '2023.07–2024.02',
    company: '短视频剪辑 / 内容运营',
    role: '厦门芒果互娱',
    detail: [
      '负责线下游戏及文娱活动票务推广视频的素材筛选、卖点提炼、剪辑包装与内容发布。',
      '围绕活动亮点制作短视频，完成字幕、音乐、节奏及画面包装，并配置购票链接。',
      '承接从内容曝光到票务购买的转化链路，根据播放、互动及票务表现调整素材和剪辑方式。',
      '独立完成素材处理、成片输出、发布及账号日常维护，配合公司开展活动票务推广。',
    ],
  },
  {
    period: '2025.03–2026.04',
    company: '技术客服',
    role: '厦门大白科技有限公司',
    detail: [
      '对接终端用户及经销商，日均处理产品咨询、安装指导及售后问题30+，协调相关部门推进问题解决。',
      '归纳尺寸确认、安装使用、售后处理等高频问题，整理用户痛点和反馈内容。',
      '将典型问题同步运营团队，协助优化产品详情页、说明内容及客服沟通话术。',
      '在售前、售中和售后沟通中识别用户需求，积累用户洞察、信息整理及跨部门协作经验。',
    ],
  },
  {
    period: '2019.05–2023.05',
    company: '空间设计经历',
    role: '寸境建筑装饰设计 / 有壹个建筑装饰',
    detail: [
      '参与别墅、住宅及商业空间项目，负责前期需求沟通、方案制作、效果呈现及后续落地配合。',
      '根据客户需求整理设计信息并推进方案修改，积累客户沟通、需求分析和项目协作经验。',
      '熟练使用CAD、SketchUp等工具完成视觉方案，形成一定的画面构图和视觉表达能力。',
    ],
  },
];

export const featuredProjects = [
  {
    number: '01',
    type: 'AI PRODUCT / WEB DEMO',
    title: '年轮｜家族时间轴 Web Demo',
    summary:
      '针对家族记忆容易流失、老人记录门槛较高的问题，完成产品定位、核心功能规划，并通过AI协作在11天内完成可交互Demo与后续功能迭代。',
    stats: ['产品策划', '用户洞察', 'AI协作', '产品迭代'],
    image: 'nianlun',
    imageFit: 'cover',
    imagePosition: 'center',
    imageAlt: '年轮家族时间轴Web Demo产品界面总览',
    actionLabel: '在线体验 ↗',
    externalUrl: 'https://lyfeng37-commits.github.io/nianlun-demo/',
    tone: 'amber',
  },
  {
    number: '02',
    type: 'ORIGINAL IP / CHARACTER CONTENT',
    title: '《塔可的星际日记》｜原创IP内容策划',
    summary:
      '围绕孤独、陪伴与归属感建立角色关系与稳定人设，完成世界观、角色设定、剧情脚本及小红书内容规划，探索“单张插画＋轻动效＋短文案”的持续内容表达。',
    disclaimer:
      '注：项目现已正式升级为《塔可的星际日记》，页面部分画面为前期概念稿，保留早期项目名称；版权登记申请已提交。',
    stats: ['角色人设', '情绪内容', '剧情策划', 'IP运营'],
    image: 'ipCharacter',
    imageFit: 'cover',
    imagePosition: '74% center',
    imageAlt: '《塔可的星际日记》原创IP角色代表插画',
    actionLabel: '查看项目 ↗',
    details: [
      '个人负责：世界观、角色设定、剧本及内容运营规划',
      '视觉协作：角色与插画由合作伙伴绘制',
    ],
    pdf: publicAsset('li-yifeng-ip-portfolio.pdf'),
    tone: 'amber',
  },
  {
    number: '03',
    type: 'AI COMPANION APP / CONTENT STRATEGY',
    title: 'AI陪伴APP体验与内容策划',
    subtitle: '甜气 × 星野 × 猫箱',
    summary:
      '以甜气为重点体验对象，对比星野与猫箱，从角色吸引力、对话沉浸、付费体验、用户留存与站外传播等维度进行分析，并提出内容运营与产品优化方向。',
    stats: ['APP体验', '竞品分析', '用户洞察', '内容策划'],
    image: 'aiCompanion',
    imageFit: 'cover',
    imagePosition: 'center',
    imageAlt: 'AI陪伴APP体验与内容策划封面，包含甜气、星野与猫箱三款产品',
    actionLabel: '查看策划案 ↗',
    note: '自主体验与岗位定向策划，非相关品牌任职项目',
    pdf: publicAsset('ai-companion-app-strategy.pdf'),
    tone: 'mint',
  },
];

export const moreProjects = [
  {
    number: '04',
    type: 'AI VIDEO / STORYBOARD',
    title: '《风暴中的蝴蝶》｜AI短片分镜实验',
    summary:
      '将原创故事拆解为6个关键画面，完成脚本、镜头情绪、字幕文案及AI视频提示词设计，并制作15秒短片Demo。',
    stats: ['脚本分镜', 'AI视频', '视觉表达'],
    image: 'ipShortfilm',
    imageFit: 'cover',
    imageAlt: '《风暴中的蝴蝶》AI创意短片画面',
    actionLabel: '▶ 播放视频',
    video: publicAsset('ip-shortfilm-2-web.mp4'),
    tone: 'mint',
  },
  {
    number: '05',
    type: 'VISUAL FOUNDATION / SPATIAL WORKS',
    title: '空间视觉作品｜视觉表达基础',
    summary:
      '精选过往空间设计作品，展示构图、色彩、场景表达及项目执行基础，为内容包装与视觉呈现提供支撑。',
    stats: ['场景构图', '色彩表达', '视觉基础'],
    image: 'spaceVisual',
    imageFit: 'cover',
    imagePosition: 'center',
    imageAlt: '现代室内空间视觉设计作品',
    actionLabel: '▶ 播放作品',
    video: publicAsset('project-space-visual-web.mp4'),
    tone: 'amber',
  },
];

export const strengths = [
  {
    title: '用户洞察',
    body: '能从用户反馈、产品体验与竞品内容中提炼真实需求，识别情绪共鸣点、使用痛点和内容机会。',
    keywords: ['用户反馈', '产品体验', '竞品观察'],
  },
  {
    title: '内容策划',
    body: '能围绕产品卖点与用户需求完成选题规划、内容结构、脚本撰写及系列栏目设计。',
    keywords: ['选题策划', '脚本撰写', '栏目设计'],
  },
  {
    title: '内容制作',
    body: '能独立完成短视频脚本、分镜设计、基础拍摄、PR/AE剪辑及图文内容包装。',
    keywords: ['短视频', '图文内容', '剪辑包装'],
  },
  {
    title: 'AI协作',
    body: '能使用ChatGPT、Codex及AIGC工具辅助资料整理、创意发散、内容制作与产品Demo落地。',
    keywords: ['ChatGPT', 'Codex', 'AIGC工作流'],
  },
  {
    title: '数据复盘',
    body: '关注点击、完播、互动、收藏及转化等指标，根据内容表现持续优化选题和表达方式。',
    keywords: ['数据观察', '内容复盘', '持续迭代'],
  },
  {
    title: '项目推进',
    body: '能拆解任务、协调协作角色、跟进素材与发布节点，推动内容项目按计划完成。',
    keywords: ['任务拆解', '协作沟通', '节点管理'],
  },
];

export const capabilityInfo = {
  toolkit: ['PR', 'AE', 'PS', 'ChatGPT', 'Codex', 'CAD', 'SU'],
  channels: ['抖音', '小红书', '视频号', '公众号', '社群'],
};
