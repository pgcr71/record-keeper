export const dataBaseConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "G@ni7112",
  schema: "recordkeeper",
  debug: true,
};

export const poolingSettings = { enabled: true, maxIdleTime: 30000, maxSize: 25, queueTimeout: 10000 };

export const publicKey = "hello ganesh";

export const staticFilesLocation = "dist/record-keeper";
