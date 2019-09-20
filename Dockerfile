FROM mhart/alpine-node:11

RUN mkdir /client

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /client

COPY package.json .
RUN npm install

COPY . .

#RUN npm run build

EXPOSE 3000 443
EXPOSE 3000 80


#CMD ["npm", "start"]

#version with script
# uncoment the two following lines and coment the line 18 and 28
#RUN chmod 700 entrypoint.sh
RUN npm run build
CMD ["npm", "start"]

#CMD ["sh", "entrypoint.sh"]


