# Devathon Website

### Notes

- While NPM can be used, YarnPkg is preferred for its speed and version locking.
- Run `yarn` inside of `client` and `server` before running or building.

## Client

The client code is written in Vue, which is compiled before it's downloaded.

### Scripts

Build for production:

```bash
yarn run build
```

Watch for development:

```bash
yarn run dev
```

In a separate terminals:

```bash
yarn run dev-server
```

```bash
yarn run dev-css
```

This is required for server-side rendering and automatic CSS style updates.

## Server

The server code is written in TypeScript, using the Express framework for routing.
It pre-renders each webpage so that Vue can start faster.

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