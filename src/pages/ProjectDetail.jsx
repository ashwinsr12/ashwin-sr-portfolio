import { Link, useParams, Navigate } from "react-router-dom";
import { projects, getProjectBySlug } from "../utils/projects";
import ProjectGallery from "../components/ProjectGallery";
import "./ProjectDetail.css";

const PARAM_SECTIONS = [
  { key: "businessProblem", n: "01", title: "Business problem", kind: "text" },
  { key: "businessDomain", n: "02", title: "Business domain", kind: "text" },
  { key: "users", n: "03", title: "Users", kind: "text" },
  { key: "userRoles", n: "04", title: "User roles", kind: "tags" },
  { key: "ownership", n: "05", title: "My ownership", kind: "text", emphasis: true },
  { key: "solutionDesign", n: "06", title: "Solution design", kind: "text" },
  { key: "businessLogic", n: "07", title: "Business logic", kind: "text" },
  { key: "integrations", n: "08", title: "Integrations", kind: "tags" },
  { key: "automation", n: "09", title: "Automation (Power Automate)", kind: "text" },
  { key: "security", n: "10", title: "Security", kind: "text" },
  { key: "challenges", n: "11", title: "Challenges solved", kind: "list" },
  { key: "scale", n: "12", title: "Scale", kind: "text" },
  { key: "businessOutcome", n: "13", title: "Business outcome", kind: "text", emphasis: true },
  { key: "decisionMaking", n: "14", title: "Decision making", kind: "text" },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="proj">
      <header className="proj-hero">
        <div className="shell">
          <Link to="/#projects" className="proj-back">← All projects</Link>
          <p className="eyebrow">{project.domain}</p>
          <h1 className="proj-hero__title">{project.title}</h1>
          <p className="proj-hero__client">{project.client} · {project.period}</p>
          <p className="proj-hero__lede">{project.oneLiner}</p>
          <div className="proj-hero__metric">
            <span className="num proj-hero__metric-value">{project.heroMetric.value}</span>
            <span className="proj-hero__metric-label">{project.heroMetric.label}</span>
          </div>
        </div>
      </header>

      <div className="shell proj-body">
        {project.images && project.images.length > 0 && (
          <section className="proj-gallery-section" aria-label="Project screenshots">
            <ProjectGallery images={project.images} title={project.title} />
          </section>
        )}
        <div className="proj-layout">
          <aside className="proj-toc" aria-label="Section navigation">
            <p className="proj-toc__label">On this page</p>
            <ol>
              {PARAM_SECTIONS.map((s) => (
                <li key={s.key}><a href={`#${s.key}`}>{s.title}</a></li>
              ))}
              <li><a href="#stack">Technologies used</a></li>
            </ol>
          </aside>

          <div className="proj-sections">
            {PARAM_SECTIONS.map((s) => {
              const value = project[s.key];
              if (!value) return null;
              return (
                <section className="proj-section" id={s.key} key={s.key}>
                  <div className="proj-section__head">
                    <span className="proj-section__n num">{s.n}</span>
                    <h2 className="proj-section__title">{s.title}</h2>
                  </div>
                  {s.kind === "text" && (
                    <p className={"proj-section__text" + (s.emphasis ? " proj-section__text--emphasis" : "")}>{value}</p>
                  )}
                  {s.kind === "tags" && (
                    <div className="proj-section__tags">
                      {value.map((v) => <span className="tag" key={v}>{v}</span>)}
                    </div>
                  )}
                  {s.kind === "list" && (
                    <ul className="proj-section__list">
                      {value.map((v, i) => <li key={i}>{v}</li>)}
                    </ul>
                  )}
                </section>
              );
            })}

            <section className="proj-section" id="stack">
              <div className="proj-section__head">
                <span className="proj-section__n num">15</span>
                <h2 className="proj-section__title">Technologies used</h2>
              </div>
              <div className="proj-section__tags">
                {project.tech.map((t) => <span className="tag tag--highlight" key={t}>{t}</span>)}
              </div>
            </section>
          </div>
        </div>
      </div>

      <nav className="proj-pager shell">
        <Link to={`/projects/${prev.slug}`} className="proj-pager__link proj-pager__link--prev">
          <span className="proj-pager__dir">← Previous</span>
          <span className="proj-pager__title">{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="proj-pager__link proj-pager__link--next">
          <span className="proj-pager__dir">Next →</span>
          <span className="proj-pager__title">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
