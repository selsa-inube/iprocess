import { INavNavigation } from '@inubekit/nav';

  interface ISection {
    title: string;
    links: ILink[];
  }

  interface ILink {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
  }
 
  interface INav {
    items: INavNavigation;
    breakpoint: string;
  }

  export type{
    INav,
    ISection
  }