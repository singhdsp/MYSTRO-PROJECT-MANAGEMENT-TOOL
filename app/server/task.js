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

export async function createTasks(formData) {
  try {
    const taskName = formData.get("taskName");
    const taskDescription = formData.get("description");
    const taskMembers = JSON.parse(formData.get("team"));
    const taskStartDate = formData.get("date");
    const projectId = formData.get("projectId");
    const imageFile = formData.get("image");
    const taskAudio = formData.get("taskAudio");
    const descAudio = formData.get("descAudio");

    let descriptionImageURL = "";

    if (imageFile) {
      const buffer = await imageFile.arrayBuffer();
      const fileExtension = path.extname(imageFile.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const pathName = `uploads/${projectId}/${fileName}`;

      const fileUpload = bucket.file(pathName);
      await fileUpload.save(Buffer.from(buffer), {
        metadata: {
          contentType: imageFile.type,
        },
      });

      descriptionImageURL = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/uploads%2F${projectId}%2F${fileName}?alt=media`;
    }

    let taskAudioURL = "";

    if (taskAudio) {
      const buffer = await taskAudio.arrayBuffer();
      const fileExtension = path.extname(taskAudio.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const pathName = `uploads/${projectId}/${fileName}`;

      const fileUpload = bucket.file(pathName);
      await fileUpload.save(Buffer.from(buffer), {
        metadata: {
          contentType: taskAudio.type,
        },
      });

      taskAudioURL = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/uploads%2F${projectId}%2F${fileName}?alt=media`;
    }

    let descAudioURL = "";

    if (descAudio) {
      const buffer = await descAudio.arrayBuffer();
      const fileExtension = path.extname(descAudio.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const pathName = `uploads/${projectId}/${fileName}`;

      const fileUpload = bucket.file(pathName);
      await fileUpload.save(Buffer.from(buffer), {
        metadata: {
          contentType: descAudio.type,
        },
      });

      descAudioURL = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/uploads%2F${projectId}%2F${fileName}?alt=media`;
    }

    const task = await prisma.task.create({
      data: {
        name: taskName,
        description: taskDescription,
        startDate: taskStartDate,
        members: {
          connect: taskMembers,
        },
        project: {
          connect: {
            id: projectId,
          },
        },
        descPhoto: descriptionImageURL,
        nameAudioURL: taskAudioURL,
        descAudio: descAudioURL,
      },
    });

    if (task) {
      return { status: "success", message: "Task Created", taskId: task.id };
    }

    return { status: "error", message: "Task Creation Failed" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}

export async function getTask(id, inputDate) {
  const isoDate = new Date(inputDate).toISOString();
  console.log(isoDate);

  try {
    const user = await getUser();

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        readUsers: {
          connect: { id: user.id },
        },
      },
    });

    if (!updatedTask) {
      return null;
    }

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            comments: true,
          },
        },
        project: true,
        photos: true,
        comments: true,
        taskHours: {
          where: {
            date: {
              lte: isoDate,
            },
          },
        },
      },
    });

    return task;
  } catch (error) {
    console.error("Error updating and fetching task:", error);
    return null;
  }
}

export async function uploadImage(formData) {
  const file = formData.get("image");
  const type = formData.get("type");
  const taskId = formData.get("taskId");
  if (!file) {
    throw new Error("No file uploaded");
  }

  const buffer = await file.arrayBuffer();
  const fileExtension = path.extname(file.name);
  const fileName = `${uuidv4()}${fileExtension}`;
  const pathName = `uploads/${taskId}/${fileName}`;

  try {
    const fileUpload = bucket.file(pathName);
    console.log("Uploading....");
    await fileUpload.save(Buffer.from(buffer), {
      metadata: {
        contentType: file.type,
      },
    });

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/uploads%2F${taskId}%2F${fileName}?alt=media`;

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        photos: {
          create: {
            type: type,
            url: publicUrl,
          },
        },
        readUsers: {
          set: [],
        },
      },
    });

    if (task) {
      return {
        status: "success",
        message: "Image uploaded successfully",
      };
    }

    return {
      status: "success",
      message: "Image uploaded successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Image uploaded successfully",
    };
  }
}

export async function changeStatus(id, status) {
  try {
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        readUsers: {
          set: [], 
        },
      },
    });

    const statusLog = await prisma.statusLog.create({
      data: {
        status: status,
        Task: {
          connect: {
            id: id,
          },
        },
      },
    });

    if (task && statusLog) {
      return {
        status: "success",
        message: "Status Updated Successfully",
      };
    }
    return {
      status: "error",
      message: "Status Update Failed",
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: "Status Update Failed",
    };
  }
}

export async function addUserToTask(taskId, userId, projectId) {
  try {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!project) {
      return {
        status: "error",
        message: "Project Not Found",
      };
    }

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
        readUsers: {
          set: [],
        },
      },
    });

    if (task) {
      return {
        status: "success",
        message: "User Added Successfully",
      };
    }
    return {
      status: "error",
      message: "User Addition Failed",
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: "User Addition Failed",
    };
  }
}

