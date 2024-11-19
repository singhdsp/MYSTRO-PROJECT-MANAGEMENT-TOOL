"use server";

import { cookies } from "next/headers";
import prisma from "../../lib/prisma";

export async function getUser() {
  try {
    const sessionCookie = cookies().get("session")?.value;
    const userData = JSON.parse(sessionCookie);
    return userData;
  } catch (error) {
    return null;
  }
}

export async function getUserFull() {
  const userF = await getUser();
  try {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(
      new Date().setHours(23, 59, 59, 999)
    ).toISOString();

    const user = await prisma.user.findUnique({
      where: {
        id: userF.id,
      },
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
            members: true,
          },
        },
        tasks: {
          include: {
            photos: true,
          },
        },
        comments: true,
        TaskHours: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserFullWithDate(date) {
  const userF = await getUser();
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userF.id,
      },
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
            members: true,
          },
        },
        tasks: {
          include: {
            photos: true,
          },
        },
        comments: true,
        TaskHours: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserCanAssignProjects(userid) {
  const userF = await getUser();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userF.id,
      },
      include: {
        projects: {
          include: {
            members: true,
            tasks: {
              include: {
                members: true,
              },
              where: {
                members: {
                  none: {
                    id: userid,
                  },
                },
                status: {
                  not: "Completed",
                },
              },
            },
            taskHours: true,
          },
        },
      },
    });

    const filteredProjects = user.projects.filter(
      (project) => project.tasks.length > 0
    );

    return { ...user, projects: filteredProjects };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserCanAssignTasks(userid, projectid) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        project: {
          id: projectid,
        },
        members: {
          none: {
            id: userid,
          },
        },
        status: {
          not: "Completed",
        },
      },
      include: {
        members: true,
      },
    });

    return tasks;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUsers() {
  const user = await getUser();
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "Worker",
        contractor: {
          is: {
            id: user.id,
          },
        },
      },
    });

    const contractor = await prisma.user.findUnique({
      where: {
        id: user.id,
        role: "Contractor",
      },
    });
    if(contractor) users.push(contractor);
    console.log(users);
    if(users.length > 0){
      return users
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUsersCreateTask(projectid) {
  const user = await getUser();
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "Worker",
        contractor: {
          is: {
            id: user.id,
          },
        },
        projects: {
          some: {
            id: projectid,
          },
        },
      },
    });

    const contractor = await prisma.user.findUnique({
      where: {
        id: user.id,
        role: "Contractor",
      },
    });
    users.push(contractor);
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUsersForProjectId(projectid) {
  const user = await getUser();
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "Worker",
        contractor: {
          is: {
            id: user.id,
          },
        },
        projects: {
          some: {
            id: projectid,
          },
        },
      },
    });

    const contractor = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    users.push(contractor);
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getWorker(id, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: {
          include: {
            photos: true,
          },
        },
        Attendace: {
          where: {
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        },
        TaskHours: true,
      },
    });
    return user;
  } catch (e) {
    console.error("Error fetching worker data:", e);
    return null;
  }
}

export async function saveNotesRate(notes, rate, id) {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        notes: notes,
        rate: rate,
      },
    });
    if (user) {
      return { status: "success", message: "Notes and rate saved" };
    }
    return { status: "success", message: "Failed To Save" };
  } catch (e) {
    console.error(e);
    return { status: "success", message: e.message };
  }
}
