# librecritic

![Main page screenshot](https://github.com/DimaPekutko/librecritic/blob/main/public/screen1.png?raw=true)

### Django React Postgres Docker pet project.
App available here https://librecritic.herokuapp.com 

## Installation
```bash 
git clone https://github.com/DimaPekutko/librecritic
cd librecritic
```
## Run
You need to have docker compose for running.
```bash
sudo docker compose up -d --build
```
## Tests
```bash
docker compose exec backend python3 manage.py test
```