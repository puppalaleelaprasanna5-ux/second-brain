export async function POST(req: Request) {
  const { content } = await req.json();

  let summary = "";

  if (content.length > 120) {
    summary = content.slice(0, 120) + "...";
  } else {
    summary = content;
  }

  return Response.json({ summary });
}
