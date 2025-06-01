import { useState, useEffect, memo } from 'react';
import ParticulasFondo from './components/ParticulasFondo';
import './App.css';

// Memoizar el componente de partículas para evitar re-renderizados innecesarios
const ParticulasFondoMemo = memo(ParticulasFondo);

function App() {
  const [menuContactoAbierto, setMenuContactoAbierto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const contactos = [
    { 
      nombre: 'Gmail', 
      valor: 'om1779468@gmail.com', 
      icono: '📧', 
      link: 'mailto:om1779468@gmail.com' 
    },
    { 
      nombre: 'LinkedIn', 
      valor: '/osmar-martinez', 
      icono: '💼', 
      link: 'https://www.linkedin.com/in/osmar-martinez-7b5472212/' 
    },
    { 
      nombre: 'GitHub', 
      valor: '/VarDevCoder', 
      icono: '🐱', 
      link: 'https://github.com/VarDevCoder' 
    },
    { 
      nombre: 'WhatsApp', 
      valor: '+595981984141', 
      icono: '📱', 
      link: 'https://wa.me/+595984984141' 
    }
  ];

  return (
    <>
      <div className="relative font-sans text-white min-h-screen">
        <ParticulasFondoMemo />

        {/* HEADER CON NOMBRE Y CONTACTO */}
        <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 md:p-6">
          {/* NOMBRE ARRIBA A LA IZQUIERDA - AHORA ENLAZA A LINKEDIN */}
          <div>
            <a href="https://www.linkedin.com/in/osmar-martinez-7b5472212/" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors bg-yellow-400/20 hover:bg-yellow-400/30 px-4 py-2 rounded-lg border border-yellow-400/50">
              Osmar Martinez
            </a>
          </div>

          {/* MENÚ CONTACTO A LA DERECHA */}
          <div className="relative">
            <button
              onClick={() => setMenuContactoAbierto(!menuContactoAbierto)}
              className="bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/50 text-yellow-400 px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-sm md:text-base">Contactos</span>
              <span className={`transform transition-transform duration-200 ${menuContactoAbierto ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {/* DROPDOWN MENU */}
            {menuContactoAbierto && (
              <div className="absolute top-full right-0 mt-2 w-64 md:w-72 bg-black/90 backdrop-blur-sm border border-yellow-400/30 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4">
                  <h3 className="text-yellow-400 font-semibold mb-3 text-sm md:text-base">¡Conectemos!</h3>
                  <div className="space-y-3">
                    {contactos.map((contacto, index) => (
                      <a
                        key={index}
                        href={contacto.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 rounded-md hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg group-hover:scale-110 transition-transform">
                            {contacto.icono}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-purple-300 font-medium text-sm">
                              {contacto.nombre}
                            </div>
                            <div className="text-gray-300 text-xs truncate">
                              {contacto.valor}
                            </div>
                          </div>
                          <span className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                            →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Overlay para cerrar menú en móvil */}
        {menuContactoAbierto && (
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setMenuContactoAbierto(false)}
          />
        )}

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
          <div className="bg-yellow-400/20 border border-yellow-400/50 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-yellow-400">
              Bienvenido
            </h1>
            <p className="text-lg md:text-xl text-white mb-6 max-w-2xl">
              Puedes calificar los proyectos en los que he trabajado ✌️😁
            </p>
            {/* BOTONES LADO A LADO */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#sobremi"
                className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg transition-all hover:scale-105"
              >
                Sobre mí
              </a>
              <a
                href="#proyectos"
                className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg transition-all hover:scale-105"
              >
                Ver proyectos
              </a>
            </div>
          </div>
        </section>

        {/* SOBRE MI */}
        <section
          id="sobremi"
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 text-white py-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10">
              Sobre Mí
            </h2>
            
            <div className="bg-black/50 border border-yellow-400/30 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p className="text-white">
                  Siempre en constante actualización con <span className="text-yellow-400 font-semibold">tecnologías modernas</span>. 
                  Actualmente estoy finalizando la carrera de <span className="text-purple-600 font-semibold">Análisis de Sistemas</span>, 
                  con el objetivo de continuar con Ingeniería en Sistemas y, más adelante, explorar otras ramas de la ingeniería.
                </p>
                
                <p className="text-white">
                  Me apasionan los <span className="text-yellow-400 font-semibold">proyectos desafiantes</span> que me permitan 
                  aprender, crecer y aportar valor real. Siempre predispuesto a sumar con 
                  <span className="text-purple-600 font-semibold"> actitud, compromiso y ganas de superarme</span>.
                </p>
                
                <p className="text-gray-300 text-base md:text-lg italic">
                  Si querés conocer más sobre mí, podés contactarme directamente — con gusto responderé cualquier consulta sin problema.
                </p>
              </div>
              
              <div className="mt-8">
                <a
                  href="#proyectos"
                  className="inline-block bg-black text-white border-2 border-yellow-300 hover:bg-yellow-300 font-bold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg transition-all hover:scale-105 hover:text-black"
                >
                  Ver mis proyectos →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section
          id="proyectos"
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 text-white py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10 text-center">
            Mis Proyectos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
            {/* Tarjetas de Proyectos */}
                {/* Card 1 */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300 hover:bg-white/15">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">Portfolio para Profesionales</h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                Portfolio para Profesionales.
                </p>
                <div className="flex justify-center">
                <a
                href="https://magalimelgarejoportfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-all"
                >
                Ver demo
                </a>
                </div>
                </div>
                {/* Card 2 */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300 hover:bg-white/15">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">Chatbot</h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                Chatbot de Whatsapp.
                </p>
                <div className="flex justify-center">
                 <a
                 href="https://magalimelgarejoportfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-all"
                >
                Ver demo
                </a>
                </div>
                </div>
                {/* Card 3 */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300 hover:bg-white/15">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">Tienda</h3>
                 <p className="text-gray-300 mb-4 text-sm md:text-base">
                   Portfolio para Profesionales.
                </p>
                  <div className="flex justify-center">
                  <a
                  href="https://magalimelgarejoportfolio.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-all"
                  >
                  Ver demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 text-center py-8 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 text-sm mb-2">
              © 2025 Osmar Martinez. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm mb-2">
              El fondo esta construido con HTML Canvas Element y React Hooks.
            </p>
            <p className="text-gray-500 text-xs">
              Tecnologias: React + TypeScript + Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;