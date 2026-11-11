'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code, 
  Cloud, 
  Database, 
  Layers, 
  Award, 
  Languages, 
  GraduationCap, 
  FileText, 
  Download,
  Volume2,
  Square
} from 'lucide-react';

// --- 3D ANIMATED CHARACTER COMPONENT ---
function CharacterModel({ isTalking }: { isTalking: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Loads Idle.fbx from public/models/Idle.fbx
  const fbx = useFBX('/Idle.fbx');
  const { actions, names } = useAnimations(fbx.animations, groupRef);

  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current && isTalking) {
      // Natural responsive motion while audio explains the site
      groupRef.current.position.y = -1.6 + Math.sin(t * 3) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.6, 0]} scale={0.018}>
      <primitive object={fbx} dispose={null} />
    </group>
  );
}

// Fallback skeleton while 3D model loads
function SceneFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.6, 1.2, 0.6]} />
      <meshStandardMaterial color="#38bdf8" wireframe />
    </mesh>
  );
}

// --- MAIN PORTFOLIO COMPONENT ---
export default function Home() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const introScript = `
    Hello and welcome! I am Mounish B, a Master of Computer Applications student at PES University, specializing in Cloud Computing. 
    This portfolio was built with Next.js, Tailwind CSS, and Three.js. 
    Feel free to explore my projects like BorrowBox, a full-stack community rental platform built using React, TypeScript, Node.js, and PostgreSQL, 
    as well as my cloud engineering experience with Microsoft Azure and AWS. 
    You can also view and download my updated resume directly using the buttons on the screen.
  `;

  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(introScript);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0d14]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            MOUNISH B.
          </span>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Available for Cloud / SDE / DevOps Roles
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500 bg-clip-text text-transparent">
                Mounish B
              </span>
            </h1>
            
            <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-xl">
              Master of Computer Applications student at PES University, specializing in Cloud Computing[cite: 7]. Full-stack web developer experienced with React, TypeScript, Node.js, and modern cloud deployment environments[cite: 7].
            </p>

            {/* Voice Explanation Trigger */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleToggleVoice}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                  isPlayingAudio
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Square size={16} /> Stop Voice Introduction
                  </>
                ) : (
                  <>
                    <Volume2 size={16} /> Explain Portfolio (Audio Intro)
                  </>
                )}
              </button>
            </div>

            {/* Resume Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <FileText size={18} /> View Resume
              </a>

              <a
                href="/resume.pdf"
                download="Mounish_B_Resume.pdf"
                className="px-6 py-3 rounded-lg border border-cyan-500/60 text-cyan-400 font-semibold hover:bg-cyan-950/40 transition-all flex items-center gap-2"
              >
                <Download size={18} /> Download PDF
              </a>

              <a
                href="#projects"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:text-white transition-all"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* 3D Animated Developer Canvas */}
          <div className="h-[550px] w-full relative flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <Canvas camera={{ position: [0, 0.5, 3.2], fov: 45 }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[5, 10, 5]} intensity={2.0} castShadow />
              <pointLight position={[-3, 2, -2]} color="#38bdf8" intensity={1.5} />
              
              <Suspense fallback={<SceneFallback />}>
                <CharacterModel isTalking={isPlayingAudio} />
              </Suspense>
              
              <ContactShadows position={[0, -1.6, 0]} opacity={0.7} scale={6} blur={2.5} far={4} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
            </Canvas>
            <p className="absolute bottom-2 text-xs text-slate-500 pointer-events-none">
              Interactive 3D Animated Developer • Click & Drag to Orbit
            </p>
          </div>
        </div>
      </section>

      {/* 01. Professional Summary */}
      <section id="about" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">01.</span> Professional Summary
          </h2>
          <p className="text-slate-300 leading-relaxed text-base bg-slate-900/40 border border-slate-800 p-6 rounded-xl">
            Master of Computer Applications student at PES University, specializing in Cloud Computing, with a foundation in software development, full-stack web technologies, database management, and software testing[cite: 7]. Experienced in developing web applications using React, TypeScript, Node.js, and PostgreSQL[cite: 7]. Familiar with cloud computing and application security[cite: 7]. Seeking entry-level opportunities in Software Development, Cloud Engineering, or DevOps[cite: 7].
          </p>
        </div>
      </section>

      {/* 02. Technical Skills */}
      <section id="skills" className="py-20 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
            <span className="text-cyan-400">02.</span> Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-xl hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4 text-cyan-400">
                <Code size={22} />
                <h3 className="font-semibold text-white">Programming Languages</h3>
              </div>
              <p className="text-slate-400 text-sm">Java, Python, C, C++, JavaScript, TypeScript[cite: 7]</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-xl hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4 text-cyan-400">
                <Layers size={22} />
                <h3 className="font-semibold text-white">Frontend Development</h3>
              </div>
              <p className="text-slate-400 text-sm">React.js, Next.js, HTML, CSS[cite: 7]</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-xl hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4 text-cyan-400">
                <Database size={22} />
                <h3 className="font-semibold text-white">Backend & Databases</h3>
              </div>
              <p className="text-slate-400 text-sm">Node.js, PostgreSQL, SQL, Supabase, Prisma[cite: 7]</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-xl hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4 text-cyan-400">
                <Cloud size={22} />
                <h3 className="font-semibold text-white">Cloud & DevOps</h3>
              </div>
              <p className="text-slate-400 text-sm">Cloud Computing, Microsoft Azure, Azure CLI, Azure Container Registry, AWS Fundamentals, Docker[cite: 7]</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-xl hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4 text-cyan-400">
                <Award size={22} />
                <h3 className="font-semibold text-white">Tools & Testing</h3>
              </div>
              <p className="text-slate-400 text-sm">Git, GitHub, Manual Testing[cite: 7]</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-xl hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4 text-cyan-400">
                <Languages size={22} />
                <h3 className="font-semibold text-white">Languages Spoken</h3>
              </div>
              <p className="text-slate-400 text-sm">English, Kannada, Telugu, Hindi[cite: 7]</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Featured Projects */}
      <section id="projects" className="py-24 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
            <span className="text-cyan-400">03.</span> Featured Projects
          </h2>

          <div className="flex flex-col gap-10">
            {/* Project 1 */}
            <div className="bg-slate-900/70 border border-slate-800 p-8 rounded-2xl shadow-lg hover:border-slate-700 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <h3 className="text-2xl font-bold text-white">BORROWBOX — Community Borrowing and Sharing Platform[cite: 7]</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 self-start">
                  MCA Major Project (Individual)[cite: 7]
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Developed a full-stack community-based rental platform connecting item owners and renters, enabling access to cameras, gaming equipment, and event gear[cite: 7].
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2 mb-6">
                <li>Built an end-to-end marketplace featuring structured item listings, category-based search, rental requests, and user messaging[cite: 7].</li>
                <li>Engineered administrative dashboards, flexible rental pricing engines, and security deposit management[cite: 7].</li>
                <li>Integrated Razorpay payments and Google Maps location services[cite: 7].</li>
                <li>Built using React, TypeScript, Node.js, Express.js, PostgreSQL, Prisma ORM, Supabase, and Tailwind CSS[cite: 7].</li>
                <li>Enforced secure authentication pipelines utilizing JWT token handling, bcrypt password hashing, and payment verification checks[cite: 7].</li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 text-xs font-mono text-cyan-400">
                <span>React</span> • <span>TypeScript</span> • <span>Node.js</span> • <span>Express.js</span> • <span>PostgreSQL</span> • <span>Prisma ORM</span> • <span>Supabase</span> • <span>Tailwind CSS</span>[cite: 7]
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-slate-900/70 border border-slate-800 p-8 rounded-2xl shadow-lg hover:border-slate-700 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Online Quiz and Exam Platform[cite: 7]</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Developed a web-based examination platform for creating and administering timed digital evaluations[cite: 7].
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>Implemented dynamic question bank creation with support for multiple-choice questions, difficulty filters, and custom test rules[cite: 7].</li>
                <li>Built automated scheduling controls and session timers to manage test availability and submission windows[cite: 7].</li>
                <li>Created automated evaluation pipelines to process test submissions instantly with high scoring accuracy[cite: 7].</li>
                <li>Engineered candidate performance dashboards and detailed breakdown reports to facilitate post-exam review[cite: 7].</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="bg-slate-900/70 border border-slate-800 p-8 rounded-2xl shadow-lg hover:border-slate-700 transition-all">
              <h3 className="text-2xl font-bold text-white mb-3">Virtual Quiz Application[cite: 7]</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Designed and developed a responsive client-side quiz application focused on fast rendering and interactive question navigation[cite: 7].
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2 mb-6">
                <li>Designed a responsive, accessible user interface optimized for cross-device compatibility using HTML5 and CSS3[cite: 7].</li>
                <li>Implemented pure JavaScript state logic for seamless forward/back question navigation and state tracking[cite: 7].</li>
                <li>Integrated timed challenge countdowns that auto-submit answers upon interval expiration[cite: 7].</li>
                <li>Built client-side score computation algorithms with instant graphical score summaries and feedback[cite: 7].</li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 text-xs font-mono text-cyan-400">
                <span>HTML5</span> • <span>CSS3</span> • <span>JavaScript</span>[cite: 7]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Internship Experience */}
      <section id="experience" className="py-24 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
            <span className="text-cyan-400">04.</span> Internship Experience[cite: 7]
          </h2>
          
          <div className="flex flex-col gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-2xl font-semibold text-white">Cloud Computing Intern and Trainee[cite: 7]</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50 self-start">
                  InnoKnowvex Edutech Pvt. Ltd.[cite: 7]
                </span>
              </div>
              <p className="text-slate-400 text-xs mb-4">Cloud Architecture & Infrastructure Deployment[cite: 7]</p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2.5">
                <li>Mastered core cloud architectures and service models (IaaS, PaaS, SaaS), analyzing scalability, high availability, and trade-offs across deployment environments[cite: 7].</li>
                <li>Designed and deployed baseline infrastructure on AWS and Microsoft Azure, provisioning Virtual Machines, Virtual Networks (VPC/VNet), storage buckets, and IAM security policies[cite: 7].</li>
                <li>Configured Azure CLI workflows and container registries to facilitate automated cloud workload deployments[cite: 7].</li>
                <li>Received an official Letter of Recommendation from InnoKnowvex Edutech Pvt. Ltd.[cite: 7]</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-2xl font-semibold text-white">Manual Testing Intern[cite: 7]</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50 self-start">
                  JB Portals[cite: 7]
                </span>
              </div>
              <p className="text-slate-400 text-xs mb-4">Quality Assurance & Defect Management[cite: 7]</p>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2.5">
                <li>Performed manual and UI testing on a cross-platform music application, executing comprehensive functional and usability validation[cite: 7].</li>
                <li>Authored structured test scenarios, edge-case test cases, and functional acceptance checklists[cite: 7].</li>
                <li>Identified, logged, and tracked defects and regression issues to resolution in coordination with team developers[cite: 7].</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Education */}
      <section id="education" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
            <span className="text-cyan-400">05.</span> Education[cite: 7]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <GraduationCap size={20} />
                <span className="text-sm font-semibold">Expected July 2027[cite: 7]</span>
              </div>
              <h3 className="text-lg font-bold text-white">Master of Computer Applications (MCA)[cite: 7]</h3>
              <p className="text-slate-300 text-sm">PES University, Bengaluru, Karnataka[cite: 7]</p>
              <p className="text-cyan-400 text-xs mt-2">Currently Pursuing | Specialization: Cloud Computing[cite: 7]</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <GraduationCap size={20} />
                <span className="text-sm font-semibold">Sep 2022 – Aug 2025[cite: 7]</span>
              </div>
              <h3 className="text-lg font-bold text-white">Bachelor of Computer Applications (BCA)[cite: 7]</h3>
              <p className="text-slate-300 text-sm">Bengaluru City University, Bengaluru[cite: 7]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Get In Touch</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
            Seeking entry-level opportunities in Software Development, Cloud Engineering, or DevOps[cite: 7].
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 mb-10">
            <a href="mailto:mounishb825@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Mail size={16} /> mounishb825@gmail.com[cite: 7]
            </a>
            <a href="tel:+919148686979" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Phone size={16} /> +91-9148686979[cite: 7]
            </a>
            <span className="flex items-center gap-2 text-slate-400">
              <MapPin size={16} /> Bengaluru, India[cite: 7]
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/mounish-b-1397a629ok"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6Z" />
              </svg>
              LinkedIn Profile[cite: 7] <ExternalLink size={14} />
            </a>
          </div>

          <p className="mt-16 text-xs text-slate-600">
            © {new Date().getFullYear()} Mounish B. Built with Next.js, Tailwind CSS & Three.js.
          </p>
        </div>
      </footer>
    </div>
  );
}