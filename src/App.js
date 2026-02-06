import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: "Hi! 👋 I'm Aditya's AI assistant. Ask me anything about his experience, skills, or projects!" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://aditya-cv-api.azurewebsites.net/api/Function1?code=A7-D9RLOcRAZx5Wfsxe80p-usZDNZdcJIclXxCxR1LrSAzFupJRK3g%3D%3D',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ip: '0.0.0.0',
            prompt: `[Instruction: Always refer to Aditya Ashok Somwanshi as "Aditya" only, never use his full name and do not mention the cv context while answering; summarize the context in brief while answering.]\n\n${userMessage}` 
          })
        }
      );
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      setChatMessages(prev => [...prev, { type: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Chat API error:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        text: `Error: ${error.message}. Check browser console for details.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">AS</div>
        <div className="nav-links">
          {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
            <button
              key={section}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="about">
        {/* Animated Background */}
        <div className="hero-bg">
          <div className="floating-orbs">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`orb orb-${i + 1}`}></div>
            ))}
          </div>
          <div className="grid-lines"></div>
          <div className="glow-circle glow-1"></div>
          <div className="glow-circle glow-2"></div>
          <div className="glow-circle glow-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <p className="greeting">Hello, I'm</p>
            <h1 className="name">Aditya Somwanshi</h1>
            <h2 className="title">Software Engineer II @ Microsoft</h2>
            <p className="tagline">
              Building secure, scalable, and AI-augmented healthcare data platforms on Azure
            </p>
            <div className="hero-cta">
              <a href="mailto:adityasomwanshi97@gmail.com" className="btn btn-primary">Get in Touch</a>
              <a href="https://linkedin.com/in/adityasomwanshi" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn</a>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">6+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Lines of Code</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Security Compliance</span>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p>
              Result driven Software Engineer with 6+ years of experience building secure, scalable, and AI
augmented healthcare data platforms on Microsoft Azure. Proven track record at Microsoft 
delivering Durable Azure Functions, Fabric-based analytics, and cloud-native data 
orchestration for mission-critical clinical workloads. 
            </p>
            <p>
              Proficient in Azure services, C#, PySpark, and Generative AI integration, with a strong focus on 
              Security-by-Design, Compliance, and Observability. Recognized for technical excellence, 
              leading high-performing engineering pods, and driving long-term platform roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section experience-section" id="experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Software Engineer II</h3>
                  <span className="company">Microsoft India Pvt. Ltd.</span>
                  <span className="period">Aug 2023 – Present</span>
                </div>
                <p className="focus">Focus: Scalable Orchestration, Healthcare Data Security, AI Enablement</p>
                <ul>
                  <li>Led end-to-end design and development of high-concurrency Durable & HTTP-triggered Azure Functions (C#) orchestrating petabyte-scale healthcare data pipelines, reducing execution latency</li>
                  <li>Owned the full software development lifecycle, from requirement clarification with product owners to design, implementation, release, and live-site availability of diagnostic services</li>
                  <li>Designed secure-by-design, network-isolated platforms using VNets, Private Endpoints, Managed Identities, and RBAC, ensuring 100% compliance with company's security and privacy standards</li>
                  <li>Modernized analytics architecture by integrating Microsoft Fabric with Azure Synapse and Power BI, cutting dashboard refresh times by 60% and improving operational visibility</li>
                  <li>Implemented observability and reliability standards using OpenTelemetry, structured logging, and distributed tracing, improving debuggability of highly concurrent systems</li>
                  <li>Served as Scrum lead for a 10-member engineering pod, planning and tracking sprints, coordinating task execution, and contributing to architectural discussions and engineering best practices, while being the youngest member of the team</li>
                  <li>Prototyped Generative AI integrations using Azure OpenAI during an internal hackathon, exploring ChatOps-style workflows and AI-assisted interactions for healthcare data platform</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Software Engineer</h3>
                  <span className="company">Nuance Communications (Microsoft)</span>
                  <span className="period">May 2022 – Jul 2023</span>
                </div>
                <p className="focus">Focus: Data Transformation, Large-Scale Processing</p>
                <ul>
                  <li>Designed and implemented multi-source ETL pipelines using Azure Data Factory and Synapse Spark, improving data availability and reliability for downstream analytics by ~30%</li>
                  <li>Built scalable PySpark notebooks on Synapse Spark clusters, processing large healthcare datasets while following Clean Architecture and modular design principles</li>
                  <li>Designed SQL schemas and optimized data models to support performance analytical workloads and executive reporting</li>
                  <li>Developed a Python-based automated data validation framework, integrated with ADF pipelines to detect schema drift, data quality issues, and pipeline regressions before production impact</li>
                  <li>Delivered Power BI dashboards consumed by business and leadership teams, enabling faster insights and data-driven decision-making</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Associate Software Engineer</h3>
                  <span className="company">Cloudfronts Technologies</span>
                  <span className="period">Jun 2019 – Apr 2022</span>
                </div>
                <ul>
                  <li>Built end-to-end data integrations using Azure Data Factory between Dynamics 365, Azure SQL, Blob Storage, and QuickBooks, supporting finance and CRM reporting workflows</li>
                  <li>Implemented full-load and delta-load pipelines to enable reliable real-time and batch data synchronization across enterprise systems</li>
                  <li>Developed ingestion and transformation workflows with a strong focus on data consistency, failure handling, and reprocessing</li>
                  <li>Delivered Power BI dashboards for business stakeholders, enabling improved visibility into operational and financial metrics</li>
                  <li>Gained strong hands-on experience across Azure data services, enterprise integrations, and production data pipelines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Key Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-icon">🛡️</div>
              <h3>DICOMGuard</h3>
              <p className="project-role">Lead Architect</p>
              <p>
                Hackathon-winning solution for secure handling of DICOM medical images. Built a web service using Python, Flask, Azure, and OpenAI that automatically de-identifies PII from DICOM tags and images using ML algorithms including NLP and image recognition, while supporting re-identification when needed. Ensures privacy-compliant data sharing for medical professionals and researchers.
              </p>
              <div className="project-tags">
                <span>Python</span>
                <span>Flask</span>
                <span>Azure</span>
                <span>OpenAI</span>
                <span>Healthcare</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon">🩺</div>
              <h3>Medvisor</h3>
              <p className="project-role">Creator & Developer</p>
              <p>
                Smart solution connecting General Physicians and Medical Consultants with qualified Medical Specialists for expert guidance on patient care and diagnosis. Empowers doctors to find the most experienced specialists who can offer advice and support based on current prognosis.
              </p>
              <div className="project-tags">
                <span>Healthcare</span>
                <span>Telehealth</span>
                <span>Azure</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon">🔗</div>
              <h3>Secure Health Bridge</h3>
              <p className="project-role">Solution Architect</p>
              <p>
                Edge Connector utilizing Azure Arc to securely transfer healthcare data including DIMSE (DICOM) images and SQL database records from on-premises systems to Azure Fabric Data Lake. Handles large volumes of sensitive medical data while ensuring security and compliance with healthcare regulations.
              </p>
              <div className="project-tags">
                <span>Azure Arc</span>
                <span>DICOM</span>
                <span>Data Lake</span>
                <span>Healthcare</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section skills-section" id="skills">
        <div className="container">
          <h2 className="section-title">Tech Stack</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <div className="skill-tags">
                <span>C# (.NET)</span>
                <span>Python</span>
                <span>PySpark</span>
                <span>SQL</span>
                <span>KQL</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Azure Data & AI</h3>
              <div className="skill-tags">
                <span>Microsoft Fabric</span>
                <span>Azure Synapse</span>
                <span>Azure Data Factory</span>
                <span>Azure OpenAI</span>
                <span>Azure AI Search</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Architecture & Design</h3>
              <div className="skill-tags">
                <span>Clean Architecture</span>
                <span>Durable Task Framework</span>
                <span>Microservices</span>
                <span>Event-Driven Patterns</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>DevOps & Security</h3>
              <div className="skill-tags">
                <span>Managed Identities</span>
                <span>VNet Isolation</span>
                <span>RBAC</span>
                <span>OpenTelemetry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Let's Connect</h2>
          <div className="contact-content">
            <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.</p>
            <div className="contact-links">
              <a href="mailto:adityasomwanshi97@gmail.com" className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>adityasomwanshi97@gmail.com</span>
              </a>
              <a href="tel:+919004802526" className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 9004802526</span>
              </a>
              <a href="https://linkedin.com/in/adityasomwanshi" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-icon">🔗</span>
                <span>linkedin.com/in/adityasomwanshi</span>
              </a>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Navi Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Aditya Somwanshi. Built with React.</p>
      </footer>

      {/* Chat Widget */}
      <div className={`chat-widget ${isChatOpen ? 'open' : ''}`}>
        {/* Chat Toggle Button */}
        <button 
          className="chat-toggle"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Toggle chat"
        >
          {isChatOpen ? (
            <span className="chat-icon">✕</span>
          ) : (
            <span className="chat-icon">💬</span>
          )}
        </button>

        {/* Chat Panel */}
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">🤖</span>
              <div>
                <h4>Ask about Aditya</h4>
                <span className="chat-status">AI Assistant</span>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                {msg.type === 'bot' && <span className="message-avatar">🤖</span>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">
                <span className="message-avatar">🤖</span>
                <div className="message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything about Aditya..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="chat-send"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
