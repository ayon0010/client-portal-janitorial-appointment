"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../public/Gemini_Generated_Image_dq88xxdq88xxdq88.png"
import { usePathname } from "next/navigation"



type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {


  const pathName = usePathname();

  console.log(pathName);




  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center overflow-hidden justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image alt="Janitorial-appointment-logo" width={60} height={60} src={logo} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">
                    Janitorial Appointment
                  </span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.url === pathName}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
