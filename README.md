# Weather Cities App

Dependencies
 - node 11
 - postgres

1. Install the application.
After you've cloned the repository, add `.env` file. Copy from `.env.example`, and update the `OPENWEATHER_KEY`.
If you want to run the app locally then also update the required database configurations in `.env`.

### [LOCAL] Steps to run the app on local
first, run the migrations and seeding
```
npm run db:migrate
npm run db:seed
```
Then, either run the tests (`npm test`) or start the application (`npm start`)


## Running on Docker
Make sure `.env` is set with proper values. 
Run `docker-compose up` to start the application. 
`http://localhost:8080` should be up and running



### Approach
- First, the cities are seeded to database. When there is a GET request, data is fetched from database. 
- Framework used: express (node)
- ORM: Sequelize
