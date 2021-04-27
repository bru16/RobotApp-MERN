import app from './app'
import './database' // mongo database

const PORT = process.env.PORT || 4001;

export const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


// I export const server to close it when testing.

