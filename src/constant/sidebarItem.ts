import { listedParamAdmin } from "./listed.param";

export const sidebarList = [
  {
    label: 'Dashboard',
    path: listedParamAdmin.home,
    icon: '<BsFillHouseFill />',
    subLabel: [],
  },
  {
    label: 'Order',
    path: '',
    icon: '<CiShoppingBasket />',
    subLabel: [],
    permission: []
  },
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
      },
      {
        label: "Special Cards",
        path: "listed.user",
        permission: ['user']
      },
      {
        label: "Tags",
        path: "listed.user",
        permission: ['user']
      },
     
    ],
    permission: []
  },
 
  {
    label: 'Pages Setting',
    path: '',
    icon: '<FaRegNewspaper />',   
    subLabel: [
      {
        label: "Home Page",
        path: "listed.user",
        permission: ['user']
      },
      {
        label: "Sign In Page",
        path: "listed.user",
        permission: ['user']
      },
      {
        label: "Sign Up Page",
        path: "listed.user",
        permission: ['user']
      },
      {
        label: "Marketplace Page",
        path: "listed.user",
        permission: ['user']
      },
      {
        label: "Rangking Page",
        path: "listed.user",
        permission: ['user']
      },
      {
        label: "Event Page",
        path: "listed.user",
        permission: ['user']
      },
     
    ],
    permission: []
  },
 
  {
    label: 'Event',
    path: '',
    icon: '<CiCalendar />',   
    subLabel: [],
    permission: []
  },
  {
    label: 'Coupon',
    path: '',
    icon: '<IoTicketOutline />',   
    subLabel: [],
    permission: []
  },
  {
    label: 'Member',
    path: '',
    icon: '<GoPeople />',   
    subLabel: [],
    permission: []
  },
  {
    label: 'Subcription',
    path: '',
    icon: '<SiAmazonsimpleemailservice />',   
    subLabel: [],
    permission: []
  },
 
 
];