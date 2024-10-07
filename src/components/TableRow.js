import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from "react";

import { deleteUser } from "../redux/slice/user";
import Adduser from "./Adduser";
import Spinner from "./Spinner";

function TableRow(props) 
{
    const toast = useToast();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const index = props.index;
    function handleDelete()
    {
        setIsLoading(true);
        toast({title: `Deleting user ${props.username}`, status: "warning", position: "top-right"});
        dispatch(deleteUser(props.id)).then(()=>{
            toast({title: `User ${props.username} Deleted`, status: "success", position: "top-right"});
            setIsLoading(false);
        }).catch(()=>{
            toast({title: `Deleting ${props.username} failed`, status: "error", position: "top-right"});
            setIsLoading(false);
        });
    }
    return (
        <div className="TableRow" style={{backgroundColor: index%2===0?'var(--white)':'var(--green)'}}>
            <Adduser isEdit isOpen={isOpen} onClose={onClose} name={props.name} username={props.username} phone={props.phone} email={props.email} website={props.website} street={props.address?props.address.street:props.street} city={props.address?props.address.city:props.city} company={props.company.name} id={props.id}/>
            <div className="id">
                <span>{props.id}</span>
            </div>
            <div className="username">
                <span>{props.username}</span>
            </div>
            <div className="name">
                <Link to={`/user/${props.id}`}>
                    <span>{props.name}</span>
                </Link>
            </div>
            <div className="phone">
                <span>{props.phone}</span>
            </div>
            <div className="email">
                <span>{props.email}</span>
            </div>
            <div className="buttons">
                <div>
                    <button onClick={onOpen}>
                        <EditIcon/>
                        Edit
                    </button>
                </div>
                <div>
                    <button onClick={handleDelete}>
                        <DeleteIcon/>
                        Delete
                        {isLoading && <Spinner/>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TableRow;