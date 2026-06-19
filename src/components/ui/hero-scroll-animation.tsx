'use client';

import { useScroll, useTransform, motion, MotionValue } from 'motion/react';
import React, { useRef, forwardRef } from 'react';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky font-semibold top-0 h-screen bg-gradient-to-t to-[#D8F3DC] from-[#FFFFFF] flex flex-col items-center justify-center text-[#1B4332]'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#40916c1f_1px,transparent_1px),linear-gradient(to_bottom,#40916c1f_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      <h1 className='2xl:text-7xl text-6xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
        Design the system. <br /> Earn the fun. 👇
      </h1>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-[#245241] from-[#1B4332] text-[#D8F3DC]'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#74c69d1f_1px,transparent_1px),linear-gradient(to_bottom,#74c69d1f_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='container mx-auto relative z-10 px-8'>
        <h1 className='text-5xl md:text-6xl leading-[100%] py-10 font-semibold tracking-tight'>
          Levels, systems and worlds <br /> players actually remember
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <img
            src='https://images.unsplash.com/photo-1717893777838-4e222311630b?w=1200&auto=format&fit=crop'
            alt='project'
            className='object-cover w-full rounded-md h-full'
          />
          <img
            src='https://images.unsplash.com/photo-1717618389115-88db6d7d8f77?w=500&auto=format&fit=crop'
            alt='project'
            className='object-cover w-full rounded-md'
          />
          <img
            src='https://images.unsplash.com/photo-1717588604557-55b2888f59a6?w=500&auto=format&fit=crop'
            alt='project'
            className='object-cover w-full rounded-md h-full'
          />
          <img
            src='https://images.unsplash.com/photo-1713417338603-1b6b72fcade2?w=500&auto=format&fit=crop'
            alt='project'
            className='object-cover w-full rounded-md h-full'
          />
        </div>
      </article>
    </motion.section>
  );
};

const HeroScroll = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={container} className='relative h-[200vh] bg-[#1B4332]'>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </section>
  );
});

HeroScroll.displayName = 'HeroScroll';

export default HeroScroll;
