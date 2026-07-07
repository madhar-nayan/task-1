const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    const currentUser = req.header('x-user');
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'Unauthorized: login required' });
    }

    const product = await Product.create({ ...req.body, owner: currentUser });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const currentUser = req.header('x-user');
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'Unauthorized: login required' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.owner !== currentUser) {
      return res.status(403).json({ success: false, message: 'You do not have permission to update this product' });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const currentUser = req.header('x-user');
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'Unauthorized: login required' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.owner !== currentUser) {
      return res.status(403).json({ success: false, message: 'You do not have permission to delete this product' });
    }

    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
