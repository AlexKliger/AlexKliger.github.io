import React from 'react';
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
import {
  sidebarContentItems,
  sidebarFooterItems
} from './sidebarItems';

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
              {sidebarContentItems.map(({title, url, icon: Icon}) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton tooltip={title} asChild>
                    <a href={url}>
                      <Icon />
                      <span>{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            {sidebarFooterItems.map(({title, url, icon: Icon}) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton tooltip={title} asChild>
                    <a href={url}>
                      <Icon />
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