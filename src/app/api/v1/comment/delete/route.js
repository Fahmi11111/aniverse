import prisma from "@/libs/prisma";
export async function DELETE(req) {
  const { comment_id, user_email } = await req.json();
  const comment = await prisma.comment.findFirst({
    where: { id: comment_id, user_email },
  });
  if (!comment) {
    return Response.json({ error: true });
  }
  await prisma.comment.delete({ where: { id: comment_id } });
  return Response.json({ deleted: true });
}
