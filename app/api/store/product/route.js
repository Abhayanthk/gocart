import imagekit from "@/congifs/imageKit";
import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { NextResponse } from "next/server";
import { toFile } from "@imagekit/nodejs";
const { getUserData } = require("@/utilities/getUserData");

// Add new Product
export async function POST(request) {
  try {
    const userData = await getUserData();
    // get storeId from authSeller middleware
    const storeId = await authSeller(userData.id);
    if (!storeId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }
    // get the data from the form
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const mrp = Number(formData.get("mrp"));
    const price = Number(formData.get("price"));
    const category = formData.get("category");
    const images = formData.getAll("image");
    if (
      !name ||
      !description ||
      !mrp ||
      !price ||
      !category ||
      images.length === 0
    ) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }
    //uploading images to imageKit
    const imagesurl = await Promise.all(
      images.map(async (image) => {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileObject = await toFile(buffer, image.name);
        const response = await imagekit.files.upload({
          file: fileObject,
          fileName: image.name,
          folder: "products",
        });

        const url = response.helpers.buildSrc({
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
          src: response.filePath,
          transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "1024" },
          ],
        });
        return url;
      })
    );
    await prisma.product.create({
      data: {
        name,
        description,
        mrp,
        price,
        category,
        images: imagesurl,
        storeId,
      },
    });
    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.code || err.message },
      { status: 500 }
    );
  }
}

// get all proudcts for a seller
export async function GET(request) {
  try {
    const userData = await getUserData();
    // get storeId from authSeller middleware
    const storeId = await authSeller(userData.id);
    if (!storeId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }
    const proudcts = await prisma.product.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json({ proudcts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.code || err.message },
      { status: 500 }
    );
  }
}
