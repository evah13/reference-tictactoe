#Segir til um hvaðan image-ið er að koma
FROM node     
#Mappa sem heldur utanum kóðann
WORKDIR /code 
#Copy-ar inní build möppuna
COPY package.json .
COPY . .
#Installa dependencies
RUN npm install --silent
EXPOSE 3000
#Node á að keyrast úr þeirri möppu sem ég er í núna
ENV NODE_PATH .
#Vísar í þessa scriptu
CMD ["./docker-run.sh"]
