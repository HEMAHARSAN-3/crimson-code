export const profile = {
  name: "HEMA HARSAN R",
  role: "AI / ML Engineer",
  email: "hemaharsan3@gmail.com",
  github: "https://github.com/HEMAHARSAN-3",
  githubLabel: "github.com/HEMAHARSAN-3",
  linkedin: "https://www.linkedin.com/in/hema-harsan-r/",
  linkedinLabel: "linkedin.com/in/hema-harsan-r",
  phone: "9787832240",
  location: "Coimbatore, Tamil Nadu",
};

export const contactLinks: Array<{
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}> = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: profile.githubLabel, href: profile.github, external: true },
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { label: "Mobile", value: profile.phone, href: `tel:+91${profile.phone}` },
  { label: "Location", value: profile.location },
];

export type ProjectCategory = "AI / ML" | "DATA ANALYTICS";

export type ProjectMotif =
  | "video"
  | "xray"
  | "data"
  | "stroke"
  | "sales"
  | "segmentation"
  | "kpi";

export type Project = {
  id: string;
  number: string;
  categories: ProjectCategory[];
  featured: boolean;
  title: string;
  short: string;
  tech: string[];
  githubUrl: string | null;
  overview: string;
  problem: string;
  approach: string[];
  workflow: string[];
  implementation: string[];
  evaluation: string[];
  outcome: string;
  motif: ProjectMotif;
};

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "data-analytics", label: "Data Analytics" },
] as const;

export type ProjectFilterId = (typeof projectFilters)[number]["id"];

