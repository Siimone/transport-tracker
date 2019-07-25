const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

testConnection = () => {
    console.log('TESTING POSTGRES..');
    pool.query('SELECT NOW()', (err, res) => {
        if(!err)
            console.log('POSTGRES OK!');
        else
            console.log('CANNOT CONNECT TO POSTGRES')
    });
};

listBuses = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM buses', (err, res) => {
            if(err) reject(err);
            resolve(res.rows)
        })
    })
};

insertLocation = async (bus_id, time, latitude, longitude) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO locations (bus_id, time, latitude, longitude) VALUES ($1, $2, $3, $4)',
            [
                bus_id,
                time,
                latitude,
                longitude
            ],
            (err) => {
                if(err) {
                    console.log(err)
                    reject();
                } else
                    resolve()
            }
        )
    })
}

module.exports = {
    testConnection,
    listBuses,
    insertLocation
};