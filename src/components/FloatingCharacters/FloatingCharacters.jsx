import React, { useEffect, useRef } from 'react';
import './FloatingCharacters.css';

// Architecture & BIM vector shape drawing functions
const drawShapes = {
  // Floor plan: small room layout with door opening
  floorPlan: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    // Room walls
    ctx.moveTo(-s, -s);
    ctx.lineTo(s, -s);
    ctx.lineTo(s, s);
    ctx.lineTo(-s * 0.3, s);
    // Door gap
    ctx.moveTo(-s * 0.7, s);
    ctx.lineTo(-s, s);
    ctx.lineTo(-s, -s);
    ctx.stroke();
    // Interior wall partition
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s * 0.3);
    ctx.stroke();
    ctx.setLineDash([]);
  },

  // Door swing arc (plan symbol)
  doorSwing: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    ctx.moveTo(-s, s);
    ctx.lineTo(-s, s - s * 0.12);
    ctx.lineTo(-s + s * 0.12, s);
    ctx.closePath();
    ctx.stroke();
    // Door leaf
    ctx.beginPath();
    ctx.moveTo(-s, s);
    ctx.lineTo(-s, -s * 0.2);
    ctx.stroke();
    // Swing arc
    ctx.beginPath();
    ctx.arc(-s, s, s * 1.2, -Math.PI / 2, 0);
    ctx.stroke();
  },

  // Window symbol (plan view — double line with breaks)
  windowSymbol: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    // Wall line top
    ctx.moveTo(-s, -s * 0.15);
    ctx.lineTo(s, -s * 0.15);
    // Wall line bottom
    ctx.moveTo(-s, s * 0.15);
    ctx.lineTo(s, s * 0.15);
    ctx.stroke();
    // Glass pane lines
    ctx.beginPath();
    ctx.moveTo(-s * 0.7, -s * 0.15);
    ctx.lineTo(-s * 0.7, s * 0.15);
    ctx.moveTo(s * 0.7, -s * 0.15);
    ctx.lineTo(s * 0.7, s * 0.15);
    // Diagonal glazing marks
    ctx.moveTo(-s * 0.7, -s * 0.15);
    ctx.lineTo(s * 0.7, s * 0.15);
    ctx.stroke();
  },

  // Staircase (section)
  staircase: (ctx, size) => {
    const s = size;
    const steps = 5;
    const stepW = (s * 2) / steps;
    const stepH = (s * 1.6) / steps;
    ctx.beginPath();
    for (let i = 0; i < steps; i++) {
      const x = -s + i * stepW;
      const y = s - i * stepH;
      ctx.moveTo(x, y);
      ctx.lineTo(x + stepW, y);
      ctx.lineTo(x + stepW, y - stepH);
    }
    ctx.stroke();
    // Arrow going up
    ctx.beginPath();
    ctx.moveTo(-s * 0.6, s * 0.6);
    ctx.lineTo(s * 0.4, -s * 0.6);
    ctx.moveTo(s * 0.2, -s * 0.8);
    ctx.lineTo(s * 0.4, -s * 0.6);
    ctx.lineTo(s * 0.1, -s * 0.5);
    ctx.stroke();
  },

  // I-Beam cross-section
  iBeam: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    // Top flange
    ctx.moveTo(-s, -s);
    ctx.lineTo(s, -s);
    // Web
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s);
    // Bottom flange
    ctx.moveTo(-s, s);
    ctx.lineTo(s, s);
    ctx.stroke();
    // Flange thickness
    ctx.beginPath();
    ctx.moveTo(-s, -s * 0.8);
    ctx.lineTo(-s * 0.2, -s * 0.8);
    ctx.lineTo(-s * 0.2, -s);
    ctx.moveTo(s, -s * 0.8);
    ctx.lineTo(s * 0.2, -s * 0.8);
    ctx.lineTo(s * 0.2, -s);
    ctx.moveTo(-s, s * 0.8);
    ctx.lineTo(-s * 0.2, s * 0.8);
    ctx.lineTo(-s * 0.2, s);
    ctx.moveTo(s, s * 0.8);
    ctx.lineTo(s * 0.2, s * 0.8);
    ctx.lineTo(s * 0.2, s);
    ctx.stroke();
  },

  // Column grid axis marker (circle with crosshair + label line)
  gridAxis: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    ctx.arc(0, -s * 0.4, s * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    // Vertical grid line
    ctx.beginPath();
    ctx.moveTo(0, s * 0.1);
    ctx.lineTo(0, s);
    ctx.stroke();
    // Cross inside circle
    ctx.beginPath();
    ctx.moveTo(-s * 0.2, -s * 0.4);
    ctx.lineTo(s * 0.2, -s * 0.4);
    ctx.moveTo(0, -s * 0.6);
    ctx.lineTo(0, -s * 0.2);
    ctx.stroke();
  },

  // Isometric cube (BIM 3D model hint)
  isoCube: (ctx, size) => {
    const s = size * 0.8;
    ctx.beginPath();
    // Front face
    ctx.moveTo(0, -s);
    ctx.lineTo(s, -s * 0.4);
    ctx.lineTo(s, s * 0.4);
    ctx.lineTo(0, s);
    // Back left face
    ctx.moveTo(0, -s);
    ctx.lineTo(-s, -s * 0.4);
    ctx.lineTo(-s, s * 0.4);
    ctx.lineTo(0, s);
    // Top connector
    ctx.moveTo(-s, -s * 0.4);
    ctx.lineTo(0, -s);
    ctx.lineTo(s, -s * 0.4);
    // Bottom mid line
    ctx.moveTo(0, s);
    ctx.lineTo(0, s * 0.2);
    ctx.stroke();
    // Dashed hidden edges
    ctx.beginPath();
    ctx.setLineDash([2, 3]);
    ctx.moveTo(-s, s * 0.4);
    ctx.lineTo(0, s);
    ctx.lineTo(s, s * 0.4);
    ctx.stroke();
    ctx.setLineDash([]);
  },

  // Dimension line with ticks
  dimensionLine: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    // Main line
    ctx.moveTo(-s, 0);
    ctx.lineTo(s, 0);
    // End ticks
    ctx.moveTo(-s, -s * 0.35);
    ctx.lineTo(-s, s * 0.35);
    ctx.moveTo(s, -s * 0.35);
    ctx.lineTo(s, s * 0.35);
    ctx.stroke();
    // Extension lines (dashed)
    ctx.beginPath();
    ctx.setLineDash([2, 2]);
    ctx.moveTo(-s, s * 0.35);
    ctx.lineTo(-s, s);
    ctx.moveTo(s, s * 0.35);
    ctx.lineTo(s, s);
    ctx.stroke();
    ctx.setLineDash([]);
    // Arrows
    ctx.beginPath();
    ctx.moveTo(-s + 5, -2);
    ctx.lineTo(-s, 0);
    ctx.lineTo(-s + 5, 2);
    ctx.moveTo(s - 5, -2);
    ctx.lineTo(s, 0);
    ctx.lineTo(s - 5, 2);
    ctx.stroke();
  },

  // Roof truss
  roofTruss: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    // Triangle frame
    ctx.moveTo(-s, s * 0.5);
    ctx.lineTo(0, -s);
    ctx.lineTo(s, s * 0.5);
    ctx.closePath();
    ctx.stroke();
    // Internal bracing
    ctx.beginPath();
    ctx.moveTo(-s * 0.5, 0);
    ctx.lineTo(0, s * 0.5);
    ctx.lineTo(s * 0.5, 0);
    ctx.stroke();
    // King post
    ctx.beginPath();
    ctx.setLineDash([2, 2]);
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s * 0.5);
    ctx.stroke();
    ctx.setLineDash([]);
  },

  // Section cut symbol (circle with arrows)
  sectionCut: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    // Cut line
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(0, -s * 0.45);
    ctx.moveTo(0, s * 0.45);
    ctx.lineTo(0, s);
    ctx.stroke();
    // Direction arrows
    ctx.beginPath();
    ctx.moveTo(-s * 0.3, -s * 0.85);
    ctx.lineTo(0, -s);
    ctx.lineTo(s * 0.3, -s * 0.85);
    ctx.moveTo(-s * 0.3, s * 0.85);
    ctx.lineTo(0, s);
    ctx.lineTo(s * 0.3, s * 0.85);
    ctx.stroke();
  },

  // North arrow / compass
  northArrow: (ctx, size) => {
    const s = size;
    ctx.beginPath();
    // Arrow shaft
    ctx.moveTo(0, s);
    ctx.lineTo(0, -s);
    // Arrow head
    ctx.moveTo(-s * 0.3, -s * 0.5);
    ctx.lineTo(0, -s);
    ctx.lineTo(s * 0.3, -s * 0.5);
    ctx.stroke();
    // Filled half
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.3, -s * 0.5);
    ctx.lineTo(0, -s * 0.3);
    ctx.closePath();
    ctx.stroke();
    // Circle at base
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
    ctx.stroke();
  },

  // Level datum marker
  levelMarker: (ctx, size) => {
    const s = size;
    // Triangle marker
    ctx.beginPath();
    ctx.moveTo(-s * 0.4, 0);
    ctx.lineTo(0, -s * 0.4);
    ctx.lineTo(s * 0.4, 0);
    ctx.closePath();
    ctx.stroke();
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.lineTo(s, 0);
    ctx.stroke();
    // Dashed below
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(-s * 0.8, s * 0.5);
    ctx.lineTo(s * 0.8, s * 0.5);
    ctx.stroke();
    ctx.setLineDash([]);
  },
};

