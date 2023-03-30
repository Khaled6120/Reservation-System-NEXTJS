import { NextApiRequest, NextApiResponse } from "next";
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  const token = bearerToken.split(" ")[1]

  const payload = Jwt.decode(token) as { email: string; password: string };

  if (!payload.email) {
    return res.status(401).json({
      errorMessage: "Unauthorized access",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  return res.json({ user });
}
