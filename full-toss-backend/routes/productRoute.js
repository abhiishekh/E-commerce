import express from 'express'
import { ProductModule } from '../db/db.js'

const route = express.Router()

route.post('/product',async function(req,res){
    const {
        title,
        description,
        mrp,
        price,
        imageUrl,
        stocks
    } = req.body

    try {
        const response = await ProductModule.create({
            title,
            description,
            mrp,
            price,
            imageUrl,
            stocks
        })
        if(!response){
            return res.status(304).json({
                message:"Could not proceed, Bad response!"
            })
        }
        res.json({
            message:"success",
            response
            
        })

    } catch (error) {
        console.log("An error occured " + error)
        const errormsg = error.errmsg
        return res.status(500).json({
            errormsg
        })
    }
    
})

route.get('/product/:id',async function(req,res){
    const id = req.params.id

    try {
        const response = await ProductModule.findOne({
            _id:id
        })
        if(!response){
            return res.status(400).json({
                message:"product not found"
            })
        }
        res.json({
            response
        })
    } catch (error) {
        console.log("An Error occured " + error)
        const errormsg = error.errmsg
        return res.status(500).json({
            errormsg
        })
    }
})
route.get('/product',async function(req,res){
    
    try {
        const response = await ProductModule.find()
        if(!response){
            return res.status(404).json({
                message:"products not fund"
            })
        }
        res.json({
            response
        })
        
    } catch (error) {
        console.log("Something went wrong " + error)
        const errormsg = error.errmsg
        return res.status(500).json({
            errormsg
        })
    }
})

export default route