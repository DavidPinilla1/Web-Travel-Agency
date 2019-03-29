const environments = {
    production: "production",
    development: "development",
    test: "test"
}
const ENV = process.env.NODE_ENV || environments.development;
console.log(ENV)
const config = {
    [environments.production]: {
        PORT: 80,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'WebTravelAgency'
        }
    },
    [environments.development]: {
        PORT: 3001,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'WebTravelAgency_dev'
        }
    },

    [environments.test]: {
        PORT: 3000,
        MongoDB: {
            PORT: 27017,
            HOST: 'localhost',
            DB: 'WebTravelAgency_test'
        }
    }
}
const CONFIG=config[ENV]
if(!CONFIG){
    throw new Error(`MPDE_ENV ${ENV} is not a valir environment. `)
}
// console.log(CONFIG)
process.env={
    ...process.env,
    ...CONFIG
}