export type LargeSidebarItemProps = {
  title: string;
  url: string;
  Icon: React.ComponentType;
  className?: string;
  isActive?: boolean;
};

export type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title: string;
  visibleItemCount?: number;
  className?: string;
};

export type SideBarItemProps = {
  Icon: React.ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};
