FROM node

WORKDIR /app/back-end

COPY package.json /app/back-end

RUN npm install

COPY . .

RUN npm run build

COPY ./build .