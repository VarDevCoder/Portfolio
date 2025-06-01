
const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="/ruta/a/tu-imagen.jpg" // reemplazá esto por tu ruta
        alt="Fondo de código"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Capa oscura encima para contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Contenido central */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-rubik">
          <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Explora mis proyectos y habilidades.
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
