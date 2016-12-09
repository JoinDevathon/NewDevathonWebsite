declare module 'vue-server-renderer' {
    export interface Renderer {
        renderToString(component: any, callback: (error: Error, html: string) => any): void;
    }

    export function createRenderer(): Renderer;
}