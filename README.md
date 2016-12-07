# Devathon Website

## Client

The client code is written in Svelte, which is compiled before it's downloaded.

### Scripts

Build for production:

```bash
npm run build
```

Watch for development:

```bash
npm run dev
```

## Server

The server code is written in TypeScript, using the Express framework for routing.
In the future the server will use svelte-ssr to prerender our components.

### Setup

In order to run the server, you must copy `server/config/config.default.ts` to `config.ts`.

### Scripts

Run production:

```bash
npm run build # run this every time you pull
npm run run
```

Run development:

```bash
npm run dev
```