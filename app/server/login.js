"use server";
import { cookies } from "next/headers";
import prisma from "../../lib/prisma";

export async function contractorLogin(username) {

  try {
    const user = await prisma.user.findFirst({
      where: {
        fullName: username,
      },
    });

    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }

    const expiresIn = 60 * 60 * 24 * 5;
    const sessionData = {
      fullName: user.fullName,
      id: user.id,
      role: user.role,
      photoURL: user.photoURL,
      loginTime: new Date().toISOString(),
    };

    const sessionCookie = JSON.stringify(sessionData);

    cookies().set({
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return {
      status: "success",
      message: "Login successful",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}

export async function workerLogin(contractor, username) {
  try {
    const contractorName = await prisma.user.findFirst({
      where: {
        fullName: contractor,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        fullName: username,
        contractor: {
          is: {
            fullName: contractorName.fullName,
          },
        },
      },
    });

    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }

    const expiresIn = 60 * 60 * 24 * 5;
    const sessionData = {
      fullName: user.fullName,
      role: user.role,
      id: user.id,
      contract: contractorName.fullName,
      photoURL: user.photoURL,
      loginTime: new Date().toISOString(),
    };

    const sessionCookie = JSON.stringify(sessionData);

    cookies().set({
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return {
      status: "success",
      message: "Login successful",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}

export async function logout() {
  try {    
    const sessionCookie = cookies().get("session")?.value;

    cookies().set({
      name: "session",
      value: "",
      maxAge: -1, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return {
      status: "success",
      message: "Logout successful",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}
