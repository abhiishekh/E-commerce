import express from 'express';
import { ProductModule } from '../db/db.js';

const route = express.Router();

route.post('/product', async (req, res) => {
  const { title, description, price, mrp, stocks, imageUrl } = req.body;

  if (!title || !description || !price || !mrp || !stocks || !imageUrl) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    console.log("shi hai yha tk")
   const response = await ProductModule.create({
    title,
    price,
    mrp,
    stocks,
    description,
    imageUrl
   })
   if(!response){
    console.log("could not post")
    return res.status(400).json({
      message:"not posted"
    })
   }
   console.log("data posted" + response)
    res.status(200).send({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).send({ error: 'Failed to add product' });
  }
});

route.get('/product/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const response = await ProductModule.findOne({
      _id: productId,
    });

    if (!response) {
      return res.status(400).json({
        message: "Data not found",
      });
    }

    res.status(200).json({
      response,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

route.get('/product', async (req, res) => {
  try {
    const products = await ProductModule.find();

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No data found",
      });
    }

    const response = products.map((item) => {
      return {
        ...item.toObject(),
        imageUrl: item.imageUrl, 
      };
    });

    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Something went wrong: " + error);
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: error.message,
    });
  }
});

export default route;
