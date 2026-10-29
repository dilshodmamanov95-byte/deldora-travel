'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

function AnimatedSphere() {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) * 0.2;
      meshRef.current.rotation.y = Math.sin(t / 4) * 0.3;
      meshRef.current.position.y = Math.sin(t / 1.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1.6, 64, 64]}
        scale={hovered ? 1.15 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={clicked ? '#F59E0B' : hovered ? '#D4A532' : '#C58929'}
          attach='material'
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export const Hero = () => {
  const { dictionary } = useLocale();
  return (
    <section className='relative w-full h-[92vh] min-h-[650px] overflow-hidden bg-slate-950 flex items-center'>
      <div className='absolute inset-0 z-0'><Canvas><Stars /><AnimatedSphere /><OrbitControls enableZoom={false} /></Canvas></div>
      <div className='container mx-auto px-4 relative z-10'>
        <h1 className='text-6xl font-bold text-white'>{dictionary.hero.slides[0].title}</h1>
      </div>
    </section>
  );
};
