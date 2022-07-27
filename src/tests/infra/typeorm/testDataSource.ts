/* istanbul ignore next */

import { Administrator } from "@infra/typeorm/models/Administrator";
import { Presence } from "@infra/typeorm/models/Presence";
import { User } from "@infra/typeorm/models/User";
import { DataSource } from "typeorm"

export const testDataSourceFatory = async () => {

    const testDataSource = new DataSource({
        type: "sqlite",
        database: "src/tests/infra/typeorm/database/database.sqlite",
        entities: [User, Administrator, Presence],
        synchronize: true,
        logging: false,
        dropSchema: true
    });

    await testDataSource.initialize();

    return testDataSource;
;

} 



