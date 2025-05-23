FROM node:18-alpine

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

# Copy PNPM files first to leverage Docker caching
COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY . .

# Install dependencies (including Prisma)
RUN pnpm install --offline

# Generate Prisma Client (this is safe to do during build as it doesn't need a running DB)
RUN pnpm prisma generate

# Build the NestJS app
RUN pnpm build

EXPOSE 3001

# Modify the CMD to first run migrations and then start the app
CMD ["/bin/sh", "-c", "pnpm prisma migrate deploy && pnpm start:prod"]