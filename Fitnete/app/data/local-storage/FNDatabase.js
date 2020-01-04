import User from './schema/User';
import WaterIntake from './schema/WaterIntake';
import WaterIntakeGoal from './schema/WaterIntakeGoal';
import TrainingProgram from './schema/TrainingProgram';
import TrainingWeek from './schema/TrainingWeek';
import TrainingDay from './schema/TrainingDay';
import TrainingExercise from './schema/TrainingExercise';
import Reminder from './schema/Reminder';

const DB_SCHEMA_VERSION = 5;
const DB_SCHEMA = [
    User,
    WaterIntake,
    WaterIntakeGoal,
    TrainingProgram,
    TrainingWeek,
    TrainingDay,
    TrainingExercise,
    Reminder
];
let database = null;

export default {
    database() {
        return database;
    },

    async open() {
        if (!database) {
            database = await this._openDB();
            console.log('Realm path: ', database.path);
        }
        return true;
    },

    close() {
        if (database) {
            database.close();
        }
    },

    async _openDB() {
        let db = null;
        const Realm = require('realm');
        try {
            db = await Realm.open({
                schema: DB_SCHEMA,
                schemaVersion: DB_SCHEMA_VERSION
            });
        } catch (error) {
            console.log('_openDB()', error);
        } finally {
            return db;
        }
    }
}