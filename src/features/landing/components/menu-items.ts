import { User, Monitor, Pencil, FileText, MessageSquare } from "lucide-react";

export const MENU_ITEMS = [
  {
    id: "about",
    label: "New Game",
    desc: "About me — begin here",
    href: "/about",
    Icon: User,
  },
  {
    id: "projects",
    label: "Load Game",
    desc: "Projects — saved progress",
    href: "/projects",
    Icon: Monitor,
  },
  {
    id: "experience",
    label: "Quest Log",
    desc: "Experience & timeline",
    href: "/experience",
    Icon: FileText,
  },
  {
    id: "contact",
    label: "Transmit",
    desc: "Contact — send a message",
    href: "/contact",
    Icon: MessageSquare,
  },
];
