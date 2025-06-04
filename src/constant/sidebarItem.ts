import { listedParamAdmin } from "./listed.param";

export const sidebarList = [
  {
    label: 'Dashboard',
    path: listedParamAdmin.home,
    icon: '<BsFillHouseFill />',
    subLabel: [],
  },
  // {
  //   label: 'Order',
  //   path: '',
  //   icon: '<CiShoppingBasket />',
  //   subLabel: [],
  //   permission: []
  // },
  {
    label: 'Collection',
    path: '',
    icon: '<CiShop />',   
    subLabel: [
      {
        label: "Master Product",
        path: listedParamAdmin.master,
        permission: []
      },
      {
        label: "Category Product",
        path: listedParamAdmin.category,
        permission: ['user']
      },
      {
        label: "Series Product",
        path: listedParamAdmin.series,
        permission: ['user']
      },
      
      {
        label: "Cards",
        path: listedParamAdmin.cards,
        permission: ['user']
      }
     
    ],
    permission: []
  },
 
  // {
  //   label: 'Event',
  //   path: '',
  //   icon: '<CiCalendar />',   
  //   subLabel: [],
  //   permission: []
  // },
  {
    label: 'Setting',
    path: listedParamAdmin.setting,
    icon: '<FaGear />',   
    subLabel: [],
    permission: []
  },
  {
    label: 'Member',
    path: listedParamAdmin.user,
    icon: '<GoPeople />',   
    subLabel: [],
    permission: []
  },
  // {
  //   label: 'Subcription',
  //   path: '',
  //   icon: '<SiAmazonsimpleemailservice />',   
  //   subLabel: [],
  //   permission: []
  // },
 
 
];