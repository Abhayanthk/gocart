import { connect, useSelector } from "react-redux";
import { NextResponse } from "next/server";
import imagekit from "@/congifs/imageKit";
import { format } from "date-fns";
const prisma = require("@/lib/prisma");

// export async function POST(request) {
//   const { user } = useSelector((state) => state.auth);
//   try {
//     // Collect, store, and send key–value pairs (like form inputs) in HTTP requests — including file uploads.
//     const formData = await request.formData();
//     const name = formData.get("name");
//     const username = formData.get("username");
//     const description = formData.get("description");
//     const email = formData.get("email");
//     const contact = formData.get("contact");
//     const address = formData.get("address");
//     const image = formData.get("image");
//     if (
//       !name ||
//       !username ||
//       !description ||
//       !email ||
//       !contact ||
//       !address ||
//       !image
//     ) {
//       return new NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const store = await prisma.store.findUnique({
//       where: {
//         userId: user.id,
//       },
//     });
//     if (store) {
//       return new NextResponse.json(
//         { message: "Store already exists" },
//         { status: 400 },
//         { statusText: store.status }
//       );
//     }
//     const buffer = Buffer.from(await image.arrayBuffer());
//     const response = await imagekit.upload({
//       file: buffer,
//       fileName: image.name,
//     });
//     const optimizedImage = await imagekit.helper.buildSrc({
//       src: response.filePath,
//       transformations: [
//         {
//           quality: "auto",
//           width: "512",
//           format: "webp",
//         },
//       ],
//     });
//     const newStore = await prisma.store.create({
//       data: {
//         userId: user.id,
//         name,
//         description,
//         username: username.toLowerCase(),
//         email,
//         contact,
//         address,
//         logo: optimizedImage,
//       },
//     });
//     await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         store: { connect: { id: newStore.id } },
//       },
//     });
//     return NextResponse.json({
//       message: "Applied, waiting for approval",
//       store: newStore,
//     });
//   } catch (err) {
//     console.log(err);
//     if (err.code === "P2002") {
//       return new NextResponse.json(
//         { message: "username already taken" },
//         { status: 400 }
//       );
//     }
//     return new NextResponse.json(
//       { err: err.code || err.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request) {
//       try{
//       const { user } = useSelector((state) => state.auth);
//       const store = await prisma.store.findUnique({
//         where: {
//           userId: user.id,
//         },
//       });
//       if(store)
//       return NextResponse.json({ status: store.status, store });
//       return NextResponse.json({ status: "not registered" });
//       }catch(err){
//         console.log(err);
//         return new NextResponse.json(
//           { err: err.code || err.message || "Internal server error" },
//           { status: 500 }
//         );
//       }
// }