import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function IssueDetail({ params }) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
    include: { reporter: true, community: true },
  });

  if (!issue) return <p>Issue not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <img
        src={issue.imageUrl}
        alt="Issue"
        className="rounded-lg mb-4 w-full h-64 object-cover"
      />
      <h1 className="text-2xl font-bold mb-2">{issue.title}</h1>
      <p className="text-gray-700 mb-4">{issue.description}</p>
      <p className="text-sm text-gray-500 mb-1">
        Reported by: {issue.reporter?.name}
      </p>
      <p className="text-sm text-gray-500">
        Location: {issue.community?.name}
      </p>
    </div>
  );
}
