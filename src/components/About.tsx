import "./styles/About.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>

        <p className="para">
          I am a Software Developer II focused on backend and full-stack
          engineering, building secure, accessible, and production-ready
          applications with Java, Spring Boot, Angular, React, AWS, Docker, and
          CI/CD.
        </p>

        <div className="about-highlights">
          <span>Backend Systems</span>
          <span>Full-Stack Development</span>
          <span>Cloud & CI/CD</span>
          <span>Accessibility</span>
          <span>Production Reliability</span>
        </div>
      </div>
    </section>
  );
};

export default About;