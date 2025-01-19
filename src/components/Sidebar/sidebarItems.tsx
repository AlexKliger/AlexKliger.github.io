import { ElementType } from 'react';
import {
  Home,
  FolderGit2,
  CircleUserRound,
  Github,
  Linkedin
} from "lucide-react";

interface SidebarItem {
  title: string;
  url: string;
  icon: ElementType
}

const sidebarContentItems: SidebarItem[] = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'About',
    url: '#',
    icon: CircleUserRound,
  },
  {
    title: 'Projects',
    url: '#',
    icon: FolderGit2,
  },
];
  
const sidebarFooterItems: SidebarItem[] = [
  {
    title: 'Github',
    url: '#',
    icon: Github,
  },
  {
    title: 'Linkedin',
    url: '#',
    icon: Linkedin,
  },
];

export { sidebarContentItems, sidebarFooterItems };