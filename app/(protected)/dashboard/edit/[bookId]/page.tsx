import EditBook from "../../EditBook";

export default async function Edit({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const param = await params;
  return <EditBook params={param} />;
}