export const projects: Project[] = [
  {
    id: "human-action-recognition",
    number: "01",
    categories: ["AI / ML"],
    featured: true,
    title: "Human Action Recognition in Videos Using Deep Learning",
    short:
      "Deep learning models trained and evaluated on the UCF101 dataset spanning 101 action categories, with a complete video preprocessing and inference workflow.",
    tech: ["Python", "PyTorch", "OpenCV", "UCF101"],
    githubUrl: "https://github.com/HEMAHARSAN-3/action-recognition-ucf101",
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
    workflow: ["Video", "Frames", "Features", "Classification"],
    implementation: [
      "Frame extraction and preprocessing pipeline built with OpenCV",
      "Model training and evaluation implemented in PyTorch",
      "End-to-end inference workflow from video input to predicted action",
    ],
    evaluation: ["Models trained and evaluated on the UCF101 action categories"],
    outcome:
      "A working video classification workflow covering preprocessing, training, evaluation and inference across 101 action categories.",
  },
  {
    id: "pneumonia-detection",
    number: "02",
    categories: ["AI / ML"],
    featured: false,
    title: "Pneumonia Detection from Chest X-Ray Images",
    short:
      "Machine learning-based pneumonia detection system using chest X-ray images, with image preprocessing, feature extraction, model training and evaluation using accuracy, precision, recall and F1-score.",
    tech: ["Python", "Scikit-Learn", "OpenCV", "Random Forest"],
    githubUrl: "https://github.com/HEMAHARSAN-3/PNEUMONIA-PREDICTION-USING-RANDOM-FOREST",
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
    workflow: ["X-Ray", "Features", "Classifier"],
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
    id: "stroke-recovery-prediction",
    number: "03",
    categories: ["AI / ML"],
    featured: false,
    title: "Stroke Recovery Prediction Based on Brain CT Imaging",
    short:
      "Machine learning-based system designed to analyze brain CT imaging data and predict stroke recovery outcomes using medical imaging and predictive modeling techniques.",
    tech: ["Python", "Machine Learning", "Computer Vision", "Medical Imaging"],
    githubUrl: null,
    motif: "stroke",
    overview:
      "A predictive system designed to analyze brain CT imaging data and support stroke recovery outcome prediction using medical imaging and machine learning.",
    problem:
      "Stroke recovery assessment from imaging requires structured preprocessing, feature extraction and predictive modeling before clinical insights can be generated.",
    approach: [
      "Brain CT imaging data ingestion",
      "Medical image preprocessing and analysis",
      "Feature extraction from imaging data",
      "Predictive modeling for recovery outcome estimation",
    ],
    workflow: ["Brain CT", "Image Analysis", "Features", "Model", "Recovery"],
    implementation: [
      "Imaging preprocessing and analysis pipeline",
      "Feature extraction from brain CT data",
      "Machine learning model training for recovery prediction",
    ],
    evaluation: [],
    outcome:
      "A structured workflow connecting brain CT imaging analysis, feature engineering and predictive modeling for stroke recovery assessment.",
  },
  {
    id: "healthcare-disease-prediction",
    number: "04",
    categories: ["AI / ML", "DATA ANALYTICS"],
    featured: false,
    title: "Healthcare Disease Prediction System",
    short:
      "Interactive healthcare prediction application combining machine learning with a Django web interface for healthcare data processing, feature engineering and predictive analysis.",
    tech: ["Python", "Django", "Machine Learning", "MySQL"],
    githubUrl: "https://github.com/HEMAHARSAN-3/healthcare-disease-prediction",
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
    workflow: ["Data", "Model", "Prediction"],
    implementation: [
      "Django application backed by MySQL for data storage",
      "Machine learning prediction integrated into request handling",
      "Interface for entering inputs and visualizing prediction results",
    ],
    evaluation: ["Model evaluation on the processed healthcare dataset"],
    outcome:
      "An interactive prediction system that connects data processing, modelling and a usable web interface end to end.",
  },
  {
    id: "sales-analytics-forecasting",
    number: "05",
    categories: ["DATA ANALYTICS"],
    featured: true,
    title: "Sales Analytics & Forecasting Dashboard",
    short:
      "Interactive sales analytics dashboard designed to analyze business performance, identify trends and support data-driven revenue decisions through forecasting and visualization.",
    tech: ["Python", "SQL", "Pandas", "Power BI"],
    githubUrl: "https://github.com/HEMAHARSAN-3/Sales-Analytics-Project",
    motif: "sales",
    overview:
      "An interactive sales analytics dashboard for analyzing business performance, identifying trends and supporting data-driven revenue decisions.",
    problem:
      "Sales data spread across sources needs to be cleaned, aggregated and visualized before teams can spot trends or make forecasting decisions.",
    approach: [
      "Sales data collection and preprocessing",
      "SQL-based data querying and aggregation",
      "Trend analysis and forecasting with Python and Pandas",
      "Interactive dashboard visualization in Power BI",
    ],
    workflow: ["Revenue", "Orders", "Growth", "Trends", "Forecast"],
    implementation: [
      "Data preprocessing and transformation with Pandas",
      "SQL queries for sales performance analysis",
      "Forecasting and trend visualization in Power BI",
    ],
    evaluation: [],
    outcome:
      "An interactive analytics dashboard connecting data processing, trend analysis and forecasting for revenue-focused decision making.",
  },
  {
    id: "customer-segmentation-marketing",
    number: "06",
    categories: ["DATA ANALYTICS"],
    featured: false,
    title: "Customer Segmentation & Marketing Analytics",
    short:
      "Customer segmentation analysis using clustering techniques to identify meaningful customer groups and support targeted marketing strategies and data-driven decision making.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Power BI"],
    githubUrl: "https://github.com/HEMAHARSAN-3/Customer-Segmentation-Marketing-Analytics",
    motif: "segmentation",
    overview:
      "A customer segmentation analysis project using clustering techniques to identify meaningful customer groups for marketing strategy.",
    problem:
      "Broad customer datasets hide distinct behavioural groups; clustering helps surface segments that marketing teams can act on.",
    approach: [
      "Customer data collection and preprocessing",
      "Feature engineering for segmentation variables",
      "Clustering analysis with Scikit-Learn",
      "Segment visualization and insight reporting in Power BI",
    ],
    workflow: ["Customers", "Data", "Clusters", "Segments", "Insights"],
    implementation: [
      "Data cleaning and transformation with Pandas",
      "Clustering model development with Scikit-Learn",
      "Segment profiles and insights visualized in Power BI",
    ],
    evaluation: [],
    outcome:
      "A segmentation workflow from raw customer data through clustering to actionable marketing insights.",
  },
  {
    id: "business-performance-kpi",
    number: "07",
    categories: ["DATA ANALYTICS"],
    featured: false,
    title: "Business Performance & KPI Analytics",
    short:
      "Interactive business analytics dashboard for monitoring key performance indicators, analyzing trends and supporting data-driven business decisions.",
    tech: ["SQL", "Python", "Tableau", "Power BI"],
    githubUrl: "https://github.com/HEMAHARSAN-3/Business-Analytics-Project",
    motif: "kpi",
    overview:
      "An interactive business analytics dashboard for monitoring KPIs, analyzing trends and supporting data-driven business decisions.",
    problem:
      "Business performance data needs to be consolidated and visualized before stakeholders can monitor KPIs and respond to trends.",
    approach: [
      "Business data collection and preprocessing",
      "SQL-based KPI calculation and aggregation",
      "Trend analysis with Python",
      "Interactive KPI dashboards in Tableau and Power BI",
    ],
    workflow: ["KPI", "Revenue", "Growth", "Performance", "Trends"],
    implementation: [
      "SQL queries for KPI tracking and aggregation",
      "Data transformation and analysis with Python",
      "Interactive dashboard development in Tableau and Power BI",
    ],
    evaluation: [],
    outcome:
      "A KPI analytics workflow connecting data processing, trend analysis and interactive business reporting.",
  },
];

