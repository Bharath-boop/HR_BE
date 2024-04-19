import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SALT = 10

const createhash = async (data) => {
    let salt = await bcrypt.genSalt(SALT)
    let hash = await bcrypt.hash(data, salt)
    return hash
}

const hashcompare = async (data, hash) => {
    return bcrypt.compare(data, hash)
}

const gentoken = async (payload) => {
    let token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
    return token
}

const decodeToken = async (token) => {
    return await jwt.decode(token)
}

const autherization = async (req, res, next) => {
    let token = req?.headers?.authorization?.split(' ')[1]
    if (token) {
        let payload = await decodeToken(token)
        let time = +new Date / 1000
        let cureentTime = Math.floor(time)
        if (cureentTime < payload.exp) {
            next()
        }
        else {
            res.status(402).send({
                message: 'Session Expiry'
            })
        }

    }
    else {
        res.status(402).send({
            message: 'unautheration'
        })
    }
}
const adminGurd = async (req, res, next) => {
    let token = req?.headers?.authorization?.split(' ')[1]
    if (token) {
        let payload = await decodeToken(token)
        if (payload.role === 'admin') {
            next()
        }
        else {
            res.status(402).send({
                message: 'This only Admin Access'
            })
        }

    }
    else {
        res.status(402).send({
            message: 'unautheration'
        })
    }
}

export default {
    createhash,
    hashcompare,
    gentoken,
    autherization,
    adminGurd
}


