interface Link {
  title: string;
  active: boolean;
  to: string;
}

export const links: Link[] = [
  {
    title: "Home",
    active: false,
    to: "/",
  },
  {
    title: "About",
    active: false,
    to: "/",
  },
  {
    title: "Blog",
    active: true,
    to: "/",
  },
];
