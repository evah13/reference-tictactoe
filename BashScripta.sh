#!/bin/bash

echo Cleaning...  # Skrifar á skjáinn að það sé verið að hreinsa
rm -rf ./build    # Eyða núverandi build möppu 


# Til að merkja image-ið í Docker með sama merki og er á Github
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

# Fix fyrir Jenkins
npm install --silent
cd client
npm install --silent
cd ..

echo Building app   # Skrifar út á skjáinn "Building app"
npm run build       # Buildar verkefnið

# Ef að build fail-ar þá er skrifað á skjáinn: "Npm build failed with exit code"
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi


# taggið á committinu er sett inn í tímabundna textaskrá
cat > ./build/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

cat > ./build/.env << _EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

mkdir build/public  # Býr til möppu inni í buildmöppunni

# Býr til html skjal
cat > ./build/public/version.html << _EOF_
<!doctype html>
<head>
   <title>App version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_


cp ./Dockerfile ./build/   #Copy-ar Dockerfile skjalið inní Build möppuna
cp package.json ./build/   #Copy-ar package.json skjalið inní build möppuna
cp docker-run.sh ./build/  #Copy-ar docker-run.sh skjalið inní build möppuna
cp docker-compose.yaml ./build/

cd build   # Fer inní Build möppuna
echo Building docker image  #Skrifar út á skjáinn "Building docker image."

docker build -t evabjork/tictactoe:$GIT_COMMIT .   #Docker build 

# Skrifar út á skjáinn ef að build-ið fail-ar
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

#til að komast áfram í Jenkins..
sudo docker login --username evabjork --password fakepassword

# Pushar inní docker
docker push evabjork/tictactoe:$GIT_COMMIT
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi

# Skrifar út á skjáinn "Done"
echo "Done"
