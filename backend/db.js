const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./resources/db.sqlite', (err) => {
  if (err) {
    console.log('could not open database file:', err)
  }
})

const createTable = 'CREATE TABLE IF NOT EXISTS messages \
                    (submit_time INT NOT NULL, \
                    submitter_nick VARCHAR(40) NOT NULL, \
                    message VARCHAR(500) NOT NULL)'

db.serialize(() => {
  db.run(createTable)
})

const newestMessagesQuery = 'SELECT rowid as id, submit_time, submitter_nick, message, ORDER BY date(submit_time) DSC Limit 100'
function getNewestMessages(cb) {
  db.get(oldestPoemQuery, (err, row) => {
    cb(err, row)
  })
}

const insertMessageQuery = 'INSERT INTO messages \
                         (submit_time, submitter_nick, message) \
                         VALUES (?, ?, ?)'
function insertMessage(submitter_nick, message, cb) {
  db.run(insertMessageQuery, Date.now(), submitter_nick, message, (err) => {
    cb(err)
  })
}