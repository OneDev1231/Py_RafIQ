import ChatbotsSvg from "assets/img/layouts/menu-chatbots.svg";
import SavedSvg from "assets/img/layouts/menu-saved.svg";
import WalletSvg from "assets/img/layouts/menu-wallet.svg";
import BillingSvg from "assets/img/layouts/menu-dollarcircle.svg";
import SettingSvg from "assets/img/layouts/menu-setting.svg";
import UsersSvg from "assets/img/layouts/menu-users.svg";
import ContactSvg from "assets/img/layouts/menu-contact.svg";


const menus = [
  {
    name: "Chatbots",
    path: "/dashboard",
    active: true,
    icon: ChatbotsSvg,
  },
  {
    name: "Saved Chats",
    path: "/dashboard/saved",
    active: false,
    icon: SavedSvg,
  },
  {
    name: "My credits",
    path: "/dashboard/credits",
    active: false,
    icon: WalletSvg,
  },
  {
    name: "Billing info",
    path: "/dashboard/billing",
    active: false,
    icon: BillingSvg,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    active: false,
    icon: SettingSvg,
  },
];

const support = [
  {
    name: "Affiliate",
    path: "/dashboard/affiliate",
    active: false,
    icon: UsersSvg,
  },
  {
    name: "Contact Us",
    path: "/contact",
    active: false,
    icon: ContactSvg,
  },
];

export { menus, support };
