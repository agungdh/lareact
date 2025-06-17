# Pre Deployment
prepare .env nya
# Deployment
ini contih docker-compose.yml
```yaml
services:
    app:
        image: agungdh/lareact          # same image you passed to docker run
        container_name: app # optional—keeps the same explicit name
        restart: always
        ports:
        - "8000:80"           # host:container
        volumes:
        - supervisor-logs:/var/log/supervisor
        - php-logs:/var/log/php
        - nginx-logs:/var/log/nginx
        - storage-logs:/var/www/html/storage/logs
        - .env:/var/www/html/.env:ro
        
# Named-volume declarations (so Docker knows to keep them around)
volumes:
    supervisor-logs:
    php-logs:
    nginx-logs:
    storage-logs:

```

# POST DEPLOY
docker compose exec --user root app chmod +x ./post-deploy.sh
docker compose exec --user www-data app ./post-deploy.sh
docker compose restart app
