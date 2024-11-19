"use server";

import { cookies } from "next/headers";
import { getUser } from "./user";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import prisma from "../../lib/prisma";

const keyFileContents = {
  type: "service_account",
  project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
  private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.GOOGLE_CLOUD_CLIENT_EMAIL)}`,
  universe_domain: "googleapis.com"
}

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: keyFileContents
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);


export async function createIn(formData) {
  try {
    const user = await getUser();
    const imageFile = formData.get("image");
    const currentTime = new Date().toISOString();
    const currentDate = new Date().toISOString();

    let attendaceImageURL = "";

    if (imageFile) {
      const buffer = await imageFile.arrayBuffer();
      const fileExtension = path.extname(imageFile.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const pathName = `attendance/${user.id}/${fileName}`;

      const fileUpload = bucket.file(pathName);
      await fileUpload.save(Buffer.from(buffer), {
        metadata: {
          contentType: imageFile.type,
        },
      });

      attendaceImageURL = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/attendance%2F${user.id}%2F${fileName}?alt=media`;
    }

    const attendance = await prisma.attendace.create({
      data: {
        date: currentDate,
        inTime: currentTime,
        inTimePhotoURL: attendaceImageURL,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    if (attendance) {
      return { status: "success", message: "Attendance Created" };
    }
    return { status: "error", message: "Failed to create attendance" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}

export async function createOut(formData) {
  try {
    const user = await getUser();
    const currentTime = new Date().toISOString();
    const id = formData.get("id");
    const imageFile = formData.get("image");
    let attendaceImageURL = "";

    if (imageFile) {
      const buffer = await imageFile.arrayBuffer();
      const fileExtension = path.extname(imageFile.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const pathName = `attendance/${user.id}/${fileName}`;

      const fileUpload = bucket.file(pathName);
      await fileUpload.save(Buffer.from(buffer), {
        metadata: {
          contentType: imageFile.type,
        },
      });

      attendaceImageURL = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/attendance%2F${user.id}%2F${fileName}?alt=media`;
    }

    const attendance = await prisma.attendace.update({
      where: {
        id: id,
      },
      data: {
        outTime: currentTime,
        outTimePhotoURL: attendaceImageURL,
      },
    });

    if (attendance) {
      return { status: "success", message: "Attendance Created" };
    }
    return { status: "error", message: "Failed to create attendance" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}

export async function getAdminAttendance() {
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();
  const user = await getUser();
  try {
    const attendance = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      include: {
        workers: {
          include: {
            Attendace: {
              where: {
                date: {
                  gte: startOfDay,
                  lte: endOfDay,
                },
              },
            },
            projects: {
              include: {
                tasks: true,
              },
            },
          },
        },
      },
    });
    return attendance;
  } catch (error) {
    console.log(error);
    return null;
  }
}
