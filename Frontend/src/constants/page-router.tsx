import { List } from "@pages/list";
import { ROUTE } from "./routes";

export type PageRoutes = {
  path: string;
  component: React.ReactElement;
  code: string;
};

export const PUBLIC_ROUTER = [
  {
    path: ROUTE.BASE_PAGE,
    component: <List />,
    code: "",
  },
  {
    path: ROUTE.LIST,
    component: <List />,
    code: "",
  },
];
