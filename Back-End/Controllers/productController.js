import Product from "../models/product.js";


export const createProduct = async (req, res) => {
  try {
    const { title, category, description, price, supplier } = req.body;
    const userId = req.user.id;

    const newProduct = await Product.create({
      title,
      category,
      description,
      price,
      supplier,
      UserId: userId,
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product', details: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, category, description, price } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const userId = req.user.id;
    if (product.UserId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this product' });
    }

    await product.update({
      title,
      category,
      description,
      price,
      supplier,
    });

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500) .json({ error: 'Failed to update product', details: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const userId = req.user.id;
    if (product.UserId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this product' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};
