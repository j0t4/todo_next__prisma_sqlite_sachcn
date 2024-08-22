
import { NextResponse } from 'next/server';
import { db } from '../../../../server/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const todo = await db.todo.findUnique({
    where: { id: params.id },
  });
  if (!todo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }
  return NextResponse.json(todo);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updatedTodo = await db.todo.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updatedTodo);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await db.todo.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Todo deleted' });
}
