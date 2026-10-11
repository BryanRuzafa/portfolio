#!/usr/bin/env bash
# Sube el portfolio a bryanrg.dev y reconstruye el contenedor.
# Uso (desde la raíz del proyecto, en Git Bash): bash deploy/deploy.sh
# El .env del servidor (/opt/portfolio/.env, claves de Resend) no se toca.
set -euo pipefail

# El servidor solo acepta SSH por la red privada (VPN): bryanrg.dev pasa por Cloudflare
# y el puerto 22 público está cerrado. Indica el destino al lanzarlo:
#   DEPLOY_HOST=usuario@servidor-en-la-vpn bash deploy/deploy.sh
HOST="${DEPLOY_HOST:?Define DEPLOY_HOST (usuario@host del servidor)}"
DIR="${DEPLOY_DIR:-/opt/portfolio}"

tar --exclude=node_modules --exclude=.next --exclude=.git --exclude='.env*' \
    -czf - . | ssh "$HOST" "mkdir -p $DIR && tar -xzf - -C $DIR"

ssh "$HOST" "cd $DIR && docker compose up -d --build && docker image prune -f >/dev/null"

# Next tarda unos segundos en arrancar: reintenta antes de dar el despliegue por fallido.
for i in $(seq 1 15); do
  if curl -fsS -o /dev/null https://bryanrg.dev/ 2>/dev/null; then echo "https://bryanrg.dev → OK"; exit 0; fi
  sleep 2
done
echo "https://bryanrg.dev no responde tras 30 s: revisa 'docker logs portfolio' en el servidor" >&2
exit 1
