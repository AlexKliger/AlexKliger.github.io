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
  icon: ElementType;
  url?: string;
  onClick?: () => void;
}

const sidebarContentItems: SidebarItem[] = [
  {
    title: 'Home',
    icon: Home,
  },
  {
    title: 'About',
    icon: CircleUserRound,
  },
  {
    title: 'Projects',
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

export { sidebarContentItems, sidebarFooterItems, type SidebarItem };