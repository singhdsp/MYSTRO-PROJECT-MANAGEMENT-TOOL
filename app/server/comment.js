"use server";

import { cookies } from "next/headers";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import prisma from "../../lib/prisma";
import { getUser } from "./user";

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

export async function createComment(taskId, userId, content) {
  try {
    const user = await getUser();
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        readUsers: {
          set: [],
        },
      },
    });

    if (!updatedTask) {
      return { status: "error", message: "Task not found" };
    }

    const comment = await prisma.comments.create({
      data: {
        content: content,
        task: {
          connect: {
            id: taskId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        sender: user.fullName,
      },
    });
    if (comment) {
      return { status: "success", message: "Comment Created" };
    }
    return { status: "error", message: "Failed to create comment" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}


export async function createCommentSmall(taskId, content) {
  try {
    const user = await getUser();
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        readUsers: {
          set: [],
        },
      },
    });

    if (!updatedTask) {
      return { status: "error", message: "Task not found" };
    }

    const comment = await prisma.comments.create({
      data: {
        content: content,
        task: {
          connect: {
            id: taskId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        sender: user.fullName,
      },
    });
    if (comment) {
      return { status: "success", message: "Comment Created" };
    }
    return { status: "error", message: "Failed to create comment" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}

export async function createAudioComment(formData) 
{
  console.log("request recieved")
  try {
    const user = await getUser();
    const commentAudio = formData.get("audio");
    const taskId = formData.get("taskId");
    const userId = formData.get("userId");

    let commentAudioURL = "";

    if (commentAudio) {
      const buffer = await commentAudio.arrayBuffer();
      const fileExtension = path.extname(commentAudio.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const pathName = `uploads/comments/${taskId}/${fileName}`;

      const fileUpload = bucket.file(pathName);
      await fileUpload.save(Buffer.from(buffer), {
        metadata: {
          contentType: commentAudio.type,
        },
      });

      commentAudioURL = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/uploads%2Fcomments%2F${taskId}%2F${fileName}?alt=media`;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        readUsers: {
          set: [],
        },
      },
    });

    if (!updatedTask) {
      return { status: "error", message: "Task not found" };
    }

    const comment = await prisma.comments.create({
      data: {
       audioURL: commentAudioURL,
        task: {
          connect: {
            id: taskId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        sender: user.fullName,
      },
    });
    if (comment) {
      return { status: "success", message: "Comment Created" };
    }
    return { status: "error", message: "Failed to create comment" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}

export async function createAudioCommentSmall(formData) 
{
  console.log("request recieved")
  try {
    const user = await getUser();
    const commentAudio = formData.get("audio");
    const taskId = formData.get("taskId");

    let commentAudioURL = "";

    if (commentAudio) {
      const buffer = await commentAudio.arrayBuffer();
      const fileExtension = path.extname(commentAudio.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const pathName = `uploads/comments/${taskId}/${fileName}`;

      const fileUpload = bucket.file(pathName);
      await fileUpload.save(Buffer.from(buffer), {
        metadata: {
          contentType: commentAudio.type,
        },
      });

      commentAudioURL = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/uploads%2Fcomments%2F${taskId}%2F${fileName}?alt=media`;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        readUsers: {
          set: [],
        },
      },
    });

    if (!updatedTask) {
      return { status: "error", message: "Task not found" };
    }

    const comment = await prisma.comments.create({
      data: {
       audioURL: commentAudioURL,
        task: {
          connect: {
            id: taskId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        sender: user.fullName,
      },
    });
    if (comment) {
      return { status: "success", message: "Comment Created" };
    }
    return { status: "error", message: "Failed to create comment" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}

export async function deleteComment(id) {
  try {
    const comment = await prisma.comments.delete({
      where: {
        id: id,
      },
    });
    if (comment) {
      return { status: "success", message: "Comment Deleted" };
    }
    return { status: "error", message: "Failed to delete comment" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}
