// prisma/seed.ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.skill.deleteMany();
  await prisma.projectTechnology.deleteMany();
  await prisma.experienceTechnology.deleteMany();
  await prisma.contentBlock.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();

  console.log("✅ Cleared existing data");

  // ===== CREATE TECHNOLOGIES =====
  const technologies = await Promise.all([
    // Frontend Frameworks
    prisma.technology.create({
      data: {
        name: "Next.js",
        slug: "nextjs",
        iconUrl: "https://cdn.simpleicons.org/nextdotjs",
        category: "Frontend",
        description: "React framework for production",
        order: 1,
      },
    }),
    prisma.technology.create({
      data: {
        name: "React",
        slug: "react",
        iconUrl: "https://cdn.simpleicons.org/react",
        category: "Frontend",
        description: "JavaScript library for building user interfaces",
        order: 2,
      },
    }),
    prisma.technology.create({
      data: {
        name: "Vite",
        slug: "vite",
        iconUrl: "https://cdn.simpleicons.org/vite",
        category: "Frontend",
        description: "Next generation frontend tooling",
        order: 3,
      },
    }),

    // Styling
    prisma.technology.create({
      data: {
        name: "Tailwind CSS",
        slug: "tailwindcss",
        iconUrl: "https://cdn.simpleicons.org/tailwindcss",
        category: "Frontend",
        description: "Utility-first CSS framework",
        order: 4,
      },
    }),
    prisma.technology.create({
      data: {
        name: "CSS",
        slug: "css",
        iconUrl: "https://cdn.simpleicons.org/css3",
        category: "Frontend",
        description: "Cascading Style Sheets",
        order: 5,
      },
    }),

    // Languages
    prisma.technology.create({
      data: {
        name: "JavaScript",
        slug: "javascript",
        iconUrl: "https://cdn.simpleicons.org/javascript",
        category: "Language",
        description: "Programming language for the web",
        order: 6,
      },
    }),
    prisma.technology.create({
      data: {
        name: "TypeScript",
        slug: "typescript",
        iconUrl: "https://cdn.simpleicons.org/typescript",
        category: "Language",
        description: "Typed superset of JavaScript",
        order: 7,
      },
    }),
    prisma.technology.create({
      data: {
        name: "HTML",
        slug: "html",
        iconUrl: "https://cdn.simpleicons.org/html5",
        category: "Frontend",
        description: "Hypertext Markup Language",
        order: 8,
      },
    }),
    prisma.technology.create({
      data: {
        name: "Python",
        slug: "python",
        iconUrl: "https://cdn.simpleicons.org/python",
        category: "Language",
        description: "High-level programming language",
        order: 9,
      },
    }),

    // Database & ORM
    prisma.technology.create({
      data: {
        name: "PostgreSQL",
        slug: "postgresql",
        iconUrl: "https://cdn.simpleicons.org/postgresql",
        category: "Database",
        description: "Advanced open source database",
        order: 10,
      },
    }),
    prisma.technology.create({
      data: {
        name: "Prisma",
        slug: "prisma",
        iconUrl: "https://cdn.simpleicons.org/prisma",
        category: "Backend",
        description: "Next-generation ORM",
        order: 11,
      },
    }),

    // Backend
    prisma.technology.create({
      data: {
        name: "NestJS",
        slug: "nestjs",
        iconUrl: "https://cdn.simpleicons.org/nestjs",
        category: "Backend",
        description: "Progressive Node.js framework",
        order: 12,
      },
    }),

    // Validation & APIs
    prisma.technology.create({
      data: {
        name: "Zod",
        slug: "zod",
        iconUrl: "https://cdn.simpleicons.org/zod",
        category: "Backend",
        description: "TypeScript-first schema validation",
        order: 13,
      },
    }),
    prisma.technology.create({
      data: {
        name: "React Query",
        slug: "reactquery",
        iconUrl: "https://cdn.simpleicons.org/reactquery",
        category: "Frontend",
        description: "Powerful data synchronization for React",
        order: 14,
      },
    }),

    // Infrastructure & DevOps
    prisma.technology.create({
      data: {
        name: "AWS",
        slug: "aws",
        iconUrl: "https://cdn.simpleicons.org/amazonaws",
        category: "Infrastructure",
        description: "Cloud computing platform",
        order: 15,
      },
    }),
    prisma.technology.create({
      data: {
        name: "Nginx",
        slug: "nginx",
        iconUrl: "https://cdn.simpleicons.org/nginx",
        category: "Infrastructure",
        description: "High-performance web server",
        order: 16,
      },
    }),

    // AI & APIs
    prisma.technology.create({
      data: {
        name: "OpenAI",
        slug: "openai",
        iconUrl: "https://cdn.simpleicons.org/openai",
        category: "AI",
        description: "AI language models",
        order: 17,
      },
    }),
  ]);

  console.log(`✅ Created ${technologies.length} technologies`);

  // Helper to find tech by slug
  const getTech = (slug: string) => technologies.find((t) => t.slug === slug)!;

  // ===== CREATE PROJECTS =====
  const scriblaheim = await prisma.project.create({
    data: {
      title: "Scriblaheim",
      slug: "scriblaheim",
      summary: "A fantasy writing platform for authors and readers",
      description: `A fantasy writing platform for authors and readers. Built with Next.js, NestJS, and PostgreSQL, featuring comprehensive story management, user authentication, and a modern reading experience.`,
      role: "Full Stack Developer",
      imageUrl: "/scriblaheim-logo.png",
      repoUrl: "https://github.com/Creedyfish",
      liveUrl: "https://scriblaheim.ielbanbuena.online/",
      featured: true,
      published: true,
      order: 1,
      technologies: {
        create: [
          { technologyId: getTech("nextjs").id, order: 1 },
          { technologyId: getTech("typescript").id, order: 2 },
          { technologyId: getTech("tailwindcss").id, order: 3 },
          { technologyId: getTech("nestjs").id, order: 4 },
          { technologyId: getTech("prisma").id, order: 5 },
          { technologyId: getTech("postgresql").id, order: 6 },
          { technologyId: getTech("zod").id, order: 7 },
          { technologyId: getTech("reactquery").id, order: 8 },
          { technologyId: getTech("aws").id, order: 9 },
          { technologyId: getTech("nginx").id, order: 10 },
        ],
      },
    },
  });

  const restaurantFinder = await prisma.project.create({
    data: {
      title: "LLM-Restaurant Finder",
      slug: "llm-restaurant-finder",
      summary: "AI-powered restaurant search with natural language",
      description: `A smart, AI-powered restaurant search tool that lets users describe what they want in natural language—and returns personalized restaurant recommendations. Powered by OpenRouter (GPT-4o-mini) and Foursquare Places API.`,
      role: "Full Stack Developer",
      imageUrl: "https://restaurant-finder-nu.vercel.app/logo.svg",
      repoUrl: "https://github.com/Creedyfish/restaurant_finder",
      liveUrl: "https://restaurant-finder-nu.vercel.app/",
      featured: true,
      published: true,
      order: 2,
      technologies: {
        create: [
          { technologyId: getTech("nextjs").id, order: 1 },
          { technologyId: getTech("typescript").id, order: 2 },
          { technologyId: getTech("tailwindcss").id, order: 3 },
          { technologyId: getTech("openai").id, order: 4 },
        ],
      },
    },
  });

  const frontendChallenge1 = await prisma.project.create({
    data: {
      title: "Frontend Challenge - Multi-step Form",
      slug: "frontend-challenge-multi-step-form",
      summary: "Multi-step form challenge from Frontend Mentor",
      description: `This is a solution to the Multi-step form challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects.`,
      role: "Frontend Developer",
      imageUrl:
        "https://raw.githubusercontent.com/Creedyfish/Front-End-Challenges/refs/heads/main/multi-step-form-nextjs/app/icon.png",
      repoUrl:
        "https://github.com/Creedyfish/Front-End-Challenges/tree/main/multi-step-form-nextjs",
      liveUrl: "https://multi-step-form-bhfc278zr-creedyfish.vercel.app/",
      featured: false,
      published: true,
      order: 3,
      technologies: {
        create: [
          { technologyId: getTech("nextjs").id, order: 1 },
          { technologyId: getTech("typescript").id, order: 2 },
          { technologyId: getTech("tailwindcss").id, order: 3 },
        ],
      },
    },
  });

  const frontendChallenge2 = await prisma.project.create({
    data: {
      title: "Frontend Challenge - Social Links",
      slug: "frontend-challenge-social-links",
      summary: "Social links profile from Frontend Mentor",
      description: `This is a solution to the Social links profile challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects.`,
      role: "Frontend Developer",
      imageUrl:
        "https://raw.githubusercontent.com/Creedyfish/Front-End-Challenges/refs/heads/main/multi-step-form-nextjs/app/icon.png",
      repoUrl:
        "https://github.com/Creedyfish/Front-End-Challenges/tree/main/vite-social-links-profile",
      liveUrl: "https://social-links-profile-kappa.vercel.app/",
      featured: false,
      published: true,
      order: 4,
      technologies: {
        create: [
          { technologyId: getTech("vite").id, order: 1 },
          { technologyId: getTech("typescript").id, order: 2 },
          { technologyId: getTech("tailwindcss").id, order: 3 },
        ],
      },
    },
  });

  const shoefitz = await prisma.project.create({
    data: {
      title: "SHOEFITZ",
      slug: "shoefitz",
      summary: "Dynamic shoe shopping web application",
      description: `A dynamic and visually stunning web application designed to redefine the online shoe shopping experience. Leveraging expertise in React and Next.js for the frontend, and PostgreSQL for the backend, I've crafted an intuitive user interface that seamlessly integrates with your love for shoes.`,
      role: "Full Stack Developer",
      imageUrl: "https://shoe-web-psi.vercel.app/logo.svg",
      repoUrl: "https://github.com/Creedyfish/ShoeWeb",
      liveUrl: "https://shoe-web-psi.vercel.app/",
      featured: false,
      published: true,
      order: 5,
      technologies: {
        create: [
          { technologyId: getTech("nextjs").id, order: 1 },
          { technologyId: getTech("react").id, order: 2 },
          { technologyId: getTech("tailwindcss").id, order: 3 },
          { technologyId: getTech("postgresql").id, order: 4 },
          { technologyId: getTech("prisma").id, order: 5 },
        ],
      },
    },
  });

  const mockup = await prisma.project.create({
    data: {
      title: "Mock Up Web Store",
      slug: "mock-up-web-store",
      summary: "Food website mockup with online ordering",
      description: `Created a Web Mockup website for a food website. This website showcases the best comfort food in town, delivered straight to your doorstep. You can find out more about the restaurant's history, menu, and events on the website, or place an order online.`,
      role: "Frontend Developer",
      imageUrl:
        "https://ie-mockup.netlify.app/assets/images/food-logo-dark.svg",
      repoUrl: "https://github.com/Creedyfish/mock-up-web",
      liveUrl: "https://ie-mockup.netlify.app/",
      featured: false,
      published: true,
      order: 6,
      technologies: {
        create: [
          { technologyId: getTech("javascript").id, order: 1 },
          { technologyId: getTech("css").id, order: 2 },
          { technologyId: getTech("html").id, order: 3 },
        ],
      },
    },
  });

  console.log("✅ Created 6 projects");

  // ===== CREATE EXPERIENCE =====
  const ingenuityExperience = await prisma.experience.create({
    data: {
      company: "Ingenuity Global Consulting, Inc.",
      position: "Frontend Developer",
      description: `• Built comprehensive data collection and management interfaces with intuitive user workflows
• Developed interactive dashboards featuring data visualization components and analytics tools
• Created advanced filtering systems with customizable parameters and saved search functionality
• Implemented efficient data retrieval with infinite scrolling and optimized loading states
• Enhanced user experience through responsive design and accessibility improvements`,
      startDate: new Date("2024-04-01"),
      endDate: null, // Currently working
      order: 1,
      published: true,
      technologies: {
        create: [
          { technologyId: getTech("nextjs").id, order: 1 },
          { technologyId: getTech("react").id, order: 2 },
          { technologyId: getTech("typescript").id, order: 3 },
          { technologyId: getTech("tailwindcss").id, order: 4 },
        ],
      },
    },
  });

  const turnkeyExperience = await prisma.experience.create({
    data: {
      company: "Remarkablism Services Corporation | Turnkey Phils",
      position: "Web Developer Intern",
      description: `• Developed user interfaces with modern JavaScript frameworks, HTML5, and CSS3.
• Used content creation tools and digital media to design web sites.
• Employed coding practices based on commonly accepted standards to establish site layout and user interface.`,
      startDate: new Date("2023-03-01"),
      endDate: new Date("2023-04-30"),
      order: 2,
      published: true,
      technologies: {
        create: [
          { technologyId: getTech("html").id, order: 1 },
          { technologyId: getTech("css").id, order: 2 },
          { technologyId: getTech("javascript").id, order: 3 },
        ],
      },
    },
  });

  console.log("✅ Created 2 experiences");

  // ===== CREATE SKILLS =====
  const skills = await Promise.all([
    prisma.skill.create({
      data: {
        technologyId: getTech("nextjs").id,
        level: 4,
        order: 1,
        visible: true,
      },
    }),
    prisma.skill.create({
      data: {
        technologyId: getTech("react").id,
        level: 5,
        order: 2,
        visible: true,
      },
    }),
    prisma.skill.create({
      data: {
        technologyId: getTech("typescript").id,
        level: 4,
        order: 3,
        visible: true,
      },
    }),
    prisma.skill.create({
      data: {
        technologyId: getTech("javascript").id,
        level: 5,
        order: 4,
        visible: true,
      },
    }),
    prisma.skill.create({
      data: {
        technologyId: getTech("tailwindcss").id,
        level: 5,
        order: 5,
        visible: true,
      },
    }),
    prisma.skill.create({
      data: {
        technologyId: getTech("postgresql").id,
        level: 4,
        order: 6,
        visible: true,
      },
    }),
    prisma.skill.create({
      data: {
        technologyId: getTech("prisma").id,
        level: 4,
        order: 7,
        visible: true,
      },
    }),
    prisma.skill.create({
      data: {
        technologyId: getTech("python").id,
        level: 3,
        order: 8,
        visible: true,
      },
    }),
  ]);

  console.log(`✅ Created ${skills.length} skills`);

  // ===== CREATE CONTENT BLOCKS =====
  const contentBlocks = await Promise.all([
    prisma.contentBlock.create({
      data: {
        key: "hero",
        title: "Full Stack Developer",
        content: `# Hi, I'm Irvin Elbanbuena

I'm a passionate full stack developer who loves building modern web applications with cutting-edge technologies. I specialize in React, Next.js, and TypeScript, creating seamless user experiences backed by robust server-side solutions.`,
        published: true,
      },
    }),
    prisma.contentBlock.create({
      data: {
        key: "about",
        title: "About Me",
        content: `## About Me

I'm a developer from Davao, Philippines, with a passion for creating intuitive and efficient web applications. With experience in both frontend and backend development, I enjoy solving complex problems and bringing ideas to life through code.

### What I Do

- **Frontend Development**: Building responsive and interactive user interfaces with React and Next.js
- **Backend Development**: Creating robust APIs and database solutions with PostgreSQL and Prisma
- **Full Stack Projects**: End-to-end application development from design to deployment

### My Approach

I believe in writing clean, maintainable code and following best practices. I'm constantly learning new technologies and improving my craft to deliver the best possible solutions.`,
        published: true,
      },
    }),
    prisma.contentBlock.create({
      data: {
        key: "footer",
        title: "Get In Touch",
        content: `Feel free to reach out if you'd like to collaborate on a project or just want to say hi!

**Location**: Davao, Philippines  
**GitHub**: [github.com/Creedyfish](https://github.com/Creedyfish)  
**LinkedIn**: [linkedin.com/in/irvin-elbanbuena](https://www.linkedin.com/in/irvin-elbanbuena-78a0341b7/)`,
        published: true,
      },
    }),
  ]);

  console.log(`✅ Created ${contentBlocks.length} content blocks`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
