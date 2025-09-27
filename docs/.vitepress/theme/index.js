import DefaultTheme from 'vitepress/theme';
// 直接从源码引入（Vite 支持 TS 源文件解析）
import * as Buig from '../../../src/index.ts';
import '../../../src/styles/core.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // 全量注册组件库（开发文档预览）
        if (Buig && Buig.install) {
            app.use(Buig);
        } else {
            Object.values(Buig).forEach((c) => c && c.name && app.component(c.name, c));
        }
    }
};
