import { BsFillHouseFill} from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import {  FaGear, FaRegNewspaper } from "react-icons/fa6";
import { CiCalendar,  CiShoppingBasket } from "react-icons/ci";
import { GoPeople, } from "react-icons/go";
import { SiAmazonsimpleemailservice } from "react-icons/si"
import { AiOutlineShop } from "react-icons/ai";
import React from "react";
import { RiCoupon2Line } from "react-icons/ri";
// tambahkan import untuk ikon lainnya di sini

export const iconMapping: { [key: string]: React.ReactElement } = {
  "<BsFillHouseFill />": <BsFillHouseFill />,
  "<FaGear />": <FaGear />,
  "<CiShoppingBasket />" : <CiShoppingBasket />,
  "<CiShop />" : <AiOutlineShop />,
  "<FaRegNewspaper />" : <FaRegNewspaper/>,
  "<CiCalendar />" : <CiCalendar/>,
  "<IoTicketOutline />" : <IoTicketOutline />,
  "<GoPeople />" : <GoPeople/>,
  "<SiAmazonsimpleemailservice />" : <SiAmazonsimpleemailservice />,
  
  // tambahkan pemetaan untuk ikon lainnya di sini
};