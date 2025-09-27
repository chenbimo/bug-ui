/**
 * docs dev wrapper: 解决 Bun 下 vitepress alpha 可能出现的非0退出。
 * 启动 vitepress 后保持进程常驻，若启动抛错打印并退出码 1。
 */
import { spawn } from 'node:child_process';

const cp = spawn('bun', ['x', 'vitepress', 'dev', 'docs', '--host'], {
    stdio: 'inherit',
    env: process.env
});

cp.on('exit', (code) => {
    if (code && code !== 0) {
        console.error('[docs:dev:stable] vitepress 退出码', code);
    } else {
        console.log('[docs:dev:stable] vitepress 结束');
    }
});

// 保活：若 vitepress 立刻退出且端口未监听，可在此重试（简单策略暂不实现，必要时扩展）。
process.stdin.resume();

export {};
