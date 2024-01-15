import { Globe, Github, Phone, Calendar, Linkedin, Mail } from "lucide-astro";

export const RESUME_DATA = {
  name: "Erik Taheri",
  initials: "ET",
  location: "Buffalo, NY",
  summary: "Experienced Software Engineer & Technology Leader",
  about:
    "I am an experienced technology leader with a proven track record in guiding sizeable, cross-functional teams in the design, development, and launch of leading-edge technology solutions. I have expertise in overseeing technology improvement initiatives and aligning technology services with business goals. I am an excellent communicator focused on building strong team relationships.",
  avatar: "todo",
  personalWebsiteUrl: "/",
  email: "eriktaheri@gmail.com",
  phone: "716-359-6715",
  links: [
    {
      name: "Personal Website",
      url: "/",
      icon: Globe,
    },
    {
      name: "Phone",
      url: "tel:7163596715",
      icon: Phone,
    },
    {
      name: "Email",
      url: "mailto:erik.taheri@gmail.com",
      icon: Mail,
    },
    {
      name: "Calendar",
      url: "https://cal.com/erik-taheri-jdtvzm",
      icon: Calendar,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/erik-taheri-9659a934/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      url: "https://github.com/etaheri",
      icon: Github,
    },
  ],
  work: [
    {
      company: "Torch",
      link: "https://torch.io/",
      title: "Engineering Lead",
      start: "2019",
      end: "Present",
      description: "Lead the development of the Torch platform, including key microservices for scheduling, assessments, integrations, and video conferencing, contributing to the facilitation of 1.7 million minutes of coaching across 37,000 sessions yearly. Spearheaded the creation of a comprehensive design system and implementation of a mono repo structure, significantly enhancing engineering quality and accelerating development processes.",
      technologies: "React, TypeScript, Python, PostgreSQL, AWS, Docker"
    },
    {
      company: "Delaware North",
      link: "https://www.delawarenorth.com/",
      title: "System Reliability Engineer",
      start: "2017",
      end: "2019",
      description: "Specialized in ensuring the robustness and efficiency of Delware North's data systems and pipelines, including the development of a comprehensive data warehouse and ETL pipelines. Led the development of a data visualization platform, enabling the production of interactive dashboards and reports.",
      technologies: "React, Python, AWS, ETL, MongoDB"
    },
    {
      company: "Stink Studios",
      link: "https://www.stinkstudios.com/",
      title: "Senior Developer",
      start: "2014",
      end: "2017",
      description: "Specialized in front-end and back-end development, building performant, pixel-perfect websites across various technologies. Developed brand-focused and advertising websites, along with web and native applications. Analyzed and resolved technical and performance issues, enhancing website scalability and usability.",
      technologies: "Technologies: React, Python, AWS, Google Cloud, WebGL, Unity",
    },
  ],
  education: [
    {
      school: "Georgia Institute of Technology",
      degree: "M.S. Computer Science",
      graduationDate: "2023",
    },
    {
      school: "Canisius University",
      degree: "B.S. Computer Science & B.S. Digital Media Arts",
      graduationDate: "2014",
    },
  ],
  certifications: [
    {
      name: "Amazon Web Services Developer - Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2018",
    },
    {
      name: "Artificial Intelligence Nanodegree",
      issuer: "Udacity",
      date: "2017",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node",
    "Python",
    "Docker",
    "AWS",
    "Google Cloud",
  ],
  projects: [
    {
      name: "Enterprise Data Explorer",
      description: "",
      tags: ["Delware North", "React", "AWS"],
    },
    {
      name: "October",
      description: "",
      tags: ["Stink Studios", "React", "AWS"],
    },
    {
      name: "Brickell City Centre",
      link: "https://www.brickellcitycentre.com/",
      description: "",
      tags: ["Stink Studios", "Craft CMS", "Javascript"],
    },
    {
      name: "Google Presents: The Hidden World of the National Parks",
      link: "https://artsandculture.google.com/project/national-park-service",
      description: "",
      tags: ["Stink Studios", "React", "Google Cloud"],
    },
    {
      name: "Kraft Mac and Cheese",
      description: "",
      tags: ["Stink Studios", "Javascript"],
    },
    {
      name: "Hands.wtf",
      link: "http://hands.wtf/",
      description: "",
      tags: ["Stink Studios", "Three.js", "Javascript", "WebGL"],
    },
    {
      name: "Camaro Six App",
      description: "",
      tags: ["Stink Studios", "Unity", "Three.js", "Javascript", "WebGL", "AWS"],
    },
    {
      name: "The Mad Men Experience",
      description: "",
      tags: ["Stink Studios"],
    },
    {
      name: "Bullseye's Playground",
      description: "",
      tags: ["Stink Studios", "Unity"],
    },
    {
      name: "Google Made w/ Code",
      description: "",
      tags: ["Stink Studios", "Javascript", "Google Cloud"],
    },
  ],
};
