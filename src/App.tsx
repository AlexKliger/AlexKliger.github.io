import { useState, useEffect, useMemo, useRef } from "react";
import { SidebarProvider, SidebarTrigger } from "./components/_core/sidebar";
import Carousel from "./components/Carousel/_index";
import MainSidebar from "./components/Sidebar/_index";
import ParticleEffect from "./components/ParticleEffect";
import { sidebarContentItems, sidebarFooterItems } from "./components/Sidebar/sidebarItems";

function App() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
  })

  const [visiblePageIndex, setVisiblePageIndex] = useState<number | null>(null);

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  
  const pageRefs = useMemo(() => [page1Ref, page2Ref, page3Ref], []);

  sidebarContentItems.forEach((item, i) => {
    item.onClick = () => scrollTo(pageRefs[i].current!);
  });

  const scrollTo = (element: HTMLDivElement) => {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisiblePageIndex(parseInt(entry.target.getAttribute('data-index')!));
          }
        })
      },
      {
        root: null, // Use viewport as the root
        rootMargin: '0px',
        threshold: 0.5,
      }
    )

    pageRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    })

    return () => {
      pageRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      })  
    }
  });

  return (
    <SidebarProvider>
      <MainSidebar
        contentItems={sidebarContentItems}
        footerItems={sidebarFooterItems}
        activeIndex={visiblePageIndex}
      />
      
      <main className="w-full z-99">
        <SidebarTrigger className="fixed top-0 z-50" />

        <div data-index={0} ref={page1Ref} className="h-screen text-center flex px-14 relative">
          <ParticleEffect />
          <div className="self-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Hi, I'm Alex.
            </h1>
            <p className="text-4xl font-extrabold tracking-tight lg:text-5xl mt-4">
              I'm a software developer based in Miami.
            </p>
          </div>
        </div>
        
        <div data-index={1} ref={page2Ref} className="h-screen text-center flex px-14 relative">
          <ParticleEffect particleDensity={0.00004} />
          <div className="self-center max-w-lg mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              About
            </h1>
            <p className="text-justify font-bold leading-7 [&:not(:first-child)]:mt-6">
              I'm a former math educator that has transitioned to a career in software development. Adhering to the philosophy of life-long learning, I am particularly interested in the intersection of education, AI, and software.
            </p>
          </div>
        </div>

        <div data-index={2} ref={page3Ref} className="h-screen relative flex">
          <ParticleEffect particleDensity={0.00001} />
          <div className="self-center w-full">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
              Projects
            </h1>
            <div className="p-14 h-full">
              <div className="self-center basis-full mx-auto">
                <Carousel className="max-w-3xl" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </SidebarProvider>
  )
};

export default App;
