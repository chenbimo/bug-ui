import { defineConfig } from 'vitepress';

export default defineConfig({
    lang: 'zh-CN',
    title: 'Yii UI',
    description: '为 Vue3 提供的组件库',
    srcDir: 'markdown',
    themeConfig: {
        nav: [{ text: '组件', link: '/01-基础/01-Button' }],
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
                    { text: 'Textarea 多行文本', link: '/02-表单控件/02-Textarea' },
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
                    { text: 'Alert 警示条', link: '/04-反馈/01-Alert' },
                    { text: 'Spinner 加载中', link: '/04-反馈/02-Spinner' },
                    { text: 'Tooltip 提示', link: '/04-反馈/03-Tooltip' },
                    { text: 'Badge 徽标', link: '/04-反馈/04-Badge' },
                    { text: 'Tag 标签', link: '/04-反馈/05-Tag' },
                    { text: 'Dialog 对话框', link: '/04-反馈/06-Dialog' },
                    { text: 'Drawer 抽屉', link: '/04-反馈/07-Drawer' },
                    { text: 'Toast 轻提示', link: '/04-反馈/08-Toast' },
                    { text: 'Popover 气泡卡片', link: '/04-反馈/09-Popover' }
                ]
            },
            {
                text: '导航',
                items: [
                    { text: 'Breadcrumb 面包屑', link: '/05-导航/01-Breadcrumb' },
                    { text: 'Pagination 分页', link: '/05-导航/02-Pagination' },
                    { text: 'Steps 步骤条', link: '/05-导航/03-Steps' },
                    { text: 'Tabs 标签页', link: '/05-导航/04-Tabs' }
                ]
            }
        ]
    }
});