export async function updateTaskHours(taskid, hours) {
  try {
    const user = await getUser();

    const task = await prisma.task.findUnique({
      where: {
        id: taskid,
      },
      include: {
        project: true,
      },
    });

    const updatedTask = await prisma.task.update({
      where: {
        id: taskid,
      },
      data: {
        readUsers: {
          set: [],
        },
      },
    });

    if (!task || !updatedTask) {
      throw new Error("Task not found");
    }

    await prisma.taskHours.create({
      data: {
        taskId: taskid,
        userId: user.id,
        projectId: task.projectId, 
        hours: Math.ceil(hours), 
      },
    });

    return {
      status: "success",
      message: "Task hours updated successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: "Task hours update failed",
    };
  }
}

export async function editTask(taskId, updatedData) {
  try {
    const name = updatedData.get("name");
    const description = updatedData.get("description");
    const members = JSON.parse(updatedData.get("members"));
    const descPhoto = updatedData.get("descPhoto");
    const nameAudioURL = updatedData.get("nameAudioURL");
    const descAudio = updatedData.get("descAudio");

    const oldTask = await prisma.task.findUnique({
      where: { id: taskId },
      include: { members: true },
    });

    async function uploadFile(file, oldUrl, fieldName) {
      if (file instanceof Blob) {
  
        if (oldUrl) await deleteFileFromFirebase(oldUrl);
        const buffer = await file.arrayBuffer();
        const fileExtension = path.extname(file.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const pathName = `uploads/${taskId}/${fileName}`;
        const fileUpload = bucket.file(pathName);
        await fileUpload.save(Buffer.from(buffer), {
          metadata: { contentType: file.type },
        });
        return `https://firebasestorage.googleapis.com/v0/b/mystro2.appspot.com/o/uploads%2F${taskId}%2F${fileName}?alt=media`;
      } else if (typeof file === "string" && file !== oldUrl) {
        if (oldUrl) await deleteFileFromFirebase(oldUrl);
        return file;
      } else if (file === null || file === undefined) {
        if (oldUrl) await deleteFileFromFirebase(oldUrl);
        return null;
      }
      return oldUrl;
    }

    const newDescPhotoURL = await uploadFile(descPhoto, oldTask.descPhoto, "descPhoto");
    const newNameAudioURL = await uploadFile(nameAudioURL, oldTask.nameAudioURL, "nameAudioURL");
    const newDescAudioURL = await uploadFile(descAudio, oldTask.descAudio, "descAudio");

    const removedMembers = oldTask.members
      .filter((member) => !members.includes(member.id))
      .map((member) => member.id);

    const updatedTask = await prisma.$transaction(async (prisma) => {
      if (removedMembers.length > 0) {
        await prisma.comments.deleteMany({
          where: {
            taskId: taskId,
            userId: { in: removedMembers },
          },
        });
      }

      return prisma.task.update({
        where: { id: taskId },
        data: {
          name,
          description,
          descPhoto: newDescPhotoURL,
          nameAudioURL: newNameAudioURL,
          descAudio: newDescAudioURL,
          members: {
            set: members.map((memberId) => ({ id: memberId })),
          },
          readUsers: {
            set: [],
          },
        },
      });
    },{
      maxWait: 5000,
      timeout: 20000,
    });

    if (updatedTask) {
      return {
        status: "success",
        message: "Task updated successfully",
        task: updatedTask,
      };
    }

    return { status: "error", message: "Task update failed" };
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      status: "error",
      message: "Task update failed",
      error: error.message,
    };
  }
}

async function deleteFileFromFirebase(fileURL) {
  if (!fileURL) return;

  try {
    const bucketName = "mystro2.appspot.com";
    const fullPath = fileURL.split(bucketName + '/')[1].split('?')[0];
    
    const decodedPath = decodeURIComponent(fullPath).slice(2);

    console.log(`Attempting to delete file: ${decodedPath}`);

    const file = bucket.file(decodedPath);

    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
      console.log(`File ${decodedPath} deleted successfully.`);
    } else {
      console.log(`File ${decodedPath} does not exist, skipping deletion.`);
    }
  } catch (error) {
    console.error("Error deleting file from Firebase:", error);
    console.error("File URL:", fileURL);
  }
}

export async function deleteTask(taskId) {
  try {
    await prisma.statusLog.deleteMany({ where: { taskId } });
    await prisma.taskHours.deleteMany({ where: { taskId } });
    await prisma.attachment.deleteMany({ where: { taskId } });
    await prisma.comments.deleteMany({ where: { taskId } });

    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });

    if (deletedTask) {
      return {
        status: "success",
        message: "Task and related data deleted successfully",
      };
    }

    return { status: "error", message: "Task deletion failed" };
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      status: "error",
      message: "Task deletion failed",
      error: error.message,
    };
  }
}
