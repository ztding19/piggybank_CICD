# 使用 Node 的版本
FROM node:8.9-alpine

# Node 環境設定為 production
ENV NODE_ENV production

# Node 在容器內的位置
WORKDIR /usr/src/app

# 複製 package 設定
COPY ["package.json", "yarn.lock", "./"]

# 安裝必要的套件並移動到專案的 node_modules 底下
RUN yarn --production --silent && mv node_modules ../


COPY . .


# 執行專案
CMD [ "yarn", "run","Counter" ]

