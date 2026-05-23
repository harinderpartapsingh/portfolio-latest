import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer II</h4>
                <h5>Intact Financial Corporation</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <ul>
              <li>
                Building user-facing insurance workflows using Java, Spring
                Boot, REST APIs, and Angular.
              </li>
              <li>
                Delivering backend logic, frontend improvements, tests,
                production support, and maintainable full-stack changes.
              </li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer I</h4>
                <h5>Intact Financial Corporation</h5>
              </div>
              <h3>2025</h3>
            </div>
            <ul>
              <li>
                Led modernization of a legacy enterprise application by
                rebuilding backend services from Spring to Spring Boot 4.
              </li>
              <li>
                Used Dynatrace for production traffic analysis, removed
                deprecated code, and supported safer rolling deployments.
              </li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>Ericsson</h5>
              </div>
              <h3>2025</h3>
            </div>
            <ul>
              <li>
                Contributed to an internal security vulnerability management
                platform for tracking and reporting enterprise security issues.
              </li>
              <li>
                Built pagination, improved CVE Excel reports, automated overdue
                CVE responses, and reduced bulk user inactivation time.
              </li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>Intact Financial Corporation</h5>
              </div>
              <h3>2024</h3>
            </div>
            <ul>
              <li>
                Developed backend features for online insurance policy
                workflows and multi-driver quote functionality.
              </li>
              <li>
                Migrated core policy purchasing services to the latest Spring
                Boot version and eliminated security vulnerabilities.
              </li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>Intact Financial Corporation</h5>
              </div>
              <h3>2023</h3>
            </div>
            <ul>
              <li>
                Improved Angular-based UI responsiveness and enhanced checkout
                page SEO, performance, accessibility, and best practices.
              </li>
              <li>
                Created documentation for Spring Boot migrations, trunk-based
                development, local setup, and debugging workflows.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;