import React from 'react';
import { Home, FolderGit2, CircleUserRound, Github, Linkedin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/_core/sidebar';

const sidebarContentItems = [
  {
    title: 'Home',
    url: '#',
    icon: Home
  },
  {
    title: 'About',
    url: '#',
    icon: CircleUserRound
  },
  {
    title: 'Projects',
    url: '#',
    icon: FolderGit2
  },
];

const sidebarFooterItems = [
  {
    title: '',
    url: '#',
    icon: Github
  },
  {
    title: '',
    url: '#',
    icon: Linkedin
  },
];

const MainSidebar: React.FC = () => {
    return (
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>

              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {sidebarContentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            {sidebarFooterItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;