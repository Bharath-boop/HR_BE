import userModel from "../models/user.js";
import auth from "../Utils/auth.js";

const GET_ALL_USER = async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 })
        res.status(200).send({
            message: "USER DATA SUCESSFULLY FETCHING",
            users
        })

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}



const CREATE_USER = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            // req.body.password = await auth.createhash(req.body.password)
            let newUser = await userModel.create(req.body)
            res.status(200).send({
                message: "USER DATA ADDING  SUCESSFULLY"
            })
        }
        else {
            res.status(400).send({
                message: `THIS ${req.body.email} ALREADY EXIST`,
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const LOGIN = async (req, res) => {
    try {

        const user = await userModel.findOne({ email: req.body.email })
        // console.log(user.password);
        if (user) {
            if (await auth.hashcompare(req.body.password, user.password)) {
                const token = await auth.gentoken({
                    name: user.name,
                    email: user.email,
                    role: user.role
                })

                res.status(200).send({
                    message: "LOGIN SUCESSFULLY",
                    token,
                    role: user.role
                })
            }
            else {
                res.status(400).send({
                    message: `INCORRECT PASSWORD`
                })
            }
        }
        else {
            res.status(400).send({
                message: `THIS ${req.body.email} NOT EXIST`
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const DELETE_USER = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id })
        // console.log(user);
        if (user) {
            await userModel.deleteOne({ _id: req.params.id })
            res.status(200).send({
                message: "DELETED SUCESSFULLY"
            })
        }
        else {
            res.status(400).send({
                message: "INVALID USER",
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}
const GET_USER_BY_ID = async (req, res) => {
    try {
        const users = await userModel.findById({ _id: req.params.id })
        res.status(200).send({
            message: "USER DATA SUCESSFULL FETCHING",
            users
        })

    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}

const EDIT_USER = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id })
        if (user) {
            user.name = req.body.name
            user.email = req.body.email
            user.mobile = req.body.mobile
            user.desingnation = req.body.desingnation
            user.gender = req.body.gender
            user.Course = req.body.Course
            await user.save()
            res.status(200).send({
                message: "USER DATA ADDED SUCESSFULL"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    }
}



export default {
    GET_ALL_USER,
    CREATE_USER,
    LOGIN,
    GET_USER_BY_ID,
    DELETE_USER,
    EDIT_USER
}
