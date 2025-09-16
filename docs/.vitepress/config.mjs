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
                    { text: 'Icon 图标', link: '/01-基础/02-Icon' }
                ]
            },
            {
                text: '表单控件',
                items: [
                    { text: 'Input 输入框', link: '/02-表单控件/01-Input' },
                    { text: 'Textarea 多行文本', link: '/02-表单控件/02-Textarea' },
                    { text: 'Checkbox 复选框', link: '/02-表单控件/03-Checkbox' },
                    { text: 'Radio 单选框', link: '/02-表单控件/04-Radio' },
                    { text: 'Switch 开关', link: '/02-表单控件/05-Switch' }
                ]
            }
        ]
    }
});
