# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Cài đặt thư viện cần thiết cho Alpine (để chạy sharp/swc)
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_SUBFIX
ARG NEXT_PUBLIC_ACCESS_KEY_UNSPLASH

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_SUBFIX=${NEXT_PUBLIC_API_SUBFIX}
ENV NEXT_PUBLIC_ACCESS_KEY_UNSPLASH=${NEXT_PUBLIC_ACCESS_KEY_UNSPLASH}

# Build Next.js
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Tạo user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder (ảnh, favicon...)
COPY --from=builder /app/public ./public

# Copy code Standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]