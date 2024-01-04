import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";

export default async function handler(req, res) {
 res.json('Should be a POST request');
 }
  const {name, email, city,
    postalCode, streetAddress, country,
    cartProducts,
  } = req.body;
  try {
    await mongooseConnect();

    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      const quantity = productsIds.filter(id => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          product: {
            id: productInfo._id.toString(),
            name: productInfo.title,
          },
          amount: quantity * productInfo.price * 100,
        });
      }
 }
 const session = await getServerSession(req, res, authOptions);

    const orderDoc = await Order.create({
      line_items,
      name, email, city, postalCode,
      streetAddress, country, paid: false,
      userEmail: session?.user?.email,
    });

    res.json({
      success: true,
      orderId: orderDoc._id.toString(),
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
