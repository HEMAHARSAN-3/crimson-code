export const profile = {
  name: "HEMA HARSAN R",
  role: "AI / ML Engineer",
  email: "hemaharsan3@gmail.com",
  github: "https://github.com/HEMAHARSAN-3",
  githubLabel: "github.com/HEMAHARSAN-3",
  linkedin: "https://www.linkedin.com/in/hema-harsan-r/",
  linkedinLabel: "linkedin.com/in/hema-harsan-r",
};

export type Project = {
  id: string;
  number: string;
  title: string;
  short: string;
  tech: string[];
  overview: string;
  problem: string;
  approach: string[];
  implementation: string[];
  evaluation: string[];
  outcome: string;
  motif: "video" | "xray" | "data";
};

export const projects: Project[] = [
  {
    id: "human-action-recognition",
    number: "01",
    title: "Human Action Recognition in Videos Using Deep Learning",
    short:
      "Deep learning models trained and evaluated on the UCF101 dataset spanning 101 action categories, with a full video preprocessing and inference workflow.",
    tech: ["Python", "PyTorch", "OpenCV", "UCF101"],
    motif: "video",
    overview:
      "A computer vision system for recognising human actions in video, built around the UCF101 dataset of 101 action categories.",
    problem:
      "Video carries information across both space and time, so classification requires turning raw clips into structured, model-ready sequences before any learning can happen.",
    approach: [
      "Work with the UCF101 dataset covering 101 action categories",
      "Video preprocessing and frame extraction",
      "Deep learning model training for video classification",
      "Inference workflow for classifying unseen clips",
    ],
    implementation: [
      "Frame extraction and preprocessing pipeline built with OpenCV",
      "Model training and evaluation implemented in PyTorch",
      "End-to-end inference workflow from video input to predicted action",
    ],
    evaluation: [
      "Models trained and evaluated on the UCF101 action categories",
    ],
    outcome:
      "A working video classification workflow covering preprocessing, training, evaluation and inference across 101 action categories.",
  },
  {
    id: "pneumonia-detection",
    number: "02",
    title: "Pneumonia Detection from Chest X-Ray Images",
    short:
      "A classical machine learning pipeline that preprocesses chest X-ray images, extracts features and trains a Random Forest classifier.",
    tech: ["Python", "Scikit-Learn", "OpenCV", "Random Forest"],
    motif: "xray",
    overview:
      "An image classification pipeline that analyses chest X-ray images to support pneumonia detection using classical machine learning.",
    problem:
      "Medical images are high dimensional and noisy; useful signal has to be isolated through preprocessing and feature extraction before a classical model can learn from it.",
    approach: [
      "Chest X-ray image ingestion",
      "Image preprocessing",
      "Feature extraction",
      "Random Forest model training",
    ],
    implementation: [
      "Image preprocessing implemented with OpenCV",
      "Feature extraction feeding a Scikit-Learn Random Forest classifier",
      "Model evaluation on held-out image data",
    ],
    evaluation: ["Accuracy", "Precision", "Recall", "F1 Score"],
    outcome:
      "A reproducible classification pipeline from raw X-ray images through preprocessing and feature extraction to a trained, evaluated model.",
  },
  {
    id: "healthcare-disease-prediction",
    number: "03",
    title: "Healthcare Disease Prediction System",
    short:
      "A Django web application that processes healthcare data, applies feature engineering and serves machine learning predictions through an interactive interface.",
    tech: ["Python", "Django", "Machine Learning", "MySQL"],
    motif: "data",
    overview:
      "A full-stack machine learning application that turns healthcare dataset processing and predictive analysis into an interactive web experience.",
    problem:
      "A predictive model is only useful when non-technical users can supply inputs and read results, which means the model needs an application around it.",
    approach: [
      "Healthcare dataset processing",
      "Feature engineering",
      "Predictive analysis with machine learning",
      "Interactive web interface with prediction result visualization",
    ],
    implementation: [
      "Django application backed by MySQL for data storage",
      "Machine learning prediction integrated into request handling",
      "Interface for entering inputs and visualizing prediction results",
    ],
    evaluation: ["Model evaluation on the processed healthcare dataset"],
    outcome:
      "An interactive prediction system that connects data processing, modelling and a usable web interface end to end.",
  },
];

export const skills = [
  { category: "Programming", items: ["Python", "Java", "C", "SQL"] },
  {
    category: "AI / Machine Learning",
    items: ["Machine Learning", "Deep Learning", "Computer Vision"],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-Learn",
      "OpenCV",
      "NumPy",
      "Pandas",
    ],
  },
  {
    category: "Computer Science",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
    ],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Power BI"],
  },
];

export const experience = [
  {
    period: "Jul 2024 — Aug 2024",
    role: "Python Django Developer Intern",
    company: "Pinesphere Solutions, Coimbatore",
    points: [
      "Developed backend web applications using Django and PostgreSQL",
      "Designed and optimized database queries",
      "Implemented and tested application features",
      "Collaborated with the development team",
      "Debugged issues and enhanced system reliability",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech — Artificial Intelligence and Data Science",
    school: "Dr. N.G.P. Institute of Technology, Coimbatore",
    result: "CGPA 7.7 / 10",
  },
  {
    degree: "Diploma — Electrical and Electronics Engineering",
    school: "Nachimuthu Polytechnic College",
    result: "85.7%",
  },
];

export const achievements = [
  {
    title: "1st Place — Programming Quiz & Debugging",
    detail: "Lumino 2K24 Symposium, BIT",
    highlight: true,
  },
  {
    title: "Participant — National Level 36-Hour HAC-Kathon 2025",
    detail: "SREC",
    highlight: false,
  },
  {
    title: "IBM Data Fundamentals Certification",
    detail: "IBM",
    highlight: false,
  },
  {
    title: "IBM Artificial Intelligence Fundamentals Certification",
    detail: "IBM",
    highlight: false,
  },
];

export const snapshot = [
  {
    number: "01",
    title: "AI / ML",
    text: "Machine Learning, Deep Learning and predictive systems.",
  },
  {
    number: "02",
    title: "Computer Vision",
    text: "Image and video-based AI applications.",
  },
  {
    number: "03",
    title: "Software Development",
    text: "Python, Django, PostgreSQL and application development.",
  },
  {
    number: "04",
    title: "Problem Solving",
    text: "Programming, debugging and applied project experience.",
  },
];

export const processSteps = [
  { label: "Problem", note: "Frame the question worth answering." },
  { label: "Data", note: "Collect and understand what is available." },
  { label: "Preprocessing", note: "Clean, transform, engineer features." },
  { label: "Model", note: "Train and iterate." },
  { label: "Evaluation", note: "Measure with the right metrics." },
  { label: "Application", note: "Ship it into something usable." },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
