import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Download, Menu, X, Code, Briefcase, GraduationCap, Award, User, MessageCircle } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

    const downloadResume = () => {
    const resumeUrl = '/resume/Chaitanya_Patil_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Chaitanya_Patil_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = [
    { 
      name: 'React', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'Frontend'
    },
    { 
      name: 'JavaScript', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      category: 'Language'
    },
    { 
      name: 'Node.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      category: 'Backend'
    },
    { 
      name: 'Python', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      category: 'Language'
    },
    { 
      name: 'MySQL', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      category: 'Database'
    },
    { 
      name: 'MongoDB', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      category: 'Database'
    },
    { 
      name: 'Git', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      category: 'Tools'
    },
    { 
      name: 'Azure', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      category: 'Cloud'
    },
    { 
      name: 'HTML5', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      category: 'Frontend'
    },
    { 
      name: 'CSS3', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      category: 'Frontend'
    },
    { 
      name: 'Tailwind CSS', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      category: 'Frontend'
    },
    { 
      name: 'Express.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      category: 'Backend'
    }
  ];

  const projects = [
    {
      title: 'PasteRoom',
      description: 'Full-stack file sharing platform with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      tech: ['React', 'Node.js', 'Express.js', 'Azure'],
      github: '#',
      live: 'https://www.pasteroom.live',
      image: 'https://product-list.sfo3.digitaloceanspaces.com/products/paste-room/images/d36dd897-58bf-4224-8a8c-c73f2b20e2a2.jpeg'
    },
    {
      title: 'CampusResults',
      description: 'CampusResults is a web application designed to help students manage their academic results and track their progress over time. It features user authentication, data visualization, and a responsive design.',
      tech: ['React', 'Node.js', 'Express.js', 'TailwindCSS', 'Apex Chart'],
      github: '#',
      live: 'https://www.campusresults.live/',
      image: 'https://media.licdn.com/dms/image/v2/D5622AQHKSGIz86DTnQ/feedshare-shrink_800/B56ZTFyceEGUAg-/0/1738485123155?e=2147483647&v=beta&t=ByC-h68GAmYcou1QY7CxZ0FMCrom0dOQHmoFhCVfN7g'
    },
    // {
    //   title: 'Weather Analytics Dashboard',
    //   description: 'Data visualization dashboard showing weather patterns and analytics with interactive charts and forecasting capabilities.',
    //   tech: ['React', 'D3.js', 'Python', 'FastAPI'],
    //   github: '#',
    //   live: '#',
    //   image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop'
    // }
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-800">
              <span className="text-blue-600">Port</span>folio
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors hover:text-blue-400 ${
                    activeSection === item ? 'text-slate-400' : 'text-blue-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 text-blue-600 hover:text-gray-700 capitalize"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
        <div className="w-full text-center px-4">
          <div className="mb-8">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQHVvAWKMOeGxw/profile-displayphoto-shrink_800_800/B56Zag8cNEHUAc-/0/1746456921931?e=1757548800&v=beta&t=NNtwg2z2LTRbGP_WvUc9qM0Ay9BTM6GajadC-Fh7IHI"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Hi, I'm <span className="text-blue-600">Chaitanya Patil</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Full Stack Developer & Problem Solver
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
              I create exceptional digital experiences with modern technologies. 
              Passionate about clean code, user experience, and continuous learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Briefcase className="h-5 w-5" />
                View My Work
              </button>
              <button
              onClick={downloadResume}
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Download Resume
              </button>
            </div>
          </div>
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-gray-400 mx-auto cursor-pointer" onClick={() => scrollToSection('about')} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I'm a passionate frontend developer currently pursuing my third year in Electronics and Telecommunication Engineering at PICT. With a strong foundation in web development and UI design, I've built several impactful projects and am now expanding my skills towards full-stack development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">My Journey</h3>
              <p className="text-gray-600 mb-4">
                My journey began with a curiosity to build beautiful and functional websites. Over the last two years, I've worked on four diverse projects that challenged my creativity and technical skills. I love solving real-world problems with simple, intuitive designs and clean code.
              </p>
              <p className="text-gray-600 mb-6">
                As I continue learning backend technologies to become a full-stack developer, I focus on writing maintainable code and understanding best practices in modern development. Outside coding, I enjoy exploring tech trends, bikes, and improving my English communication skills.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">Frontend</div>
                  <div className="text-gray-600">Development Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">PICT</div>
                  <div className="text-gray-600">Third Year ENTC</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Based in Pune, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Third Year ENTC Student at PICT</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Learning MERN stack to become a Full Stack Developer</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Strong interest in UI/UX and clean design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Skills & Technologies</h2>
            <p className="text-lg text-gray-600">
              Here are the technologies I work with to bring ideas to life
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Technology
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {skills.map((skill, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={skill.icon} 
                              alt={skill.name}
                              className="h-8 w-8 mr-3 flex-shrink-0"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <span className="text-base font-medium text-gray-900">{skill.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            skill.category === 'Frontend' ? 'bg-blue-100 text-blue-800' :
                            skill.category === 'Backend' ? 'bg-green-100 text-green-800' :
                            skill.category === 'Database' ? 'bg-purple-100 text-purple-800' :
                            skill.category === 'Language' ? 'bg-orange-100 text-orange-800' :
                            skill.category === 'Tools' ? 'bg-gray-100 text-gray-800' :
                            'bg-indigo-100 text-indigo-800'
                          }`}>
                            {skill.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600">
              Some of my recent work that I'm proud of
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{project.title}</h3>
                  <p className="text-gray-600 mb-6 text-base leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    {/* <a 
                      href={project.github}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-lg"
                    >
                      <Github className="h-5 w-5" />
                      Code
                    </a> */}
                    <a 
                      href={project.live}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-lg"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">
              I'm always open to discussing new opportunities and interesting projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Let's Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">chaitanya241005@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">+91 6396663693</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Pune, India</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/chaitanya-patil-7769b1292/" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 hover:text-black transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://github.com/Cyp5556" className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="space-y-4">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">Name</div>
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-500">
                    Your Name
                  </div>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">Email</div>
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-500">
                    your.email@example.com
                  </div>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">Message</div>
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-500 h-24 flex items-start">
                    Your message here...
                  </div>
                </div>
                <button 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Chaitanya Patil. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;