import { useEffect, useRef } from "react";
import { SidebarProvider, SidebarTrigger } from "./components/_core/sidebar";
import Carousel from "./components/Carousel/_index";
import MainSidebar from "./components/Sidebar/_index";
import ParticleEffect from "./components/ParticleEffect";
import { sidebarContentItems, sidebarFooterItems } from "./components/Sidebar/sidebarItems";
import useActivePageObserver from "./hooks/useActivePageObserver";

function App() {
  const pageRefs = useRef<HTMLDivElement[]>([]);
  const addPageRef = (ref: HTMLDivElement | null) => {
    if (ref && !pageRefs.current.includes(ref)) {
      pageRefs.current.push(ref)
    }
  }
  const activePageIndex = useActivePageObserver(pageRefs);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
  })

  sidebarContentItems.forEach((item, i) => {
    item.onClick = () => scrollTo(pageRefs.current[i]!);
  });

  const scrollTo = (element: HTMLDivElement) => {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <SidebarProvider>
      <MainSidebar
        contentItems={sidebarContentItems}
        footerItems={sidebarFooterItems}
        activeIndex={activePageIndex}
      />
      
      <main className="w-full z-99">
        <SidebarTrigger className="fixed top-0 z-50" />

        <div
          ref={el => addPageRef(el)}
          className="h-screen text-center flex px-14 relative"
        >
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
        
        <div
          ref={el => addPageRef(el)}
          className="h-screen text-center flex px-14 relative"
        >
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

        <div
          ref={el => addPageRef(el)}
          className="h-screen relative flex"
        >
          <ParticleEffect particleDensity={0.00001} />
          <div className="self-center mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
              Projects
            </h1>
            <div className="px-14 pt-8 basis-full">
              <Carousel className="max-w-3xl" />
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
};

export default App;
