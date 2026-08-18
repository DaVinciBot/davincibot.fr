FROM node:24.11.0-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
RUN --mount=type=secret,id=npm_token,env=NPM_TOKEN pnpm install --frozen-lockfile --prod

FROM base AS build

COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
RUN --mount=type=secret,id=npm_token,env=NPM_TOKEN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24.11.0-slim AS runner

ENV NODE_ENV=production

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get upgrade -y --no-install-recommends \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
       /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /var/cache/debconf/*.dat-old \
       /var/lib/dpkg/status-old /var/log/apt/* /var/log/dpkg.log

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build ./build

# Utilisateur node : non privilégié fourni par l'image officielle.
USER 1000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "build"]
