"use server";

import { cookies } from "next/headers";
import { getUser } from "./user";
import prisma from "../../lib/prisma";

export async function createProject(name, members, admin) {
  console.log(name, members, admin);
  const updatedMembers = members.filter((item) => item.id !== admin.id);
  updatedMembers.push(admin);

  try {
    const project = await prisma.project.create({
      data: {
        name: name,
        members: {
          connect: updatedMembers,
        },
        admin: {
          connect: admin,
        },
      },
      include: {
        members: true,
        admin: true,
      },
    });
    console.log(project);
    if (project) {
      return { status: "success", message: "Project Created", id: project.id };
    }

    return { status: "error", message: "Project Creation Failed" };
  } catch (e) {
    console.log(e);
    return { status: "error", message: e.message };
  }
}

function getTaskStatus(statusHistory, date) {
  const targetDate = new Date(date);

  const relevantStatus = statusHistory
    .filter((sh) => new Date(sh.date) <= targetDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return relevantStatus?.status || "Not_Yet_Started";
}

export async function getActiveProjectsWithTaskInfo(date) {
  try {
    const user = await getUser();
    const activeProjects = await prisma.project.findMany({
      where: {
        startDate: { lte: date },
        endDate: { gte: date },
        members: {
          some: {
            id: {
              equals: user.id,
            },
          },
        },
      },
      include: {
        tasks: {
          include: {
            statusHistory: true,
            taskHours: {
              where: {
                date: { lte: date },
              },
            },
          },
        },
      },
    });

    return activeProjects.map((project) => {
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(
        (task) => getTaskStatus(task.statusHistory, date) === "Completed"
      ).length;
      const totalHours = project.tasks.reduce(
        (sum, task) =>
          sum +
          task.taskHours.reduce((taskSum, hour) => taskSum + hour.hours, 0),
        0
      );

      return {
        id: project.id,
        name: project.name,
        taskCompletion: `${completedTasks}/${totalTasks}`,
        totalHours,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProjectTasksWithStatus(projectId, date) {
  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
      startDate: { lte: date },
      endDate: { gte: date },
    },
    include: {
      statusHistory: true,
      readUsers: true,
      photos: true,
      comments: true,
      taskHours: {
        where: {
          date: { lte: date },
        },
      },
    },
  });

  return tasks.map((task) => ({
    ...task,
    id: task.id,
    name: task.name,
    description: task.description,
    status: getTaskStatus(task.statusHistory, date),
    totalHours: task.taskHours.reduce((sum, hour) => sum + hour.hours, 0),
  }));
}

export async function getTasksWithStatus(date) {
  try {
    const user = await getUser();
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            id: {
              equals: user.id,
            },
          },
        },
      },
    });

    const proj = await Promise.all(
      projects.map(async (project) => ({
        ...project, 
        tasks: await getProjectTasksWithStatus(project.id, date), 
      }))
    );
    return {
      projects: proj,
      userid: user.id,
    };
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getProjects() {
  const user = await getUser();
  try {
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            id: {
              equals: user.id,
            },
          },
        },
      },
      include: {
        members: true,
        admin: true,
        tasks: {
          include: {
            comments: {
              where: {
                userId: user.id,
              },
            },
            photos: true,
            readUsers: true,
          },
        },
      },
    });
    return {
      userid: user.id,
      projects: projects,
    };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProject(id) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: {
          include: {
            members: true,
          },
        },
        members: true,
        admin: true,
      },
    });
    return project;
  } catch (error) {
    console.log(error);
    return [];
  }
}


export async function deleteProject(projectId) {
  try {
    const user = await getUser();
    
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { admin: true }
    });

    if (!project || project.admin.id !== user.id) {
      return { status: "error", message: "Unauthorized to delete this project" };
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.attachment.deleteMany({
        where: { task: { projectId: projectId } }
      });

      await prisma.comments.deleteMany({
        where: { task: { projectId: projectId } }
      });

      await prisma.taskHours.deleteMany({
        where: { projectId: projectId }
      });

      await prisma.statusLog.deleteMany({
        where: { Task: { projectId: projectId } }
      });

      await prisma.task.deleteMany({
        where: { projectId: projectId }
      });

      await prisma.project.delete({
        where: { id: projectId }
      });
    });

    return { status: "success", message: "Project deleted successfully" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: error.message };
  }
}

export async function editProject(projectId, updatedData) {
  try {
    const user = await getUser();
    
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { admin: true, members: true }
    });

    if (!project || project.admin.id !== user.id) {
      return { status: "error", message: "Unauthorized to edit this project" };
    }

    const { name, members, startDate, endDate } = updatedData;
    
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: name,
        startDate: startDate ? new Date(startDate) : undefined,
        members: {
          set: [],
          connect: members.map(memberId => ({ id: memberId }))
        }
      },
      include: {
        members: true,
        admin: true
      }
    });

    return { status: "success", message: "Project updated successfully", project: updatedProject };
  } catch (error) {
    console.error(error);
    return { status: "error", message: error.message };
  }
}