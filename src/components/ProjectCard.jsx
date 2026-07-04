import { Link } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project, index }) {
  return (
    <Link to={`/projects/${project.slug}`} className="pcard">
      <div className="pcard__top">
        <span className="pcard__index num">{String(index + 1).padStart(2, "0")}</span>
        <span className="tag pcard__domain">{project.domain}</span>
      </div>
      <h3 className="pcard__title">{project.title}</h3>
      <p className="pcard__client">{project.client}</p>
      <p className="pcard__desc">{project.oneLiner}</p>
      <div className="pcard__metric">
        <span className="pcard__metric-value num">{project.heroMetric.value}</span>
        <span className="pcard__metric-label">{project.heroMetric.label}</span>
      </div>
      <div className="pcard__tech">
        {project.tech.slice(0, 4).map((t) => (
          <span className="tag tag--outline" key={t}>{t}</span>
        ))}
        {project.tech.length > 4 && <span className="tag tag--outline">+{project.tech.length - 4}</span>}
      </div>
      <span className="pcard__cta">Read the case study →</span>
    </Link>
  );
}
