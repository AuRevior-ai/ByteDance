import {
  Bot,
  Boxes,
  Brain,
  Bug,
  Code2,
  Database,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Rocket,
  SearchCheck,
  Sparkles,
} from "lucide-react";

export const navItems = [
  { label: "新建", icon: LayoutDashboard, action: true },
  { label: "最近会话", icon: Bot, active: true, count: 8 },
  { label: "我的 Agent", icon: Boxes },
  { label: "团队空间", icon: Database },
];

export const agents = [
  {
    name: "总控协调 Agent",
    status: "思考中",
    icon: Sparkles,
    tone: "from-violet-500 to-fuchsia-400",
    dot: "bg-emerald-400",
  },
  {
    name: "研究员 Agent",
    status: "已完成",
    icon: SearchCheck,
    tone: "from-emerald-500 to-teal-400",
    dot: "bg-emerald-400",
  },
  {
    name: "产品经理 Agent",
    status: "进行中",
    icon: FileText,
    tone: "from-green-400 to-emerald-300",
    dot: "bg-emerald-400",
  },
  {
    name: "前端 Agent",
    status: "编码中",
    icon: Code2,
    tone: "from-blue-500 to-indigo-400",
    dot: "bg-blue-400",
  },
  {
    name: "后端 Agent",
    status: "等待中",
    icon: Database,
    tone: "from-sky-500 to-blue-400",
    dot: "bg-amber-400",
  },
  {
    name: "测试 Agent",
    status: "等待确认",
    icon: Bug,
    tone: "from-orange-400 to-amber-300",
    dot: "bg-amber-400",
  },
  {
    name: "部署 Agent",
    status: "已完成",
    icon: Rocket,
    tone: "from-sky-500 to-cyan-400",
    dot: "bg-emerald-400",
  },
];

export const taskSteps = [
  ["需求澄清与目标确认", "产品经理 Agent", "violet"],
  ["竞品研究与用户诉求分析", "研究员 Agent", "green"],
  ["产品说明页内容与结构设计", "产品经理 Agent", "green"],
  ["前端页面开发与实现", "前端 Agent", "indigo"],
  ["测试与优化", "测试 Agent", "orange"],
  ["部署演示站与验证", "部署 Agent", "green"],
] as const;

export const trackingSteps = [
  ["需求澄清与目标确认", "已完成", "done"],
  ["竞品研究与用户诉求分析", "已完成", "done"],
  ["产品说明页内容与结构设计", "已完成", "done"],
  ["前端页面开发与实现", "进行中", "running"],
  ["测试与优化", "进行中", "running"],
  ["部署演示站与验证", "已完成", "done"],
] as const;

export const teamSpaces = [
  { label: "比赛项目团队", active: true },
  { label: "设计资源库" },
  { label: "知识库" },
];

export const versions = [
  { version: "v1.3", tag: "当前版本", title: "优化文案与交互细节", time: "2 分钟前" },
  { version: "v1.2", title: "调整首屏布局与配色", time: "18 分钟前" },
  { version: "v1.1", title: "完善功能模块内容", time: "45 分钟前" },
];

export const codeLines = [
  "<template>",
  '  <section class="hero">',
  '    <div class="container">',
  '      <h1 class="title">多 Agent 协作，边聊边做</h1>',
  '      <p class="subtitle">让复杂任务像对话一样自然完成</p>',
  '      <div class="actions">',
  '        <a class="btn primary">立即体验</a>',
  '        <a class="btn outline">查看演示</a>',
  "      </div>",
  "    </div>",
  "  </section>",
  "</template>",
];

export const chatAvatars = ["林", "陈", "周", "许", "王"];

export const IconBrain = Brain;
export const IconFlask = FlaskConical;

