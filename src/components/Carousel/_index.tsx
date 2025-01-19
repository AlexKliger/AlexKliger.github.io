import React from 'react';

import { Card, CardContent } from "@/components/_core/card"
import {
  Carousel as CarouselCore,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/_core/carousel"

interface CarouselProps {
  className?: string
}

const Carousel = ({ className }: CarouselProps ) => {
  return (
      <CarouselCore
        opts={{
          align: "start",
          loop: true
        }}
        className={ className }
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselCore>
    );
};

export default Carousel;