import { defineConfig } from 'vitepress';

// 侧边栏分组：基于 docs/markdown 下的目录与文件命名规范（数字排序 + 中文分类）
// 每个 link 去掉 .md，保持与 VitePress 默认路由规则一致；前导斜杠基于 srcDir 根（markdown）。
// 若后续新增组件，请同步更新此静态配置，或改为自动生成逻辑（见仓库 scripts/ 目录的潜在脚本扩展点）。

export default defineConfig({
    lang: 'zh-CN',
    title: 'Buig UI',
    description: 'Vue3 组件库（MVP 重构中）',
    srcDir: 'markdown',
    themeConfig: {
        nav: [],
        sidebar: [
            {
                text: '基础',
                items: [
                    { text: 'Button 按钮', link: '/01-基础/01-Button' },
                    { text: 'Icon 图标', link: '/01-基础/02-Icon' },
                    { text: 'Divider 分割线', link: '/01-基础/03-Divider' }
                ]
            },
            {
                text: '表单控件',
                items: [
                    { text: 'Input 输入框', link: '/02-表单控件/01-Input' },
                    { text: 'Textarea 文本域', link: '/02-表单控件/02-Textarea' },
                    { text: 'Checkbox 复选框', link: '/02-表单控件/03-Checkbox' },
                    { text: 'Radio 单选框', link: '/02-表单控件/04-Radio' },
                    { text: 'Switch 开关', link: '/02-表单控件/05-Switch' },
                    { text: 'Select 选择器', link: '/02-表单控件/06-Select' },
                    { text: 'Slider 滑块', link: '/02-表单控件/07-Slider' }
                ]
            },
            {
                text: '数据展示',
                items: [
                    { text: 'Avatar 头像', link: '/03-数据展示/01-Avatar' },
                    { text: 'Card 卡片', link: '/03-数据展示/02-Card' },
                    { text: 'Skeleton 骨架屏', link: '/03-数据展示/03-Skeleton' },
                    { text: 'Progress 进度条', link: '/03-数据展示/04-Progress' }
                ]
            },
            {
                text: '反馈',
                items: [
                    { text: 'Alert 警告', link: '/04-反馈/01-Alert' },
                    { text: 'Spinner 加载中', link: '/04-反馈/02-Spinner' },
                    { text: 'Tooltip 文字提示', link: '/04-反馈/03-Tooltip' },
                    { text: 'Badge 徽标', link: '/04-反馈/04-Badge' },
                    { text: 'Tag 标签', link: '/04-反馈/05-Tag' },
                    { text: 'Dialog 对话框', link: '/04-反馈/06-Dialog' },
                    { text: 'Drawer 抽屉', link: '/04-反馈/07-Drawer' },
                    { text: 'Toast 提示', link: '/04-反馈/08-Toast' },
                    { text: 'Popover 气泡卡片', link: '/04-反馈/09-Popover' }
                ]
            },
            {
                text: '导航',
                items: [
                    { text: 'Breadcrumb 面包屑', link: '/05-导航/01-Breadcrumb' },
                    { text: 'Pagination 分页', link: '/05-导航/02-Pagination' },
                    { text: 'Steps 步骤条', link: '/05-导航/03-Steps' },
                    { text: 'Tabs 选项卡', link: '/05-导航/04-Tabs' }
                ]
            }
        ]
    }
});
