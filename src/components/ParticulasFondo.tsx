import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  imageIndex: number;
  maxcap: number;
  fading?: boolean;
}

interface ParticulasFondoProps {
  images?: string[];
  particleCount?: number;
  connectionDistance?: number;
  showConnections?: boolean;
  speed?: number;
}

const ParticulasFondo = ({ 
  images = [
    '/react.svg',
    '/nestjs.svg',
    '/postgres.png',
    '/type.svg',
    '/js.svg',
    '/python.svg',
    '/twcss.svg',
    '/nodejs.svg',
    '/netbeans.svg',
    '/java.svg',   
  ],
  particleCount = 12,
  connectionDistance = 250,
  showConnections = true,
  speed = 0.3
}: ParticulasFondoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const loadedImages = useRef<HTMLImageElement[]>([]);
  const isMobileRef = useRef<boolean>(false);

  // Detectar móvil con useCallback para evitar re-renders
  const checkMobile = useCallback(() => {
    const newIsMobile = window.innerWidth < 768;
    if (isMobileRef.current !== newIsMobile) {
      isMobileRef.current = newIsMobile;
    }
  }, []);

  useEffect(() => {
    checkMobile();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Event listeners para resize
    const handleResize = () => {
      resizeCanvas();
      checkMobile();
    };

    window.addEventListener('resize', handleResize);

    // Cargar imágenes
    const loadImages = async () => {
      const imagePromises = images.map((src, index) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn(`Error loading image ${index}: ${src}`);
            // Crear imagen de respaldo (círculo simple)
            const fallbackCanvas = document.createElement('canvas');
            fallbackCanvas.width = 24;
            fallbackCanvas.height = 24;
            const fallbackCtx = fallbackCanvas.getContext('2d');
            if (fallbackCtx) {
              fallbackCtx.fillStyle = '#9333ea';
              fallbackCtx.beginPath();
              fallbackCtx.arc(12, 12, 10, 0, Math.PI * 2);
              fallbackCtx.fill();
            }
            const fallbackImg = new Image();
            fallbackImg.src = fallbackCanvas.toDataURL();
            resolve(fallbackImg);
          };
          img.src = src;
        });
      });

      try {
        loadedImages.current = await Promise.all(imagePromises);
        createParticles();
        animate();
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    // Crear partículas (ajustado para móvil)
    const createParticles = () => {
      const particles: Particle[] = [];
      // Reducir partículas en móvil
      const mobileCount = isMobileRef.current ? Math.floor(particleCount * 0.6) : particleCount;
      const actualCount = Math.min(mobileCount, Math.floor((canvas.width * canvas.height) / 15000));

      for (let i = 0; i < actualCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 20 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.25) * 0.02,
          imageIndex: Math.floor(Math.random() * loadedImages.current.length),
          maxcap: 1
        });
      }
      
      particlesRef.current = particles;
    };

    // Animar partículas (optimizado para móvil)
    let lastTime = 0;
    
    const animate = (currentTime = 0) => {
      // Controlar FPS dinámicamente
      const targetFPS = isMobileRef.current ? 30 : 60;
      const frameDelay = 1000 / targetFPS;

      if (currentTime - lastTime < frameDelay) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      // Limpiar canvas con fondo
      ctx.fillStyle = '#090014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Dibujar líneas de conexión si están habilitadas
      if (showConnections && particles.length > 0) {
        ctx.strokeStyle = 'rgba(0, 155, 26)';
        ctx.lineWidth = 2;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.3;
              ctx.globalAlpha = opacity;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      // Dibujar y actualizar partículas
      particles.forEach((particle: Particle) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Rebote en bordes con margen
        const margin = particle.size / 2;
        if (particle.x <= margin || particle.x >= canvas.width - margin) {
          particle.vx *= -1;
          particle.x = Math.max(margin, Math.min(canvas.width - margin, particle.x));
        }
        if (particle.y <= margin || particle.y >= canvas.height - margin) {
          particle.vy *= -1;
          particle.y = Math.max(margin, Math.min(canvas.height - margin, particle.y));
        }

        // Dibujar imagen
        const img = loadedImages.current[particle.imageIndex];
        if (img && img.complete) {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.globalAlpha = particle.maxcap;
          ctx.drawImage(
            img, 
            -particle.size / 2, 
            -particle.size / 2, 
            particle.size, 
            particle.size
          );
          ctx.restore();
        }
      });

      // Fadear solo las partículas extras (las más antiguas)
      if (particles.length > 40) {
        const exceso = particles.length - 40;

        for (let i = 0; i < exceso; i++) {
          const p = particles[i];
          if (!p.fading) {
            p.fading = true;
          }
        }
      }

      particlesRef.current = particles.filter(particle => {
        if (particle.fading) {
          particle.maxcap -= 0.01;
          if (particle.maxcap <= 0) return false;
        }
        return true;
      });

      // Iniciar la siguiente animación
      animationRef.current = requestAnimationFrame(animate);
    };

    // Interactividad con mouse (reducida en móvil)
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      particlesRef.current.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const interactionDistance = isMobileRef.current ? 60 : 80;
        const forceMultiplier = isMobileRef.current ? 0.0004 : 0.0008;

        if (distance < interactionDistance) {
          const force = (interactionDistance - distance) / interactionDistance;
          particle.vx += (dx / distance) * force * forceMultiplier;
          particle.vy += (dy / distance) * force * forceMultiplier;
          
          // Acelerar rotación cerca del mouse
          particle.rotationSpeed += force * (isMobileRef.current ? 0.00005 : 0.0001);
        }
      });
    };

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Agregar menos partículas en móvil
      const clickParticles = isMobileRef.current ? 1 : 1;
      
      let i = 0;
      while (i < clickParticles) {
        particlesRef.current.push({
          x: mouseX + (Math.random() - 0.5) * 40,
          y: mouseY + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * speed * 2,
          vy: (Math.random() - 0.5) * speed * 2,
          size: Math.random() * 15 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          imageIndex: Math.floor(Math.random() * loadedImages.current.length),
          maxcap: 1
        });

        i++;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    // Iniciar carga de imágenes
    loadImages();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [images, particleCount, connectionDistance, showConnections, speed, checkMobile]);
  // Removido isMobile de las dependencias

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticulasFondo;