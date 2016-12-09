# Devathon Website

### Notes

- While NPM can be used, YarnPkg is preferred for its speed and version locking.
- Run `yarn` inside of `client` and `server` before running or building.

## Client

The client code is written in Svelte, which is compiled before it's downloaded.

### Scripts

Build for production:

```bash
yarn run build
```

Watch for development:

```bash
yarn run dev
```

## Server

The server code is written in TypeScript, using the Express framework for routing.
In the future the server will use svelte-ssr to prerender our components.

### Setup

In order to run the server, you must copy `server/config/config.default.ts` to `config.ts`.

### Scripts

Run production:

```bash
yarn run build # run this every time you pull
yarn run run
```

Run development:

```bash
yarn run dev
```