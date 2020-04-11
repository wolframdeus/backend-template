# backend-template

Template to create a new backend service.

## Technologies
- Node JS
- TypeScript
- MongoDB
- Apollo

## Environment variables

To deploy project it is required to create file `.env` and place these variables
into this file:

| Name | Description  |
|---|---|
| `PORT` | Port number to launch |
| `ROOT` | Root URL to get access to server. For example - `/api`. So then you can get access by path `http://domain.com/api` |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port | 
| `DB_NAME` | Database name |
| `ENVIRONMENT` | Server deploy environment (`development` or `production`) |
| `VK_APP_SECRET_KEY` | VK Mini Apps secret key. It is required to authorize users requests |
| `STATIC_BASE_URL` | Base URL where server can serve static. Works only when `ENVIRONMENT` is equal to `development` |
| `CDN_BASE_URL` | CDN base URL. Used when server generates assets and returns path to them |

## Scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Starts server in development mode watching for changes and automatically restarting project |
| `yarn build` | Builds project |
| `yarn start` | Starts build version of server |
| `yarn tunnel {port}` | Starts Ngrok tunnel |

## Deployment
To deploy project:
1. Install dependencies - `yarn install`
2. Create `.env` file in project root and pass all required [environment variables](#environment-variables)
3. Build project - `yarn build`
4. Start project - `yarn start`
