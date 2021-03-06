FROM python:3.9
# Install curl, node, & yarn
RUN apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -y nodejs \
    && curl -o- -L https://yarnpkg.com/install.sh | bash


WORKDIR /app/backend
 
# Install Python dependencies
COPY ./backend/requirements.txt /app/backend/
RUN pip3 install --upgrade pip -r requirements.txt

# Install JS dependencies
WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json /app/frontend/
RUN npm install

# Add the rest of the code
COPY . /app/
COPY ./backend/scripts/ /app/
# Build static files
RUN npm run build

# Have to move all static files other than index.html to root/
# for whitenoise middleware
WORKDIR /app/frontend/build

RUN mkdir root && mv *.ico *.json root
 
# Collect static files
RUN mkdir /app/backend/staticfiles
 
WORKDIR /app

# SECRET_KEY is only included here to avoid raising an error when generating static files.
# Be sure to add a real SECRET_KEY config variable in Heroku.
RUN DJANGO_SETTINGS_MODULE=librecritic.settings.prod \
    SECRET_KEY=TEST_SECRET_KEY \
    python3 backend/manage.py collectstatic --noinput

EXPOSE $PORT

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN ["chmod", "+x", "/app/entrypoint-prod.sh"]
ENTRYPOINT ["/app/entrypoint-prod.sh"]
