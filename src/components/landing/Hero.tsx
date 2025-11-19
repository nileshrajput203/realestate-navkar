
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { stats, heroImages } from "@/lib/data";
import { Counter } from "./Counter";
import { motion } from "framer-motion";

export default function Hero() {
  const statVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="relative bg-background">
      <div className="absolute inset-0">
          <div className="relative aspect-video w-full h-screen overflow-hidden bg-background">
            <Image
              src={heroImages[0].src}
              alt={heroImages[0].alt}
              data-ai-hint={heroImages[0].aiHint}
              fill
              className="object-cover"
              priority
            />
        <div className="absolute inset-0 bg-black/15" />
      </div>
      </div>

      <div className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-[50vh]"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, index) => (
            <motion.div
              key={s.label}
              variants={statVariants}
              initial="initial"
              whileInView="animate"
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
            >
              <Card className="bg-secondary h-full">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-1">
                    {s.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