const shapeKeys = Object.keys(drawShapes);

class Particle {
  constructor(canvasW, canvasH) {
    this.x = Math.random() * canvasW;
    this.y = Math.random() * canvasH;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = 8 + Math.random() * 14;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.008;
    this.shape = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    this.phase = Math.random() * Math.PI * 2;        // phase offset for swimming
    this.swimSpeed = 0.2 + Math.random() * 0.4;      // individual swim frequency
    this.swimAmplitude = 0.15 + Math.random() * 0.25; // how much they sway
    // Use portfolio palette colors
    const colors = [
      'rgba(184, 134, 11, 0.35)',  // gold accent
      'rgba(184, 134, 11, 0.25)',  // gold lighter
      'rgba(107, 101, 96, 0.3)',   // warm grey
      'rgba(107, 101, 96, 0.2)',   // warm grey lighter
      'rgba(155, 149, 144, 0.25)', // tertiary text
      'rgba(42, 42, 40, 0.2)',     // dark
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.lineWidth = 0.8 + Math.random() * 1.2;
  }

  update(mouseX, mouseY, canvasW, canvasH, time) {
    // Swim motion: sinusoidal wave offset
    const swimX = Math.sin(time * this.swimSpeed + this.phase) * this.swimAmplitude;
    const swimY = Math.cos(time * this.swimSpeed * 0.7 + this.phase) * this.swimAmplitude;

    // Attraction toward mouse — gentle pull
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const attractRadius = 350;
    const orbitRadius = 80 + this.size * 3;

    if (dist < attractRadius && dist > 0) {
      const force = (attractRadius - dist) / attractRadius;
      if (dist > orbitRadius) {
        // Pull toward cursor
        this.vx += (dx / dist) * force * 0.06;
        this.vy += (dy / dist) * force * 0.06;
      } else {
        // Orbit around cursor — apply tangential force
        const tangentX = -dy / dist;
        const tangentY = dx / dist;
        this.vx += tangentX * force * 0.12;
        this.vy += tangentY * force * 0.12;
        // Gentle push away so they don't collapse onto cursor
        this.vx -= (dx / dist) * force * 0.02;
        this.vy -= (dy / dist) * force * 0.02;
      }
    }

    // Add swimming motion
    this.vx += swimX * 0.02;
    this.vy += swimY * 0.02;

    // Damping for smooth, fluid motion
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Speed cap
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed = 1.5;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Rotation follows movement direction blended with gentle spin
    this.rotation += this.rotationSpeed;
    if (speed > 0.5) {
      const targetRot = Math.atan2(this.vy, this.vx);
      const diff = targetRot - this.rotation;
      this.rotation += Math.sin(diff) * 0.03;
    }

    // Wrap around edges with padding
    const pad = 40;
    if (this.x < -pad) this.x = canvasW + pad;
    if (this.x > canvasW + pad) this.x = -pad;
    if (this.y < -pad) this.y = canvasH + pad;
    if (this.y > canvasH + pad) this.y = -pad;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    drawShapes[this.shape](ctx, this.size);
    ctx.restore();
  }
}

const FloatingCharacters = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768;
    const PARTICLE_COUNT = isMobile ? 15 : isTablet ? 22 : 30;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Initialize particles
    particlesRef.current = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(canvas.width, canvas.height)
    );

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', resize);

    let time = 0;

    const animate = () => {
      time += 0.016; // ~60fps time step
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;

      for (const p of particlesRef.current) {
        p.update(mx, my, canvas.width, canvas.height, time);
        p.draw(ctx);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="floating-characters-canvas"
    />
  );
};

export default FloatingCharacters;
