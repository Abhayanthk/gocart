import { connect, useSelector } from "react-redux";
import { NextResponse } from "next/server";
import imagekit from "@/congifs/imageKit";
import { getUserData } from "@/utilities/getUserData";
import { toFile } from "@imagekit/nodejs";
const prisma = require("@/lib/prisma");
export async function POST(request) {
  try {
    const userData = await getUserData();
    // Collect, store, and send key–value pairs (like form inputs) in HTTP requests — including file uploads.
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");
    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !image
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const store = await prisma.store.findUnique({
      where: {
        userId: userData.id.toString(),
      },
    });
    if (store) {
      return NextResponse.json(
        { message: "Store already exists" },
        { status: 400, statusText: store.status }
      );
    }
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileObject = await toFile(buffer, image.name);

    const response = await imagekit.files.upload({
      file: fileObject,
      fileName: image.name,
    });

    const optimizedImage = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        {
          quality: "auto",
          width: 512,
          format: "webp",
        },
      ],
    });

    const newStore = await prisma.store.create({
      data: {
        userId: userData.id.toString(),
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });
    await prisma.user.update({
      where: {
        id: userData.id.toString(),
      },
      data: {
        store: { connect: { id: newStore.id } },
      },
    });
    return NextResponse.json({
      message: "Applied, waiting for approval",
      store: newStore,
    });
  } catch (err) {
    console.log(err);
    if (err.code === "P2002") {
      return NextResponse.json(
        { message: "username already taken" },
        { status: 400, statusText: "username already taken" }
      );
    }
    return NextResponse.json(
      { err: err.code || err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const userData = await getUserData();
  try {
    const store = await prisma.store.findUnique({
      where: {
        userId: userData.id.toString(),
      },
    });
    if (store) return NextResponse.json({ status: store.status, store });
    return NextResponse.json({ status: "not registered" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: err.code || err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
