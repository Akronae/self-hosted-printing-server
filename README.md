# Self Hosted Printing Server

> Are you tired of your relatives asking you to print something for them? Well, now they can do it themselves! Even if they are not on your local network.

![image](https://github.com/user-attachments/assets/e91a0fb0-2502-4dda-803c-2a579004a242)

## Running

```bash
git clone https://github.com/Akronae/self-hosted-printing-server
cd self-hosted-printing-server
touch docker-compose.yaml
```

```yaml
# docker-compose.yaml
services:
  api:
    build:
      context: api
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: "file:./dev.db"
      JWT_SECRET: "secret"
      ADMIN_USER: "admin"
      ADMIN_PWD: "pass"
      PRINTER_URL: "http://x.x.x.x:631"

  front:
    build:
      context: front
      args:
        PUBLIC_API_URL: "http://x.x.x.x:3001"
    ports:
      - "3000:3000"
```

## How is it working?

The API receives and convert files to JPEG format and sends the data to your printer through IPP.  
Therefore your printer should have IPP enabled and accept inbound connections.
