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
      description:
        "Lead the development of the Torch platform, including key microservices for scheduling, assessments, integrations, and video conferencing, contributing to the facilitation of 1.7 million minutes of coaching across 37,000 sessions yearly. Spearheaded the creation of a comprehensive design system and implementation of a mono repo structure, significantly enhancing engineering quality and accelerating development processes.",
      technologies: "React, TypeScript, Python, PostgreSQL, AWS, Docker",
    },
    {
      company: "Delaware North",
      link: "https://www.delawarenorth.com/",
      title: "System Reliability Engineer",
      start: "2017",
      end: "2019",
      description:
        "Specialized in ensuring the robustness and efficiency of Delware North's data systems and pipelines, including the development of a comprehensive data warehouse and ETL pipelines. Led the development of a data visualization platform, enabling the production of interactive dashboards and reports.",
      technologies: "React, Python, AWS, ETL, MongoDB",
    },
    {
      company: "Stink Studios",
      link: "https://www.stinkstudios.com/",
      title: "Senior Developer",
      start: "2014",
      end: "2017",
      description:
        "Specialized in front-end and back-end development, building performant, pixel-perfect websites across various technologies. Developed brand-focused and advertising websites, along with web and native applications. Analyzed and resolved technical and performance issues, enhancing website scalability and usability.",
      technologies:
        "Technologies: React, Python, AWS, Google Cloud, WebGL, Unity",
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
      description:
        "A data visualization platform enabling the production of interactive dashboards and reports.",
      tags: ["Delware North", "React", "AWS", "D3.js", "AWS"],
    },
    {
      name: "October",
      description:
        "A digital publication that celebrates craft beer culture, created in collaboration with Pitchfork and ZX Ventures.",
      tags: ["Stink Studios", "React", "Redux", "AWS"],
    },
    {
      name: "Brickell City Centre",
      link: "https://www.brickellcitycentre.com/",
      description:
        "A comprehensive website and CMS build for Swire Properties' first US development. Designed for exclusive management and maintenance by Swire Properties.",
      tags: ["Stink Studios", "WebGL", "Three.js", "CraftCMS", "Webby Honoree"],
    },
    {
      name: "Google Presents: The Hidden World of the National Parks",
      link: "https://artsandculture.google.com/project/national-park-service",
      description:
        "An immersive 360 experience showcasing five national parks, in partnership with Google and the National Park Service.",
      tags: [
        "Stink Studios",
        "WebGL",
        "React",
        "Redux",
        "Three.js",
        "Awwwards Site of the Day",
        "FWA Site of The Day",
        "FWA Site of the Month",
        "Communication Arts Webpick",
      ],
    },
    {
      name: "Kraft Mac & Cheese",
      description: "A dedicated website for the Kraft Mac & Cheese brand.",
      tags: ["Stink Studios"],
    },
    {
      name: "Hands.wtf",
      link: "http://hands.wtf/",
      description:
        "We gave the internet hands. A silly experiment in WebGL and Three.js.",
      tags: [
        "Stink Studios",
        "Three.js",
        "AWS",
        "FWA Site of the Day",
        "FWA Mobile of the Day",
        "Awwwards Honorable Mention",
      ],
    },
    {
      name: "Camaro Six App",
      description:
        "A native and web app developed for the launch of the 2016 Chevrolet Camaro.",
      tags: [
        "Stink Studios",
        "Unity",
        "Three.js",
        "Javascript",
        "WebGL",
        "AWS",
      ],
    },
    {
      name: "The Mad Men Experience",
      description:
        'An interactive archive detailing the history of the TV show "Mad Men", in partnership with Google and Lions Gate.',
      tags: ["Stink Studios", "FWA Site of the Day", "FWA Mobile of the Day"],
    },
    {
      name: "Bullseye's Playground",
      description:
        "The first virtual reality video game designed for Google's Project Tango Tablet Development Kit, in collaboration with Target.",
      tags: ["Stink Studios", "Unity"],
    },
    {
      name: "Google Made w/ Code",
      description:
        "Redesign and development of the Made w/Code website and Blockly coding projects, in partnership with Google.",
      tags: ["Stink Studios", "Google Cloud"],
    },
  ],
};
