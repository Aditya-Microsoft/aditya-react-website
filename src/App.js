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
            prompt: userMessage 
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
              <span className="stat-number">10+</span>
              <span className="stat-label">Team Members Led</span>
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
              High-impact Software Engineer with 6+ years of experience building secure, scalable, 
              and AI-augmented healthcare data platforms on Microsoft Azure. Proven track record at 
              Microsoft delivering Durable Azure Functions, Fabric-based analytics, and cloud-native 
              data orchestration for mission-critical clinical workloads.
            </p>
            <p>
              Strong expertise in <strong>C#, PySpark, and Generative AI</strong> integration, with a deep focus on 
              <strong> Security-by-Design, Observability, and Compliance</strong> (HIPAA/DICOM). Recognized for 
              technical leadership, mentoring engineers, and driving long-term engineering roadmaps.
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
                  <li>Architected high-concurrency Durable Azure Functions (C#) to orchestrate petabyte-scale healthcare data pipelines, reducing execution latency by 40%</li>
                  <li>Led a 10-member engineering pod in an Agile setup, owning end-to-end delivery from requirements to production</li>
                  <li>Designed secure-by-default cloud platforms using VNets, Private Endpoints, RBAC, achieving 100% compliance</li>
                  <li>Modernized analytics with Microsoft Fabric + Azure Synapse, cutting dashboard refresh times by 60%</li>
                  <li>Introduced Generative AI workflows using Azure OpenAI for pipeline monitoring and ChatOps</li>
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
                  <li>Designed multi-source ETL pipelines using Azure Data Factory and Synapse Spark, improving data availability by 30%</li>
                  <li>Built scalable PySpark notebooks following Clean Architecture principles</li>
                  <li>Developed Python-based automated data validation framework to detect schema drift</li>
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
                  <li>Delivered end-to-end data integrations between Dynamics 365 and Azure SQL</li>
                  <li>Built reliable ingestion and transformation workflows for real-time and batch analytics</li>
                  <li>Gained strong hands-on experience across Azure data services</li>
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
              <h3>DICOM Guard</h3>
              <p className="project-role">Lead Architect</p>
              <p>
                AI-powered healthcare security solution to automatically detect and redact PII/PHI 
                from medical imaging. Leveraged Azure AI Search and Cognitive Services for 
                HIPAA-compliant DICOM data processing at scale.
              </p>
              <div className="project-tags">
                <span>Azure AI</span>
                <span>Healthcare</span>
                <span>Security</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon">🤖</div>
              <h3>ChatOps for DataOps</h3>
              <p className="project-role">Creator & Lead Developer</p>
              <p>
                Built a conversational interface using Azure OpenAI and Logic Apps, enabling 
                on-call engineers to query pipeline health and failures using natural language.
              </p>
              <div className="project-tags">
                <span>Azure OpenAI</span>
                <span>Logic Apps</span>
                <span>ChatOps</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon">📊</div>
              <h3>Real-time Analytics Platform</h3>
              <p className="project-role">Technical Lead</p>
              <p>
                Modernized analytics architecture by integrating Microsoft Fabric with Azure Synapse, 
                enabling near real-time diagnostic insights for healthcare providers.
              </p>
              <div className="project-tags">
                <span>Microsoft Fabric</span>
                <span>Synapse</span>
                <span>Analytics</span>
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
                <span>OpenTelemetry</span>
                <span>GitHub Actions</span>
                <span>Managed Identities</span>
                <span>VNet Isolation</span>
                <span>RBAC</span>
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
