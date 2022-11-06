import { DataSource } from 'typeorm';
import path from 'path';

import { Thought } from './entities/Thought';

const dataSource = new DataSource({
    type: "better-sqlite3",
    database: path.resolve('./database.db'),
    entities: [Thought]
});

export default dataSource;
