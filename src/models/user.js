import mongoose from "./index.js"


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is requied"],
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: Number,
        min: [10],
        required: [true, 'User phone number required']
    },
    desingnation: {
        type: String,
        required: [true],
    },
    gender: {
        type: String,
        required: [true],
    },
    Course: {
        type: String,
        required: [true],
    },
    image: {
        type:String,
        default: "https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
    },

    password: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'user',
    versionKey: false
})

const userModel = mongoose.model('user', userSchema)


export default userModel