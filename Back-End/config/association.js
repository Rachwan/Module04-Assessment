import User from "./user.js";
import Product from "./product.js";

User.hasMany(Product);
Product.belongsTo(User);