import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { id, summary, tags } = await req.json();

  const updates: any = {};
  if (summary !== undefined) updates.summary = summary;
  if (tags !== undefined) updates.tags = tags;

  const { error } = await supabase
    .from("notes")
    .update(updates)
    .eq("id", id);

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true });
}
