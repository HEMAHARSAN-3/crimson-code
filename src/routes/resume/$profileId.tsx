import { createFileRoute, notFound } from "@tanstack/react-router";
import { getResumeFile, resumeProfiles } from "@/data/resumes";
import type { ProfileId } from "@/lib/profile-preference";

function isProfileId(value: string): value is ProfileId {
  return value === "data-analyst" || value === "ai-ml-engineer";
}

export const Route = createFileRoute("/resume/$profileId")({
  beforeLoad: ({ params }) => {
    if (!isProfileId(params.profileId)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const profile = resumeProfiles.find((item) => item.id === params.profileId);
    const title = profile ? `${profile.title} — Resume | Hema Harsan R` : "Resume | Hema Harsan R";

    return {
      meta: [{ title }],
    };
  },
  component: ResumeViewerPage,
});

function ResumeViewerPage() {
  const { profileId } = Route.useParams();
  const profile = resumeProfiles.find((item) => item.id === profileId)!;
  const resume = getResumeFile(profileId);

  return (
    <main className="fixed inset-0 bg-background">
      <iframe
        src={resume.pdfPath}
        title={`${profile.title} resume`}
        className="h-full w-full border-0"
      />
    </main>
  );
}
