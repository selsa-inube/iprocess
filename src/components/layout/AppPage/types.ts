
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
  
  interface INavSection {
    name: string;
    links: { [key: string]: ILink };
  }
  
  interface INav {
    title: string;
    sections: { [key: string]: INavSection };
  }

  export type{
    INav,
    ISection
  }