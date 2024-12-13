cd back
# docker-compose down
# docker-compose build --no-cache
docker-compose up -d --build

echo "================================>"
echo          "CMS SERVER STARTED"
echo "================================>"

cd ..

cd front
# docker-compose down
# docker-compose build --no-cache
docker-compose up -d --build
echo "================================>"
echo          "CMS FRONTEND STARTED"
echo "================================>"
cd ..