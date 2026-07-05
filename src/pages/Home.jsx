import profile from "../data/profile.json";
import { projects } from "../utils/projects";
import { useExperienceCounter } from "../hooks/useExperienceCounter";
import ProjectCard from "../components/ProjectCard";
import "./Home.css";

export default function Home() {
  const experience = useExperienceCounter(profile.experienceStartDate);

  return (
    <>
      {/* ===== Hero ===== */}
      <header className="hero">
        <div className="shell hero__inner">
          <p className="eyebrow">Power Apps · Power Automate · Dataverse · Azure</p>
          <h1 className="hero__title">
            I build enterprise Power Platform<br />
            apps that <span className="hero__accent">remove manual work.</span>
          </h1>
          <p className="hero__lede">
            {profile.role} in {profile.location.split(",")[0]}. {profile.summary.split(". ")[0]}.
            Four production apps, real business processes, real numbers below.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">View projects</a>
            <a className="btn btn--secondary" href={profile.resumeFile} download>Download résumé</a>
            <a className="btn btn--ghost" href="#contact">Get in touch</a>
          </div>
        </div>
      </header>

      {/* ===== Stat strip ===== */}
      <section className="statstrip" aria-label="Highlights">
        <div className="shell statstrip__grid">
          {profile.stats.map((s) => {
            const isExperience = s.id === "experience";
            
            if (isExperience) {
              const pad = (num) => String(num).padStart(2, '0');
              const timeDisplay = (
                <div className="experience-counter">
                  <div className="experience-counter__main">
                    <span className="experience-counter__years">{experience.years}</span>
                    <span className="experience-counter__yrs">yrs</span>
                    <span className="experience-counter__months">{experience.months}mo</span>
                  </div>
                  <div className="experience-counter__secondary">
                    {experience.days}d {pad(experience.hours)}h {pad(experience.minutes)}m <span className="experience-counter__seconds">{pad(experience.seconds)}</span>s
                  </div>
                </div>
              );
              return (
                <div className="stat" key={s.id}>
                  <span className="stat__value">{timeDisplay}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              );
            }
            
            return (
              <div className="stat" key={s.id}>
                <span className="stat__value num">{s.value}<span className="stat__suffix">{s.suffix}</span></span>
                <span className="stat__label">{s.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Projects ===== */}
      <section id="projects">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Case studies</p>
            <h2 className="section-title">Projects</h2>
            <p className="section-sub">
              Each one below breaks down the business problem, my ownership, the architecture decisions,
              and the measured outcome — not just a tech-stack list.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard project={p} index={i} key={p.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section id="skills">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Toolkit</p>
            <h2 className="section-title">Core technical skills</h2>
          </div>
          <div className="skills-grid">
            {profile.skills.map((g) => (
              <div className="skill-group card" key={g.group}>
                <h3 className="skill-group__title">{g.group}</h3>
                <div className="skill-group__tags">
                  {g.items.map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Experience ===== */}
      <section id="experience">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Track record</p>
            <h2 className="section-title">Experience</h2>
          </div>
          {profile.experience.map((job) => (
            <div className="job" key={job.company}>
              <div className="job__meta">
                <h3 className="job__role">{job.role}</h3>
                <p className="job__company">{job.company} · {job.location}</p>
                <p className="job__period num">{job.period}</p>
              </div>
              <ul className="job__list">
                {job.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="edu-cert-grid">
            <div className="card">
              <h4 className="mini-head">Education</h4>
              <p className="mini-title">{profile.education.degree}</p>
              <p className="mini-sub">{profile.education.school} · {profile.education.period}</p>
              <p className="mini-sub">{profile.education.detail}</p>
            </div>
            <div className="card">
              <h4 className="mini-head">Certification</h4>
              {profile.certifications.map((c) => (
                <div key={c.name}>
                  <p className="mini-title">{c.name}</p>
                  <p className="mini-sub">{c.issuer} · {c.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact">
        <div className="shell contact">
          <p className="eyebrow">Let's talk</p>
          <h2 className="section-title">Have a Power Platform problem worth automating?</h2>
          <p className="section-sub contact__lede">
            I'm always glad to talk through a process that still runs on spreadsheets and email.
          </p>
          <div className="contact__grid">
            <a className="contact__item" href={`mailto:${profile.email}`}>
              <span className="contact__label">Email</span>
              <span className="contact__value">{profile.email}</span>
            </a>
            <a className="contact__item" href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
              <span className="contact__label">Phone</span>
              <span className="contact__value">{profile.phone}</span>
            </a>
            <a className="contact__item" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="contact__label">LinkedIn</span>
              <span className="contact__value">View profile ↗</span>
            </a>
            <div className="contact__item">
              <span className="contact__label">Location</span>
              <span className="contact__value">{profile.location}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
