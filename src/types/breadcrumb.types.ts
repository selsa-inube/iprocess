interface BreadcrumbItem {
    path: string;
    label: string;
    id: string;
    isActive?: boolean;
  }

  interface Breadcrumbs {
    BreadcrumbItem: BreadcrumbItem
  }

  export type {BreadcrumbItem, Breadcrumbs}