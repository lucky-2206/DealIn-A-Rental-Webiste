const Product = require('../models/Product')
const productController = require('express').Router()
const verifyToken = require("../middlewares/verifyToken")

// get all
productController.get('/getAll', async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get featured
productController.get('/find/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ featured: true }).populate("currentOwner", '-password')
        return res.status(200).json(featuredProducts)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get all from type
productController.get('/find', async (req, res) => {
    const type = req.query
    try {
        if (type) {
             const products = await Product.find(type).populate("currentOwner", '-password')
             return res.status(200).json(products)
        } else {
            return res.status(500).json({msg:"No such type exists"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// To Fetch the count of Type of Products
productController.get('/find/types', async (req, res) => {
    try {
        const electronicGadgetsType = await Product.countDocuments({ type: "Electronic_Gadgets" })
        const menFashionType = await Product.countDocuments({ type: "Men_Fashion" })
        const womenFashionType = await Product.countDocuments({ type: "Women_Fashion" })
        const sportsType = await Product.countDocuments({ type: "Sports" })
        const householdAppliancesType = await Product.countDocuments({ type: "Household_Appliances" })
        
        return res.status(200).json(
            { Electronic_Gadgets:electronicGadgetsType,
                Men_Fashion:menFashionType ,
                Women_Fashion:womenFashionType,
                Sports:sportsType,
                Household_Appliances:householdAppliancesType 
            })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// To Fetch Individual Products
productController.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('currentOwner', '-password')

        if (!product) {
            throw new Error('No such product exists with the given id')
        } else {
            return res.status(200).json(product)
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// To create a Product
productController.post('/', verifyToken, async (req, res) => {
    try {
        const newProduct = await Product.create({ ...req.body, currentOwner: req.user.id })

        return res.status(200).json(newProduct)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// To update an existing Product
productController.put('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to update other people's product")
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )


        return res.status(200).json(updatedProduct)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//To  delete an Existing Product
productController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        
        if (product.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error("You are not allowed to delete other people product")
        }
        else{
        await product.delete()
        
        return res.status(200).json({ msg: "Product Deleted Successfully" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = productController;
