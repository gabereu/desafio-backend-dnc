import { DataSource } from "typeorm"
import { Administrator } from "./models/Administrator"
import { Presence } from "./models/Presence"
import { User } from "./models/User"

export const appDataSource = new DataSource({
    type: "sqlite",
    database: "./src/main/infra/typeorm/database/database.sqlite",
    entities: [User, Administrator, Presence],
    synchronize: true,
    logging: false,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
appDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
;
