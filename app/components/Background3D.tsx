import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Icosahedron, TorusKnot, Torus, Float, MeshReflectorMaterial, Text, Line } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// 1. Advanced Particle Universe with Dynamic Colors & Twinkling
// ------------------------------------------------------------------
function ParticleUniverse() {
  const ref = useRef<any>(null);
  const count = 15000;
  const radius = 4.5;

  // Create positions and colors for stars
  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical distribution with some randomness in radius
      const r = radius * Math.pow(Math.random(), 1.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Color: cyan, purple, white, blue tint
      const colorChoice = Math.random();
      let rCol, gCol, bCol;
      if (colorChoice < 0.6) {
        // Cyan / Blue
        rCol = 0.0 + Math.random() * 0.3;
        gCol = 0.5 + Math.random() * 0.5;
        bCol = 0.8 + Math.random() * 0.2;
      } else if (colorChoice < 0.9) {
        // Purple
        rCol = 0.6 + Math.random() * 0.4;
        gCol = 0.2 + Math.random() * 0.3;
        bCol = 0.8 + Math.random() * 0.2;
      } else {
        // White
        rCol = 0.9 + Math.random() * 0.1;
        gCol = 0.9 + Math.random() * 0.1;
        bCol = 0.9 + Math.random() * 0.1;
      }
      colors[i * 3] = rCol;
      colors[i * 3 + 1] = gCol;
      colors[i * 3 + 2] = bCol;
    }
    return { positions, colors };
  }, []);

  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Twinkling animation data
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // GSAP Scroll Animation for the entire starfield
    if (ref.current) {
      gsap.to(ref.current.rotation, {
        y: Math.PI * 1.5,
        x: Math.PI / 3,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    timeRef.current += delta * 0.5;

    // Gentle continuous rotation
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.01;

    // Parallax based on mouse
    const targetRotX = mouse.y * 0.2;
    const targetRotY = mouse.x * 0.2;
    ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (targetRotY - ref.current.rotation.y) * 0.05;
  });

  return (
    <group ref={ref}>
      <Points positions={particlesGeometry.positions} colors={particlesGeometry.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// ------------------------------------------------------------------
// 2. Custom "G" Shape made of Torus + Cylinder for a futuristic look
// ------------------------------------------------------------------
function GShape({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Animate based on scroll progress
  useEffect(() => {
    if (groupRef.current) {
      // Rotation and scaling based on scroll
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      gsap.to(groupRef.current.position, {
        y: 0.5,
        z: -0.8,
        duration: 1,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        }
      });
    }

    if (materialRef.current) {
      gsap.to(materialRef.current.color, {
        r: 0.8,
        g: 0.3,
        b: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (innerRingRef.current) {
      // Subtle pulsation
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.03;
      innerRingRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
      {/* Main outer ring - the circular part of G */}
      <Torus args={[0.9, 0.08, 64, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial ref={materialRef} color="#a855f7" metalness={0.85} roughness={0.2} emissive="#3b0764" emissiveIntensity={0.6} />
      </Torus>

      {/* Second smaller ring inside for detail */}
      <Torus args={[0.65, 0.05, 64, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#00e5ff" metalness={0.9} roughness={0.1} emissive="#00e5ff" emissiveIntensity={0.3} />
      </Torus>

      {/* Horizontal bar of G */}
      <mesh position={[0.6, -0.4, 0.1]} scale={[1.2, 0.15, 0.15]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#c084fc" metalness={0.8} roughness={0.2} emissive="#4c1d95" emissiveIntensity={0.4} />
      </mesh>

      {/* Vertical end cap to make G distinct */}
      <mesh position={[1.1, -0.7, 0.1]} scale={[0.2, 0.6, 0.15]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#a855f7" metalness={0.8} roughness={0.3} emissive="#4c1d95" emissiveIntensity={0.3} />
      </mesh>

      {/* Inner glowing ring */}
      <mesh ref={innerRingRef} position={[0, 0, 0.05]}>
        <torusGeometry args={[0.78, 0.03, 64, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Small floating particles around G */}
      <Points positions={new Float32Array(300 * 3).map(() => (Math.random() - 0.5) * 2.5)}>
        <PointMaterial color="#00e5ff" size={0.02} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

// ------------------------------------------------------------------
// 3. Orbiting Rings and Swirling Particles around G
// ------------------------------------------------------------------
function OrbitingRings() {
  const ringRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<any>(null);

  const particleCount = 800;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      const yOff = (Math.random() - 0.5) * 0.8;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = yOff;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      <group ref={ringRef}>
        <Torus args={[1.3, 0.04, 64, 200]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ff6ac6" emissive="#ff2a9a" emissiveIntensity={0.5} metalness={0.7} />
        </Torus>
        <Torus args={[1.5, 0.02, 64, 200]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#00e5ff" emissive="#00aaff" emissiveIntensity={0.4} metalness={0.8} />
        </Torus>
      </group>

      <Points ref={particlesRef} positions={particlePositions}>
        <PointMaterial color="#a855f7" size={0.025} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

// ------------------------------------------------------------------
// 4. Advanced Floating Shapes with Complex Animations
// ------------------------------------------------------------------
function AdvancedFloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const shapes = useRef<Array<{ mesh: THREE.Mesh; speed: number; axis: 'x' | 'y' | 'z' }>>([]);

  useEffect(() => {
    if (groupRef.current) {
      // GSAP scroll-driven position animation
      gsap.to(groupRef.current.position, {
        y: -0.5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      gsap.to(groupRef.current.rotation, {
        y: Math.PI,
        x: Math.PI / 4,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Individual floating animations
    groupRef.current.children.forEach((child, idx) => {
      if ((child as any).isMesh) {
        child.position.y += Math.sin(t * 1.5 + idx) * 0.003;
        child.rotation.x += 0.01;
        child.rotation.z += 0.008;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.5, -2]}>
      {/* Crystalline Icosahedron */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} position={[-1.8, 0, 0]}>
        <Icosahedron args={[0.5, 0]}>
          <meshPhysicalMaterial color="#ff6ac6" metalness={0.9} roughness={0.2} transparent opacity={0.7} emissive="#ff2a9a" emissiveIntensity={0.3} />
        </Icosahedron>
      </Float>

      {/* Complex TorusKnot with color shift */}
      <Float speed={1.2} rotationIntensity={2} floatIntensity={2} position={[1.5, -0.3, -0.5]}>
        <TorusKnot args={[0.45, 0.08, 180, 24, 3, 4]}>
          <meshStandardMaterial color="#00e5ff" metalness={0.7} roughness={0.3} emissive="#0077ff" emissiveIntensity={0.5} />
        </TorusKnot>
      </Float>

      {/* Small glowing tetrahedron */}
      <Float speed={3} rotationIntensity={3} floatIntensity={1} position={[-0.5, -1, -1]}>
        <mesh>
          <tetrahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#a855f7" roughness={0.1} metalness={0.9} emissive="#4c1d95" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      {/* Glowing ring particle stream */}
      <group position={[0.2, 0.8, -1]}>
        <Torus args={[0.6, 0.03, 64, 100]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </Torus>
      </group>
    </group>
  );
}

// ------------------------------------------------------------------
// 5. Main Background Component
// ------------------------------------------------------------------
export default function Background3D() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Track scroll progress for additional reactive animations
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, #0a0a2a 0%, #020210 100%)' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 65 }} shadows>
        {/* Enhanced Lighting System */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-3, 2, -4]} intensity={0.8} color="#a855f7" />
        <pointLight position={[1, 1, 2]} intensity={0.5} color="#00e5ff" distance={5} />
        <pointLight position={[-1, -1, 1]} intensity={0.4} color="#ff6ac6" distance={4} />

        {/* Main Content */}
        <ParticleUniverse />
        <GShape scrollProgress={scrollProgress} />
        <OrbitingRings />
        <AdvancedFloatingShapes />

        {/* Additional glowing orbs in background */}
        <Float speed={0.8} rotationIntensity={0} floatIntensity={1.5} position={[2.5, -1, -3]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
          </mesh>
        </Float>
        <Float speed={1.2} rotationIntensity={0} floatIntensity={1} position={[-2, 1, -4]}>
          <mesh>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
          </mesh>
        </Float>

        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#020210', 5, 12]} />
      </Canvas>
      {/* Dark semi-transparent overlay to ensure foreground text remains perfectly readable */}
      <div className="absolute inset-0 bg-gray-950/70 z-10 pointer-events-none"></div>
    </div>
  );
}