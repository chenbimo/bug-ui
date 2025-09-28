import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import '../../../src/styles/all.scss';
import * as Components from '../../../src/components';
import BuigInstall from '../../../src/install';

// 可选：后续在这里注册 DemoBlock 组件

const theme: Theme = {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 全量插件注册（install.ts 已处理）
        app.use(BuigInstall);

        // 如果需要按需也可以：
        // Object.values(Components).forEach((c: any) => {
        //   if (c && c.name) app.component(c.name, c);
        // });
    }
};

export default theme;
