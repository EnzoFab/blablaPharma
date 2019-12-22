FROM mhart/alpine-node:11

RUN mkdir /client

RUN apk add bash
RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /client

COPY . .
#RUN npm install
#ENV HOST 0.0.0.0   # Insensitive environment variable
#ENV PORT 3000
#ENV NPM_CONFIG_PRODUCTION false
#ENV NODE_ENV production

EXPOSE 3000 443
EXPOSE 3000 80


#CMD ["npm", "prod"]

