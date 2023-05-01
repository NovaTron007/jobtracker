# run app
- npm start

# backend setup
- cd root then npm init
- node seeder to import mock data
- npm install nodemon -D
- npm install express
- npm install dotenv
- npm install mongoose
- npm install validator
- npm install morgan
- npm install express-async-errors
- npm install http-status-codes
- npm install bcryptjs
- npm install jsonwebtoken
- npm install concurrently --save-dev (rem to npm install in client when pulled)
- npm install cors
- npm install moment
- npm install helmet xss-clean express-mongo-sanitize express-rate-limit

# frontend setup (check readme in client)
- npm install if pulled
- add proxy to package.json

# create .gitignore
- /node_modules
- /config/.env

# build & install client scripts
- In root package.json scripts "install-client": "cd client && npm install"
- In root package.json scripts "build-client": "cd client && npm run build"
# deployment
- In client remove build and node_modules
- In server remove node_modules, package-lock.json
- In root package.json scripts add "setup-production":"npm run install-client && npm run build-client && npm install"

# run last steps locally
- npm run setup-production
- node server