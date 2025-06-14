FROM node:18-alpine

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

# Copy package files first to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma Client (this is safe to do during build)
RUN pnpm prisma generate --schema=./prisma/schema.prisma

# Build the NestJS app
RUN pnpm build

EXPOSE 3001

# Create a startup script
COPY <<EOF /usr/src/app/start.sh
#!/bin/sh
set -e

echo "🔄 Running database migrations..."
pnpm dlx prisma migrate deploy --schema=./prisma/schema.prisma

echo "🚀 Starting NestJS application..."
pnpm start:prod
EOF

RUN chmod +x /usr/src/app/start.sh

CMD ["/usr/src/app/start.sh"]