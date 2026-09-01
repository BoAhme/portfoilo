import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// ─── Per-element animated card ────────────────────────────────────────────────
const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const controls = useAnimation();

  // each card watches itself — no parent viewport tricks
  const inView = useInView(ref, {
    once: false, // re-animates when scrolled back into view
    amount: 0.25, // card must be 25% visible before triggering
    margin: "0px", // no artificial offset
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            delay: (index % 5) * 0.06,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={{
        borderColor: "rgba(255,255,255,0.2)",
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.96,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 25,
        },
      }}
      className="group relative overflow-hidden bg-neutral-900 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center gap-2 cursor-pointer"
    >
      {/* Subtle radial glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_65%)]" />

      {/* Technology logo */}
      <motion.div
        whileHover={{ rotate: -4, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 280, damping: 16 }}
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] p-2 transition-all duration-300"
      >
        <img
          src={skill.logo}
          alt={`${skill.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Name */}
      <p className="relative z-10 text-sm font-semibold text-white group-hover:text-[#62a58f] transition-colors duration-300">
        {skill.name}
      </p>

      {/* Desc */}
      <p className="relative z-10 text-white/40 text-xs">{skill.desc}</p>
    </motion.div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── Animated title underline ────────────────────────────────────────────────
const AnimatedTitle = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const lineControls = useAnimation();

  const inView = useInView(ref, { once: false, amount: 0.5, margin: "0px" });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      });
      lineControls.start({
        width: "50%",
        opacity: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      controls.start({ opacity: 0, y: 18 });
      lineControls.start({ width: 0, opacity: 0 });
    }
  }, [inView, controls, lineControls]);

  return (
    <motion.h1
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 18 }}
      className="relative font-black text-white lg:text-3xl text-2xl mb-20"
    >
      Creative & Tech Stack
      <motion.span
        animate={lineControls}
        initial={{ width: 0, opacity: 0 }}
        className="h-1.5 bg-[#7055c1] absolute rounded-2xl -bottom-5 left-[25%]"
      />
    </motion.h1>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const skills = [
  {
    name: "HTML",
    desc: "Web Structure",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    desc: "Web Styling",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    desc: "Web Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "Angular",
    desc: "Frontend Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
  },
  {
    name: "Bootstrap",
    desc: "UI Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Git & GitHub",
    desc: "Version Control",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    name: "Jira",
    desc: "Project Management",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
  },
  {
    name: "Slack",
    desc: "Team Collaboration",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg",
  },
  {
    name: "SQL Server",
    desc: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  },
  {
    name: "C#",
    desc: "Programming Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  },
  {
    name: "Java",
    desc: "Programming Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "Python",
    desc: "Programming Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "MVC",
    desc: "Application Pattern",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    name: "RESTful APIs",
    desc: "API Development",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  },
  {
    name: "Clean Architecture",
    desc: "System Design",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    name: "ASP.NET Core",
    desc: "Backend Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    name: "ASP.NET Framework",
    desc: "Web Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    name: "Docker",
    desc: "Containerization",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
];

const Skills = () => {
  return (
    <section
      id="Skills"
      className="w-full bg-neutral-950 flex flex-col items-center px-4 py-20 pt-28"
    >
      <AnimatedTitle />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl w-full">
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
