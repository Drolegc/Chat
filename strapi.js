const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fanappdb_messages';
const client = new MongoClient(url);

//Save messages on MongoDB

const saveMessagesOnMongoDB = function(list_of_messages, db, callback) {
    const messages_collection = db.collection('messages')

    messages_collection.insertMany(list_of_messages, function(err, result) {
        assert.strictEqual(err, null)
        console.log("Mensajes guardados, cantidad: " + list_of_messages.length)
        callback(result)

    })
}

const saveSessionOnMongoDB = function(session, db, callback) {
    const session_collection = db.collection('sessions')
    session_collection.insertOne(session, function(err, result) {
        console.log("Session guardada")
        callback(result)
    })
}

const findMessagesOnMongoDB = function(userID, db, callback) {
        const messages_collection = db.collection('messages')

        messages_collection.find({})
    }
    /**
     * Messages
     */

/* abstract */
class MessageStore {
    saveMessage(message) {}
    findMessagesForUser(userID) {}
}

class InMemoryMessageStore extends MessageStore {
    constructor() {
        super()
        this.messages = []
    }

    saveMessage(message) {
        this.messages.push(message)
    }

    findMessagesForUser(userID) {
        return this.messages.filter(
            ({ from, to }) => from === userID || to === userID
        )
    }
}

/**
 * Sessions
 */

/* abstract */
class SessionStore {
    findSession(id) {}
    saveSession(id, session) {}
    findAllSessions() {}
}

class InMemorySessionStore extends SessionStore {
    constructor() {
        super()
        this.sessions = new Map()
    }

    findSession(id) {
        return this.sessions.get(id)
    }

    saveSession(id, session) {
        this.sessions.set(id, session)
    }

    findAllSessions() {
        return [...this.sessions.values()]
    }
}