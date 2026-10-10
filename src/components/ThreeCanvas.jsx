import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    
    // Light fog matching the page background #F8FAFF
    scene.fog = new THREE.FogExp2(0xf8faff, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Left Point Light (Purple #9FA1FF)
    const purpleLight = new THREE.PointLight(0x9fa1ff, 3.5, 30);
    purpleLight.position.set(-6, 4, 4);
    scene.add(purpleLight);

    // Right Point Light (Sky Blue #AEE2FF)
    const skyLight = new THREE.PointLight(0xaee2ff, 3.5, 30);
    skyLight.position.set(6, -4, 4);
    scene.add(skyLight);

    // Soft Directional Light for shape definition
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // --- CENTRAL NEXUS GEOMETRY ---
    // Glass Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transmission: 0.6, // Glass transparency
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Outer wireframe glowing grid
    const wireGeo = new THREE.IcosahedronGeometry(2.25, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x9fa1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Interactive ring (Torus)
    const ringGeo = new THREE.TorusGeometry(3.1, 0.04, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xb5baff,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.4;
    scene.add(ringMesh);

    // --- DRIFTING SHAPES ---
    const driftGroup = new THREE.Group();
    scene.add(driftGroup);

    const shapesData = [
      { geo: new THREE.TorusGeometry(0.4, 0.12, 8, 32), color: 0xaee2ff, pos: [-4.2, 3.2, -2], speed: 0.01 },
      { geo: new THREE.OctahedronGeometry(0.35, 0), color: 0xd9f9df, pos: [4.4, 2.2, -3], speed: 0.015 },
      { geo: new THREE.ConeGeometry(0.25, 0.5, 4), color: 0x9fa1ff, pos: [-3.8, -2.4, -1.5], speed: 0.008 },
      { geo: new THREE.BoxGeometry(0.35, 0.35, 0.35), color: 0xb5baff, pos: [3.9, -2.9, -2], speed: 0.012 },
    ];

    const driftMeshes = [];
    shapesData.forEach((data) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: data.color,
        roughness: 0.1,
        transmission: 0.4,
        thickness: 0.5,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(data.geo, mat);
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      driftGroup.add(mesh);
      driftMeshes.push(mesh);
    });

    // --- FLOATING STAR PARTICLES ---
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorChoices = [
      new THREE.Color(0x9fa1ff), // purple
      new THREE.Color(0xb5baff), // lavender
      new THREE.Color(0xaee2ff), // sky
      new THREE.Color(0xd9f9df), // mint
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const randomColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for subtle round particles
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 16;
    canvasTexture.height = 16;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(159, 161, 255, 0.9)');
      grad.addColorStop(0.4, 'rgba(174, 226, 255, 0.5)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvasTexture);

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const starfield = new THREE.Points(particleGeo, particleMat);
    scene.add(starfield);

    // --- MOUSE TRACKING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- RESIZE OBSERVER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Spin nodes
      coreMesh.rotation.y = elapsedTime * 0.1;
      coreMesh.rotation.x = elapsedTime * 0.06;

      wireMesh.rotation.y = -elapsedTime * 0.14;
      wireMesh.rotation.x = -elapsedTime * 0.08;

      ringMesh.rotation.z = elapsedTime * 0.1;

      // Parallax shifts
      coreMesh.position.x = mouse.x * 0.35;
      coreMesh.position.y = mouse.y * 0.35;
      
      wireMesh.position.x = mouse.x * 0.35;
      wireMesh.position.y = mouse.y * 0.35;
      
      ringMesh.position.x = mouse.x * 0.25;
      ringMesh.position.y = mouse.y * 0.25;

      driftGroup.rotation.y = elapsedTime * 0.04;
      
      driftMeshes.forEach((mesh, index) => {
        const offset = index * 12;
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.005;
        mesh.position.y += Math.sin(elapsedTime * 0.7 + offset) * 0.002;
      });

      starfield.rotation.y = elapsedTime * 0.015;
      starfield.rotation.x = elapsedTime * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      
      shapesData.forEach((data) => data.geo.dispose());
      driftMeshes.forEach((mesh) => {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      particleGeo.dispose();
      particleMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0" id="three-canvas-container">
      <canvas ref={canvasRef} className="w-full h-full block" id="three-webgl-canvas" />
    </div>
  );
}
