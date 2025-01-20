// import { dbConnection } from "@/libs/dbConnection";
// import Product from "@/models/ProductModel";
// import { NextResponse } from "next/server";

// // Typing the request parameter
// export async function POST(request: Request) {
//   const { name, image, price, category } = await request.json();

//   await dbConnection();

//   await Product.create({ name, image, price, category });

//   return NextResponse.json({ message: "Product Created" }, { status: 201 });
// }
