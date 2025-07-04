import Product from "../models/product.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

export const getAllProducts = (req, res) => {
  (async () => {
    try {
      const products = await Product.find()
        .select("id name price description productImage")
        .exec();

      const response = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        productImage: product.productImage,
        request: {
          type: "GET",
          description: "Get a specific product",
          url: `http://localhost:${PORT}/products/${product.id}`,
        },
      }));

      res.status(200).set({
        "Content-Type": "application/json",
      }).json({
        count: products.length,
        products: response,
      });
    } catch (err) {
      console.error(err);
      res.status(500).set({
        "Content-Type": "application/json",
      }).json({
        error: err.message,
      });
    }
  })();
};

export const createProduct = async (req, res) => {
  if (!req.file) {                        // Validate that a file was uploaded
    return res.status(400).set({
      "Content-Type": "application/json",
    }).json({
      error: "No product image uploaded. Please attach an image file with the key 'productImage'."
    });
  }

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name || "Default Product",
    price: req.body.price || 0.0,
    description: req.body.description || "No description provided",
    productImage: req.file ? req.file.path : "",
  });

  try {
    const result = await product.save();
    res.status(201).set({
      "Content-Type": "application/json",
    }).json({
      message: "Product created successfully",
      createdProduct: {
        id: result.id,
        name: result.name,
        price: result.price,
        description: result.description,
        productImage: result.productImage,
        request: {
          type: "GET",
          description: "Get the created product",
          url: `http://localhost:${PORT}/products/${result.id}`,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).set({
      "Content-Type": "application/json",
    }).json({
      error: err.message,
    });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.productId;

  try {
    const product = await Product.findById(id).exec();
    if (product) {
      res.status(200).set({
        "Content-Type": "application/json",
      }).json({
        message: "Product found",
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          productImage: product.productImage,
          request: {
            type: "GET",
            description: "Get all products",
            url: `http://localhost:${PORT}/products`,
          },
        },
      });
    } else {
      res.status(404).set({
        "Content-Type": "application/json",
      }).json({
        message: "No valid entry found for provided ID",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).set({
      "Content-Type": "application/json",
    }).json({
      error: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.productId;
  const updateOps = {};

  req.body.forEach((op) => {
    updateOps[op.propName] = op.value;
  });

  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: updateOps },
      { new: true }
    );

    if (!updated) {
      return res.status(404).set({
        "Content-Type": "application/json",
      }).json({
        message: "Product not found"
      });
    }

    res.status(200).set({
      "Content-Type": "application/json",
    }).json({
      message: "Product updated",
      product: {
        name: updated.name,
        price: updated.price,
        description: updated.description,
        productImage: updated.productImage,
        request: {
          type: "GET",
          description: "Get the updated product",
          url: `http://localhost:${PORT}/products/${updated.id}`,
        },
      },
    });
  } catch (err) {
    res.status(500).set({
      "Content-Type": "application/json",
    }).json({
      error: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.productId;

  try {
    const result = await Product.deleteOne({ _id: id }).exec();

    if (result.deletedCount > 0) {
      res.status(200).set({
        "Content-Type": "application/json",
      }).json({
        message: "Product deleted successfully",
        id: id,
        request: {
          type: "POST",
          description: "Create a new product",
          url: `http://localhost:${PORT}/products`,
        },
      });
    } else {
      res.status(404).set({
        "Content-Type": "application/json",
      }).json({
        message: "No valid entry found for provided ID",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).set({
      "Content-Type": "application/json",
    }).json({
      error: err.message,
    });
  }
};
