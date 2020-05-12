# backend

## Environment variables

To deploy project it is required to create file `.env` and place these variables
into this file:

| Name | Type | Required | Default | Description  |
|---|---|---|---|---|
| `PORT` | `number` | yes | | Port number to launch |
| `ROOT` | `string` | no | `/` | Root URL to get access to server. For example - `/api`. So then you can get access by path `http://domain.com/api` |
| `DB_HOST` | `string` | yes | | Database host |
| `DB_PORT` | `number` | yes | | Database port | 
| `DB_NAME` | `string` | yes | | Database name |
| `ENVIRONMENT` | `development` or `production` | no | `production` | Server deploy environment |
| `STATIC_BASE_URL` | `string` | no | `/static` | Base URL where server can serve static. Works only when `ENVIRONMENT` is equal to `development` |
| `GEN_DIR_PATH` | `string` | yes | | Filesystem directory path where generated files can be placed |
| `PUBLIC_BASE_URL` | `string` | yes | | Base url used while paths to static are generated |
| `VK_APP_SECRET_KEY` | `string` | yes | | VK Mini Apps secret key. It is required to authorize users requests |
| `VK_API_REQUESTS_PER_SECOND` | `number` | no | `3` | Maximum requests count per second server can send to VK API |
| `VK_APP_SERVICE_KEY` | `string` | yes | | Application access token to perform requests to VK API |

## Scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Starts server in development mode watching for changes and automatically restarting project |
| `yarn build` | Builds project |
| `yarn start` | Starts built version of server |
| `yarn tunnel {port}` | Starts Ngrok tunnel |

## Deployment

1. Install dependencies - `yarn install`
2. Create `.env` file in project root and pass all required [environment variables](#environment-variables)
3. Build project - `yarn build`
4. Start project - `yarn start`

## Development

To commit project changes `conventional-github-releaser` is used. It means,
`CONVENTIONAL_GITHUB_RELEASER_TOKEN` env variable is required. To get it, 
follow this [link](https://github.com/settings/tokens/new) and create a token
with scope `repo`. 

Then, add variable `CONVENTIONAL_GITHUB_RELEASER_TOKEN=my_token` to `.env` file.
