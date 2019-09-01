FROM mhart/alpine-node:11

RUN mkdir /client

# build client

WORKDIR /client

COPY package.json .
RUN npm install
COPY . .
#RUN npm run build

EXPOSE 3000 443
EXPOSE 3000 80

#CMD ["node", "server/index.js"]
CMD ["nuxt", "build", "&&", "nuxt", "start"]
