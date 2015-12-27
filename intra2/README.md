# Intra2 #

---

### Redis ###

Install Redis on Ubuntu 14.04

    sudo apt-get install redis-server

### Celery ###

**Running Celery**

    python projectile/manage.py celery worker --loglevel=info

**Running Celery in developer mode**

    python projectile/manage.py celery worker --loglevel=info --autoreload

### APP_URL ###

The *APP_URL* is the url for the bucket or the server that serves the Angular.js app.

The *APP_URL* environment variable can be set in .pam_environment like so

    APP_URL=//test.example.com:8080/

**NOTE:** The trailing slash

---

## Deployment Procedures ##

---

## The 'django' user ##

The `django` user is the owner of the django project. It resides in `/home/django` and the project resides in `/home/django/project`

## Managing uWSGi ##

    sudo /etc/init.d/uwsgi start|stop|restart

The logs are located in `/home/django/logs/uwsgi/...`

    sudo su django
    tail -f ~/logs/nginx/uwsgi.log

## Managing Nginx ##

    sudo service nginx start|stop|restart

The logs are located in `/home/django/logs/nginx/...`

    sudo su django
    tail -f ~/logs/nginx/access.log

## Server configuration files ##

The config files should be checked into the repo whenever tweaks or changes are made.

* Nginx: `repo/conf/nginx/...`
* uWSGi: `repo/conf/uwsgi/...`
* WSGi: `repo/conf/wsgi/...`

They are located at `/home/django/project/conf/...` on the server

## Environment variables ##

If you need to add environment vars. You can do it by changing `/etc/enviroment`

    sudo nano /etc/environment

## Deployment ##

    sudo su django
    git pull

---

## Development server ##

---

**SSH Login**

**TIP:** Ask Faisal (@faisalmahmud) to give you access to the development server.

**TIP:** Paste the snippet below in your ~/.ssh/config file, but remember to change to your user and the path to your identityfile (SSH private key)

	Host *
	IdentitiesOnly yes
	ServerAliveInterval 60

	host examplehost
		hostname test.example.com
		user johndoe
		port 1919


**Cloning your fork**

	cd ~
	git clone bitbucket.com:johndoe/projectile.git project


**Setting up a virtualenv**

virtualenv is a nifty tool for creating virtual environments for Python projects

	cd ~
	virtualenv env
	source ~/env/bin/activate

If you find it tedious to do the above everytime you log in you can copy the snippet below in to a file named *~/.bash_profile* and You will automatically land in the project folder everytime you log in with the virtualenv activated.

	source ~/env/bin/activate
	cd ~/project

Try logging out from your ssh session and log in to see if the snippet above works.


**Install the Python dependencies for the project**

Make sure your virtualenv is active, the name of the env wrapped in round brackets should appear next to your username@hostname in the terminal.

	(env)johndoe@uduntu:~$

And then run

	pip install -r ~/project/requirements.txt

**Add your IP to internal IPs**

Add your IP to the variable INTERNAL_IPS in projectile\projectile\settings.py. You can find your IP address with http://www.whatsmyip.org/

**Set APP_URL**

Set the environment variable APP_URL to the IP of the development server and the port that the front-end http server is serving. For example:

	export APP_URL=http://123.456.789.123:8080/

**Run the test server**

The ports are often free 8111, 8222, 8333, 8444, 8555, 8777

	cd ~/project
	python projectile/manage.py runserver_plus 0:8111

---

## JWT Authentication ##

---

**Authenticate and get a token**

	$ curl -X POST -d "email=john@dough.com&password=abcdef123456" http://<BASE_URL>/api-token-auth/

or as json

	$ curl -X POST -H "Content-Type: application/json" -d '{"email":"john@dough.com", "password":"abcdef123456"}' http://<BASE_URL>/api-token-auth/

**Fetching data from protected URLs**

	$ curl -H "Authorization: Bearer <YOUR_TOKEN>" http://<BASE_URL>/api/v1/me/stream

**Refresh token**

	$ curl -X POST -H "Content-Type: application/json" -d '{"token":"<EXISTING_TOKEN>"}' http://<BASE_URL>/api-token-refresh/

Read more at http://getblimp.github.io/django-rest-framework-jwt/