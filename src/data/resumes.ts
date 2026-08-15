import type { ProfileId } from "@/lib/profile-preference";
import aiMlResume from "@/assets/HEMA HASRAN R-AIML.pdf";
import dataAnalystResume from "@/assets/HEMA HASRAN R-DA.pdf";

export type ResumeProfile = {
  id: ProfileId;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  accent: "crimson" | "silver";
};

export const resumeLinks = {
  dataAnalyst: {
    pdfPath: dataAnalystResume,
    downloadFilename: "HEMA_Harsan_R_Data_Analyst_Resume.pdf",
  },
  aiMl: {
    pdfPath: aiMlResume,
    downloadFilename: "HEMA_Harsan_R_AI_ML_Engineer_Resume.pdf",
  },
} as const;

const resumeFiles = {
  "data-analyst": resumeLinks.dataAnalyst,
  "ai-ml-engineer": resumeLinks.aiMl,
} as const;

export function getResumeFile(id: ProfileId) {
  return resumeFiles[id];
}

export function getResumeViewPath(id: ProfileId) {
  return `/resume/${id}`;
}

export const resumeProfiles: ResumeProfile[] = [
  {
    id: "data-analyst",
    number: "01",
    category: "DATA",
    title: "DATA ANALYST",
    description:
      "Focused on transforming raw data into meaningful insights, visualizations and business decisions.",
    tags: ["SQL", "PYTHON", "POWER BI", "DATA ANALYTICS", "DATA VISUALIZATION", "PANDAS"],
    accent: "crimson",
  },
  {
    id: "ai-ml-engineer",
    number: "02",
    category: "AI",
    title: "AI / ML ENGINEER",
    description:
      "Focused on building intelligent systems using Machine Learning, Deep Learning and Computer Vision.",
    tags: ["PYTHON", "MACHINE LEARNING", "DEEP LEARNING", "COMPUTER VISION", "PYTORCH", "TENSORFLOW"],
    accent: "silver",
  },
];
