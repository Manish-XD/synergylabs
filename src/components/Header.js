import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/react';

import Adduser from "./Adduser";
import "../css/header.css";

function Header({userinfo}) 
{
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="header">
        <Link to="/" className="header__left">
            <img src="/logo.png" alt="logo"/>
            <h1>User database</h1>
        </Link>
        {!userinfo && <button className="header__right" onClick={onOpen}>
            <AddIcon/>
            <span>Add User</span>
            <Adduser isOpen={isOpen} onClose={onClose}/>
        </button>}
    </div>
  )
}

export default Header;