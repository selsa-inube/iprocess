import { lazy } from "react";

const refreshCustomerAttributes = lazy(() =>
  import("@forms/customers/RefreshCustomerAttributes").then((module) => ({
    default: module.RefreshCustomerAttributes,
  }))
);
const refreshSavingProductCard = lazy(() =>
  import("@forms/card/RefreshSavingProductCard").then((module) => ({
    default: module.RefreshSavingProductCard,
  }))
);
const refreshSavingProduct = lazy(() =>
  import("@forms/savings/RefreshSavingProduct").then((module) => ({
    default: module.RefreshSavingProduct,
  }))
);
const refreshSavingCommitment = lazy(() =>
  import("@forms/savings/RefreshSavingCommitment").then((module) => ({
    default: module.RefreshSavingCommitment,
  }))
);

const refreshInterestStatusUpdate = lazy(() =>
  import("@forms/portfolio/RefreshInterestStatusUpdate").then((module) => ({
    default: module.RefreshInterestStatusUpdate,
  }))
);

const refreshPortfolioObligation = lazy(() =>
  import("@forms/portfolio/RefreshPortfolioObligation").then((module) => ({
    default: module.RefreshPortfolioObligation,
  }))
);

const refreshCreditRequest = lazy(() =>
  import("@forms/credit/RefreshCreditRequest").then((module) => ({
    default: module.RefreshCreditRequest,
  }))
);

const refreshCardCreditProduct = lazy(() =>
  import("@forms/card/RefreshCardCreditProduct").then((module) => ({
    default: module.RefreshCardCreditProduct,
  }))
);

const refreshOtherDebt = lazy(() =>
  import("@forms/otherDebt/RefreshOtherDebt").then((module) => ({
    default: module.RefreshOtherDebt,
  }))
);

const refreshCard = lazy(() =>
  import("@forms/card/RefreshCard").then((module) => ({
    default: module.RefreshCard,
  }))
);

const routesComponent = [
  {
    path: "src/forms/customers/RefreshCustomerAttributes",
    component: refreshCustomerAttributes,
  },
  {
    path: "src/forms/card/RefreshSavingProductCard",
    component: refreshSavingProductCard,
  },
  {
    path: "src/forms/savings/RefreshSavingProduct",
    component: refreshSavingProduct,
  },
  {
    path: "src/forms/portfolio/RefreshInterestStatusUpdate",
    component: refreshInterestStatusUpdate,
  },
  {
    path: "src/forms/savings/RefreshSavingCommitment",
    component: refreshSavingCommitment,
  },
  {
    path: "src/forms/portfolio/RefreshPortfolioObligation",
    component: refreshPortfolioObligation,
  },
  {
    path: "src/forms/card/RefreshCardCreditProduct",
    component: refreshCardCreditProduct,
  },
  {
    path: "src/forms/otherDebt/RefreshOtherDebt",
    component: refreshOtherDebt,
  },
  {
    path: "src/forms/credit/RefreshCreditRequest",
    component: refreshCreditRequest,
  },
  {
    path: "src/forms/card/RefreshCard",
    component: refreshCard,
  },
];

export { routesComponent };