export type SkillGroup = {
  number: string;
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { number: "01", category: "Programming", items: ["Python", "SQL", "Java", "C"] },
  {
    number: "02",
    category: "Data Analytics",
    items: ["Data Analysis", "Pandas", "NumPy", "ETL", "Data Visualization", "Power BI", "MySQL"],
  },
  {
    number: "03",
    category: "AI / Machine Learning",
    items: ["Machine Learning", "Deep Learning", "Computer Vision", "Predictive Modeling"],
  },
  {
    number: "04",
    category: "Frameworks & Libraries",
    items: ["PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "OpenCV"],
  },
  {
    number: "05",
    category: "Computer Science",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS"],
  },
  {
    number: "06",
    category: "Tools",
    items: ["Git", "GitHub", "Jupyter Notebook", "VS Code"],
  },
];

export const skillCategoryHighlights: Record<string, string[]> = {
  "Data Analytics": ["Python", "SQL", "Pandas", "Power BI", "Data Visualization"],
  "AI / Machine Learning": [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "PyTorch",
    "TensorFlow",
    "Scikit-Learn",
  ],
};

export const skillProjectFilters: Partial<Record<string, ProjectFilterId>> = {
  "Data Analysis": "data-analytics",
  "Pandas": "data-analytics",
  NumPy: "data-analytics",
  "Data Visualization": "data-analytics",
  "Power BI": "data-analytics",
  "Predictive Analytics": "data-analytics",
  SQL: "data-analytics",
  Python: "all",
  "Machine Learning": "ai-ml",
  "Deep Learning": "ai-ml",
  "Computer Vision": "ai-ml",
  "Predictive Modeling": "ai-ml",
  PyTorch: "ai-ml",
  TensorFlow: "ai-ml",
  Keras: "ai-ml",
  "Scikit-Learn": "ai-ml",
  OpenCV: "ai-ml",
  Django: "ai-ml",
};

export const experience = [
  {
    period: "Jul 2024 — Aug 2024",
    role: "Python Django Developer Intern",
    company: "Pinesphere Solutions, Coimbatore",
    points: [
      "Developed backend web applications using Django and PostgreSQL.",
      "Designed and optimized database queries for application workflows.",
      "Implemented and tested application features.",
      "Collaborated with the development team during feature development.",
      "Debugged application issues and contributed to system reliability.",
    ],
    transferableSkills: [
      "Backend Development",
      "Databases",
      "SQL",
      "Problem Solving",
      "Team Collaboration",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech — Artificial Intelligence and Data Science",
    school: "Dr. N.G.P. Institute of Technology, Coimbatore, Tamil Nadu",
    result: "CGPA 7.7 / 10",
    focus: "AI · Data Science · Machine Learning · Data Analytics",
  },
  {
    degree: "Diploma — Electrical and Electronics Engineering",
    school: "Nachimuthu Polytechnic College, Coimbatore, Tamil Nadu",
    result: "85.7%",
    focus: "Engineering Fundamentals · Problem Solving",
  },
];

export const achievements = [
  {
    title: "1st Place — Programming Quiz & Debugging",
    detail: "Lumino 2K24 Symposium, BIT",
    focus: "Competitive Programming · Debugging · Problem Solving",
    highlight: true,
  },
  {
    title: "Participant — National Level 36-Hour HAC-Kathon 2025",
    detail: "SREC",
    focus: "36-Hour Hackathon · Team Collaboration · Applied Problem Solving",
    highlight: false,
  },
  {
    title: "IBM Data Fundamentals Certification",
    detail: "IBM",
    focus: "Data Fundamentals · Data Concepts · Analytics",
    highlight: false,
  },
  {
    title: "IBM Artificial Intelligence Fundamentals Certification",
    detail: "IBM",
    focus: "Artificial Intelligence · AI Concepts · Machine Learning Fundamentals",
    highlight: false,
  },
];

export const snapshot = [
  {
    number: "01",
    title: "DATA ANALYTICS",
    text: "Python, SQL, Pandas, Power BI and data visualization for transforming raw data into meaningful insights.",
  },
  {
    number: "02",
    title: "AI / MACHINE LEARNING",
    text: "Machine learning, deep learning and predictive modeling applied to practical real-world problems.",
  },
  {
    number: "03",
    title: "COMPUTER VISION",
    text: "Image and video-based AI applications using computer vision, OpenCV and deep learning techniques.",
  },
  {
    number: "04",
    title: "PROBLEM SOLVING",
    text: "Strong programming, analytical thinking, debugging and hands-on project experience across data and AI.",
  },
];

export const processSteps = [
  { label: "Problem", note: "Define the question worth answering." },
  { label: "Data", note: "Collect, understand and validate what is available." },
  { label: "Prepare", note: "Clean, transform and engineer meaningful features." },
  { label: "Analyze", note: "Explore patterns, test assumptions and uncover insights." },
  { label: "Build", note: "Develop the right analytical or machine learning solution." },
  { label: "Evaluate", note: "Measure results, iterate and turn the solution into something useful." },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
