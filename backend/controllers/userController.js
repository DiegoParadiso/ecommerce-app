import validator from 'validator'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
}

//Route for user register
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: 'Por favor, rellena todas las celdas.'})
        }
        //Check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(400).json({message: 'El usuario ya existe.'})
        }
        //Validating email format & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({message: 'El email no es válido.'})
        }
        if(password.length < 8){
            return res.status(400).json({message: 'La contraseña debe tener al menos 6 caracteres.'})
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error){
        console.log(error)
        res.json({success:false,message:error.menssage})
    }
}

//Route for admin login
const adminLogin = async (req, ers) => {
}

export {loginUser, registerUser, adminLogin}