import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
 } from "@/components/_core/card"
import {
  Carousel as CarouselCore,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/_core/carousel"

const items = [
  {
    title: "Sameen Consulting",
    description: "A front-end website for Sameen Consulting, a technology integration and program management company.",
    image: "/assets/images/sameen_consulting.png",
  },
  {
    title: "Zaniac STEM Enrichment",
    description: "Zaniac is an education company that offers year-round Science, Technology, Engineering, Art & Math (STEAM) Programs and Camps for K-12th graders.",
    image: "/assets/images/zaniac.png",
  },
]

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
          {items.map(({ title, description, image }) => (
            <CarouselItem key={title} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img className="rounded-lg" src={image} alt={title} />
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