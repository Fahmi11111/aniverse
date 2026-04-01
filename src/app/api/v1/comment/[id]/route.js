import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/auth-libs";

/*  GET COMMENTS */
export async function GET(req, context) {
  try {
    const params = await context.params;
    const { id } = params;

    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "newest";
    const order = sort === "oldest" ? "asc" : "desc";

    const session = await getServerSession(authOption);

    const comments = await prisma.comment.findMany({
      where: { anime_mal_id: String(id) },
      orderBy: { createdAt: order },
      include: {
        likes: true,
        replies: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const result = comments.map((c) => ({
      ...c,
      canDelete: session?.user?.email === c.user_email,
    }));

    return Response.json(result);
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

/* DELETE COMMENT */
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOption);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment || comment.user_email !== session.user.email) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE COMMENT ERROR:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
