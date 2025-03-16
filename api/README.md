## Getting Started

```bash
yarn
yarn prisma generate
yarn prisma migrate dev
yarn dev
```

## Testing

```bash
yarn test
```

## Creating new service

Creates a module + service to handle vendor specific logic (e.g. db-app prisma, GitHub API, etc.)

```bash
yarn gen:nest service <service-name>
```

## Creating new endpoint

Creates a new endpoint in the API with a controller, service, and module. (e.g. /v1/users)

```bash
yarn gen:nest endpoint <endpoint-name>
```
