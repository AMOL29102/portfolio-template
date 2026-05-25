// ── Personal Data ──
export const personalInfo = {
  name: 'Amol Patil',
  role: 'Software Developer',
  location: 'Pune, India',
  tagline: 'I build interactive 3D web experiences, robust backend systems, and premium user interfaces.',
  email: 'amolpatilap2910@gmail.com',
  bio: 'I am a Software Developer based in Pune, specializing in the MERN stack. My passion lies in combining deep technical knowledge in languages like C++, Java, and Python with modern web technologies like React and Vite to create seamless, high-performance applications. I also have hands-on experience in blockchain technology and enterprise automation.',
  photo: '/images/photo.jpg', // user photo
  social: {
    github: 'https://github.com/AMOL29102',
    linkedin: 'https://www.linkedin.com/in/amol-patil-53389325a/',
    email: 'mailto:amolpatilap2910@gmail.com',
    leetcode: 'https://leetcode.com/u/amolpatilamp555/',
    codechef: 'https://www.codechef.com/users/amolpatilamp55',
  },
};

// ── Education ──
export const education = [
  {
    degree: 'Bachelor of Engineering in Information Technology',
    institution: 'Pune Institute of Computer Technology',
    period: '2022 – 2026',
    gpa: '9.65 / 10',
    icon: '🎓',
  },
  {
    degree: 'Higher Secondary Education (HSC)',
    institution: 'Rajarshi Shahu Junior Science College, Latur',
    period: '2020 – 2022',
    icon: '🏫',
  },
];

// ── Quick Facts ──
export const quickFacts = [
  {
    icon: '📄',
    label: 'Research Publication',
    value: 'Co-authored & published a paper on "Blockchain-based Authentication for Genuine Goods" in IEEE ICBDS Conference.',
  },
  {
    icon: '♟️',
    label: 'Hobbies',
    value: 'Playing Chess, Coding and Geopolitics.',
  },
];

// ── Skills Matrix ──
export const skills = [
  { name: 'React / Vite', category: 'Frontend', icon: '⚛️', level: 90 },
  { name: 'Node.js', category: 'Backend', icon: '🟢', level: 85 },
  { name: 'Express.js', category: 'Backend', icon: '⚡', level: 85 },
  { name: 'MongoDB', category: 'Database', icon: '🍃', level: 80 },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘', level: 75 },
  { name: 'Python', category: 'Language', icon: '🐍', level: 80 },
  { name: 'Java', category: 'Language', icon: '☕', level: 80 },
  { name: 'C++', category: 'Language', icon: '⚙️', level: 85 },
  { name: 'SQL', category: 'Database', icon: '🗃️', level: 75 },
  { name: 'AWS (S3, EC2)', category: 'Cloud', icon: '☁️', level: 70 },
  { name: 'RPA (Robocorp)', category: 'Automation', icon: '🤖', level: 75 },
  { name: 'Three.js / R3F', category: '3D / WebGL', icon: '🔮', level: 70 },
];

// ── Experience ──
export const experience = [
  {
    title: 'Software Developer',
    company: 'FPL Technology Pvt. Ltd.',
    location: 'Pune, India',
    period: 'Present',
    description: 'Handling the billing vertical for credit card customers, working on the core financial processing pipeline.',
    bullets: [
      'Developing the accrual process for credit card billing cycles.',
      'Building billing, due-date, and statement creation modules.',
      'Writing production-grade code for customer credit card financial workflows.',
      'Integrating UI frameworks with backend APIs and automation scripts.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'RPA', 'Billing Systems'],
  },
  {
    title: 'SDE Intern',
    company: 'Nikhil Motors',
    location: 'Pune, India',
    period: 'Aug 2024 – Oct 2024',
    description: 'As a Full Stack Developer, contributed to a web app to boost user engagement and expand the store\'s reach.',
    bullets: [
      'Built dynamic, responsive UI for vehicle browsing, filtering, and inquiries.',
      'Implemented role-based dashboards with authentication and authorization.',
      'Integrated real-time inventory updates for vehicle and maintenance status.',
      'Deployed the full application using AWS S3 and EC2.',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'EC2', 'Tailwind'],
  },
];

// ── Projects ──
export const projects = [
  {
    title: 'Vehicle Dealership – Nikhil Motors',
    subtitle: 'Full-Stack Dealership Platform',
    description: 'A dealership platform with role-based dashboards for admins, employees, and drivers. Integrated with AWS for secure image uploads and scalable operations, enhancing user engagement and search efficiency.',
    tags: ['PostgreSQL', 'Express', 'React', 'Node.js', 'Tailwind', 'AWS'],
    image: '/images/Project1.png',
    source: 'https://github.com/AMOL29102/Vehicle-Dealership',
    demo: null,
  },
  {
    title: 'Authentication System for Genuine Goods',
    subtitle: 'Blockchain-Powered Authentication',
    description: 'A blockchain-powered system for authenticating products, combating counterfeiting in global trade. Features include automated QR code generation, consumer code dispatch, and scalable tracking of products across manufacturers, sellers, and customers.',
    tags: ['Blockchain', 'Solidity', 'React', 'Node.js', 'QR Code', 'Web3'],
    image: '/images/Project2.jpg',
    source: 'https://github.com/AMOL29102',
    demo: 'https://fake-product-identification-tan.vercel.app/',
  },
  {
    title: 'RescueBites',
    subtitle: 'Food Waste Combat Platform',
    description: 'A platform to combat food waste by connecting restaurants with surplus food to individuals in need. RescueBites streamlines food access via pincode, enhances community engagement, and automates food request removal after 18 hours to optimize resource management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    image: '/images/Project3.png',
    source: 'https://github.com/AMOL29102',
    demo: 'https://rescuebite-sigma.vercel.app/',
  },
  {
    title: 'Portfolio 01',
    subtitle: 'Immersive 3D Portfolio',
    description: 'A fully interactive 3D web experience built to showcase skills. Features a custom WebGL particle field, glassmorphism UI, floating glass geometry, scroll-driven animations, and a full MERN backend with contact form integration.',
    tags: ['React', 'Three.js', 'R3F', 'Framer Motion', 'Express', 'MongoDB'],
    image: '/images/DarkPortfolio.png',
    source: 'https://github.com/AMOL29102',
    demo: 'https://patilamol.vercel.app',
  },
  {
    title: 'Portfolio 02',
    subtitle: 'Previous Portfolio Iteration',
    description: 'An earlier version of my personal portfolio, showcasing previous design perspectives and foundational React skills with a clean, focused user interface.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
    image: '/images/portfolio2.png',
    source: 'https://github.com/AMOL29102',
    demo: '#',
  },
];

// ── Stats ──
export const stats = [
  { label: 'Technologies', value: '12+' },
  { label: 'Projects Built', value: '5+' },
  { label: 'Years Coding', value: '3+' },
];

// ── Navigation ──
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
