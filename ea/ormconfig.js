const isDev = true;
const path = isDev ? "." : "build/data";
const ext = "js";
module.exports = {
  type: "sqlite",
  database: `${path}/database.sqlite`,
  logging: true,
  entities: [`build/data/entities/**/*.entity.${ext}`],
  migrations: [`build/data/migrations/**/*.${ext}`],
  subscribers: [`build/data/subscribers/**/*.subscriber.${ext}`],
  seeds: [`build/data/seeders/*.${ext}`],
  factories: [`build/data/factories/*.${ext}`],
  cli: {
    entitiesDir: `build/data/entities`,
    migrationsDir: `build/data/migrations`,
    subscribersDir: `build/data/subscribers`,
  },
};
