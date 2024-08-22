
import { NextResponse } from 'next/server';
import { db } from '../../../server/db';

export async function POST(req: Request) {
  const body = await req.json();
  const createdTodo = await db.todo.create({
    data: body,
  });
  return NextResponse.json(createdTodo);
}

export async function GET(req: Request) {
  const userId = req.url.split("?userId=")[1];
  const todos = await db.todo.findMany({
    where: {
      
    }
  });
  return NextResponse.json(todos);
}
