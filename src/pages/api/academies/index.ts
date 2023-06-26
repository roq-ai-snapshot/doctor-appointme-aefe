import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { academyValidationSchema } from 'validationSchema/academies';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAcademies();
    case 'POST':
      return createAcademy();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAcademies() {
    const data = await prisma.academy
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'academy'));
    return res.status(200).json(data);
  }

  async function createAcademy() {
    await academyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.appointment?.length > 0) {
      const create_appointment = body.appointment;
      body.appointment = {
        create: create_appointment,
      };
    } else {
      delete body.appointment;
    }
    if (body?.user_user_academy_idToacademy?.length > 0) {
      const create_user_user_academy_idToacademy = body.user_user_academy_idToacademy;
      body.user_user_academy_idToacademy = {
        create: create_user_user_academy_idToacademy,
      };
    } else {
      delete body.user_user_academy_idToacademy;
    }
    const data = await prisma.academy.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
