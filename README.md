

# Red - Lightweight Node.js Boilerplate

![Lightweight Node.js Boilerplate](https://i.imgur.com/KUNNhs7.png)

### Why Red
Lightweight Node.js Boilerplate. Goal is to keep it minimal and on the point.

### Features
- OAuth (Google)
- Logging (Morgan & Winston)
- Routing
- Global Exception Handling
- NoSQL Database (MongoDB & Mongoose ORM)

### Setup

##### Requirements
Node.js >= 13.3.0

##### Clone Repo
```
git clone https://github.com/i-break-codes/red.git
```
Once you are done cloning the repo, navigate to the project directory and follow the steps mentioned below:

##### Switch NVM Version
```
nvm use
```

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
##### .env Defaults (/.env)
```
# Strictly use this for setting Environment variables only, 
# use Config to store App Config.

env=development
port=8082
```

---

##### PM2 Dev Configuration Defaults (/pm2.development.json)
```
{
  "name": "red-dev",
  "script": "./server.js",
  "watch": true,
  "watch_delay": 1000,
  "log_date_format" : "YYYY-MM-DD HH:mm Z",
  "ignore_watch": [
  "node_modules",
    "*.log",
    "yarn.*",
    ".gitignore",
    "package.json",
    "samples",
    ".nvmrc",
    "README.md"
  ],
  "watch_options": {
    "followSymlinks": false
  },
  "args": ["--color"]
}
```

##### Database Configuration Defaults (/app/config/db.config.json)	
```
{
  "mongo": {
    "name": "red",
    "username": "",
    "password": "",
    "host": "localhost",
    "port": 27017
  },
  "redis": {
    "host": "localhost",
    "port": 6379,
    "ttl": 2592000,
    "secret": "R4ND0M_JUNK"
  }
}
```

##### OAuth Authorization Keys (/app/config/auth.keys.json)
```
{
  "google": {
    "clientId": "CLIENT_ID",
    "clientSecret": "CLIENT_SECRET"
  }
}
```

---

##### Initialize Server
```
npm run dev:app:run
```