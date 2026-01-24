# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Cài đặt thư viện cần thiết cho Alpine (để chạy sharp/swc)
RUN apk add --no-cache libc6-compat

# Bật pnpm qua corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lockfile
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG APP_NAME
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_SUBFIX
ARG NEXT_PUBLIC_ACCESS_KEY_UNSPLASH
ARG NEXT_PUBLIC_DICTIONARY_API_BASE_URL
ARG NEXT_PUBLIC_UNSPLASH_API_BASE_URL
ARG NEXT_IGNORE_TS_ERRORS

ENV APP_NAME=${APP_NAME}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_SUBFIX=${NEXT_PUBLIC_API_SUBFIX}
ENV NEXT_PUBLIC_ACCESS_KEY_UNSPLASH=${NEXT_PUBLIC_ACCESS_KEY_UNSPLASH}
ENV NEXT_PUBLIC_DICTIONARY_API_BASE_URL=${NEXT_PUBLIC_DICTIONARY_API_BASE_URL}
ENV NEXT_PUBLIC_UNSPLASH_API_BASE_URL=${NEXT_PUBLIC_UNSPLASH_API_BASE_URL}
ENV NEXT_IGNORE_TS_ERRORS=${NEXT_IGNORE_TS_ERRORS}

# Build Next.js (--no-lint để bỏ qua ESLint)
RUN pnpm run build -- --no-lint

# Stage 2: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Tạo user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy code Standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]