# Infraestructura local

Servicios utilizados durante el desarrollo local:

- PostgreSQL: base de datos principal.
- Redis: cache, colas y procesamiento asíncrono.
- MinIO: almacenamiento S3-compatible.

## Iniciar

Desde la raíz del proyecto:

    docker compose -f infrastructure/docker/docker-compose.yml up -d

## Detener

    docker compose -f infrastructure/docker/docker-compose.yml down

## Ver estado

    docker compose -f infrastructure/docker/docker-compose.yml ps

## Ver logs

    docker compose -f infrastructure/docker/docker-compose.yml logs -f
