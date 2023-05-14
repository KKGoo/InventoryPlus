build-images:
	cd inventory-server/ && podman build -t "inventory-server:1.0" .
	cd inventory-client/ && podman build \
		--build-arg BACKEND_URL=https://back.kaizoyu.ovh \
		--build-arg RUNNING_PORT=3001 \
		-t "inventory-client:1.0" .

start:
	podman-compose up -d

stop:
	podman-compose stop