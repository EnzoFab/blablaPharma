FROM mhart/alpine-node:11

ENV API_URL https://api.blalapharma.fr 

RUN mkdir /client
#RUN apk update && apk add bash
#RUN /bin/sh -c "apk add --no-cache bash"
#RUN mkdir /client

WORKDIR /client

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000 443
EXPOSE 3000 80

CMD ["npm", "start"]
