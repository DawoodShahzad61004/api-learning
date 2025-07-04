import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    // Unique identifier for each order (required by MongoDB)
    _id: mongoose.Schema.Types.ObjectId,

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true, // This field is mandatory
    },

    quantity: {
      type: Number,
      default: 1, // Default value = 1
    },

    orderDate: {
      type: Date,
      default: Date.now, // automatically set to current date if not specified
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Allowed values
      default: "Pending", // Default value
    },
  },
  {
    // Customize how the object is returned when converted to JSON
    toJSON: {
      transform: (doc, ret) => { 
        ret.id = ret._id; // Rename _id to id for frontend clarity
        // Remove internal MongoDB fields from the output
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
