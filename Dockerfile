FROM mhart/alpine-node:11

#RUN apk update && apk add bash
#RUN /bin/sh -c "apk add --no-cache bash"
#RUN mkdir /client

# build client and run client

WORKDIR /client

COPY package.json .
RUN npm install
COPY . .
#RUN npm run build

EXPOSE 3000 443
EXPOSE 3000 80

RUN chmod a+x entrypoint.sh
#RUN chmod +x entrypoint.sh
#ENTRYPOINT ["/entrypoint.sh"]
CMD entrypoint.sh

#CMD ["node", "server/index.js"]
#CMD ["nuxt", "build", "&&", "nuxt", "start"]
