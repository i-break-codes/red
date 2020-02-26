# Red - A Node.js Boilerplate

### Setup

##### Requirements
Node.js >= 13.3.0

##### Install Node Modules
> Install Yarn from [https://yarnpkg.com/](https://yarnpkg.com/) if you haven't.
```
yarn install
```
---

##### Initialize System Configuration
```
npm run dev:app:setup
```
The above command will add required configuration files to the system at the following paths:

|File Name|Path|Info
|--|--|--|
|.env|App Root **( / )**|Environment Variables|
|pm2.development.json|App Root **( / )**|PM2 Configuration|
|auth.keys.json|Config **(/app/config/)**|Authentication Keys|
|db.config.json|Config **(/app/config)**|Database Configuration & Keys|
---
##### Set Configuration
##### .env
| Key | Value |
|--|--|
| env | development |
| port | 8082 (default) |

---

##### Initialize Server
```
npm run dev:app:run
```