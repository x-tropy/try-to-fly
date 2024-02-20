# 🍔 Four layers are used to build the image


# ----------------------------------------
# 💿 Layer 1: base
FROM node:hydrogen-alpine AS base
# RUN apt-get update && apt-get install -y sqlite3 


# ----------------------------------------
# 💿 Layer 2.1: deps
FROM base AS deps
WORKDIR /dockerapp
ADD package.json .
RUN npm install

# 💿 Layer 2.2: deps-production
FROM base AS deps-production
WORKDIR /dockerapp
ADD package.json .
COPY --from=deps /dockerapp/node_modules ./node_modules
RUN npm prune --omit=dev


# ----------------------------------------
# 💿 Layer 3: build
FROM base AS build

# 🌒 Preparing required files
WORKDIR /dockerapp
COPY --from=deps /dockerapp/node_modules ./node_modules
COPY . .

# 🌓 Setting up DB
ENV DATABASE_URL="file:../data/sqlite.db"
RUN npx prisma migrate deploy && \
npx prisma generate && \
npx prisma db seed

# 🌔 Building the app
RUN npm run build


# ----------------------------------------
# 💿 Layer 4: final
FROM base AS final
WORKDIR /dockerapp
COPY --from=deps-production /dockerapp/node_modules ./node_modules
COPY --from=build /dockerapp/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /dockerapp/prisma ./prisma
COPY --from=build /dockerapp/data ./data
COPY --from=build /dockerapp/build ./build
COPY --from=build /dockerapp/package.json ./package.json
COPY --from=build /dockerapp/public ./public

# 💡 Visit sqlite DB
ENV DATABASE_URL="file:../data/sqlite.db"
# RUN echo "#!/bin/sh\nset -x\nsqlite3 \$DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli

ENV NODE_ENV=production
ENV PORT=8090
USER node
CMD npm run start
