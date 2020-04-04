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

const newestMessagesQuery = 'SELECT submit_time, \
                              submitter_nick, \
                              message \
                              FROM messages \
                              ORDER BY submit_time DESC \
                              LIMIT (?)'

function getNewestMessages(count) {
  return new Promise((res, rej) => {
    db.all(newestMessagesQuery, count, (err, rows) => {
      if (err) {
        console.log('erred', err)
        return rej(err)
      }
      res(rows)
    })
  })
}

const insertMessageQuery = 'INSERT INTO messages \
                         (submit_time, submitter_nick, message) \
                         VALUES (?, ?, ?)'
function insertMessage(submitter_nick, message, cb) {
  console.log('inserting', submitter_nick, message)
  db.run(insertMessageQuery, Date.now(), submitter_nick, message, (err) => {
    cb(err)
  })
}

module.exports = {
  getNewestMessages, insertMessage
}