import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createUser, updateUser } from "../redux/slice/user";
import '../css/form.css';

function Adduser({ isOpen, onClose, isEdit, name, email, username, phone, street, city, website, company, id }) {
    const dispatch = useDispatch();
    const toast = useToast();
    const un = username;
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(isEdit?{
        name: name,
        username: username,
        phone: phone,
        email: email,
        street: street,
        city: city,
        company: company,
        website: website
    }:{
        name: '',
        username: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        company: '',
        website: ''
    });
    const [userError, setUserError] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        company: '',
        website: ''
    });
    function toKebabCase(str) {
        if (str) { return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase(); }
        return str;
    }
    function handleOnChange(e) {
        if (e.target.name === 'name') {
            setUser({ ...user, name: e.target.value, username: toKebabCase(e.target.value) });
        }
        else if (e.target.name === 'email') {
            setUser({ ...user, email: e.target.value });
        }
        else if (e.target.name === 'phone') {
            setUser({ ...user, phone: e.target.value });
        }
        else if (e.target.name === 'company') {
            setUser({ ...user, company: e.target.value });
        }
        else if (e.target.name === 'street') {
            setUser({ ...user, street: e.target.value });
        }
        else if (e.target.name === 'city') {
            setUser({ ...user, city: e.target.value });
        }
        else if (e.target.name === 'website') {
            setUser({ ...user, website: e.target.value });
        }
    }
    function validateEmail(email) 
    {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    function validatePhoneNumber(phoneNumber) 
    {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phoneNumber);
    }
    function validateURL(url) 
    {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // optional http or https
                                      '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
                                      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP address
                                      '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // optional port and path
                                      '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // optional query string
                                      '(\\#[-a-zA-Z0-9_]*)?$'); // optional fragment
        return urlPattern.test(url);
    }
    function checkValid()
    {
        if(user.name.length === 0)
        {
            setUserError({...userError, name: "Name is required"});
            toast({title: "Name is required", status: "error", position: "top-right"});
            return false;
        }
        else if(user.name.length < 3 )
        {
            setUserError({...userError, name: "Minimum 3 characters required"});
            toast({title: "Minimum 3 characters required in name", status: "error", position: "top-right"});
            return false;
        }
        else if(user.email.length === 0)
        {
            setUserError({...userError, email: "Email is required"});
            toast({title: "Email is required", status: "error", position: "top-right"});
            return false;
        }
        else if(!validateEmail(user.email))
        {
            setUserError({...userError, email: "Enter valid email"});
            toast({title: "Enter valid email", status: "error", position: "top-right"});
            return false;
        }
        else if(user.phone.length === 0)
        {
            setUserError({...userError, phone: "Phone number is required"});
            toast({title: "Phone number is required", status: "error", position: "top-right"});
            return false;
        }
        else if(!validatePhoneNumber(user.phone))
        {
            setUserError({...userError, phone: "Enter valid phone number"});
            toast({title: "Enter valid phone number", status: "error", position: "top-right"});
            return false;
        }
        else if(user.username.length === 0)
        {
            setUserError({...userError, username: "username is required"});
            toast({title: "username is required", status: "error", position: "top-right"});
            return false;
        }
        else if(user.street.length === 0)
        {
            setUserError({...userError, street: "address is required"});
            toast({title: "address is required", status: "error", position: "top-right"});
            return false;
        }
        else if(user.city.length === 0)
        {
            setUserError({...userError, city: "address is required"});
            toast({title: "address is required", status: "error", position: "top-right"});
            return false;
        }
        else if(user.website.length !== 0 && user.website.length < 3)
        {
            setUserError({...userError, website: "Minimum 3 characters required"});
            toast({title: "Minimum 3 characters required in website", status: "error", position: "top-right"});
            return false;
        }
        else if(user.website.length !== 0 && !validateURL(user.website))
        {
            setUserError({...userError, city: "Enter a valid URL"});
            toast({title: "Enter a valid URL", status: "error", position: "top-right"});
            return false;
        }
        return true;
    }
    function handleSubmit(e)
    {
        e.preventDefault();
        setIsLoading(true);
        toast({title: "Adding User", status: "warning", position: "top-right"});
        if(checkValid())
        {
            dispatch(createUser(user)).then(()=>{
                toast({title: "User Added", status: "success", position: "top-right"});
            });
            setIsLoading(false);
            onClose();
            return;
        }
        toast({title: "User Adding failed", status: "error", position: "top-right"});
        return;
    }
    function handleEdit(e)
    {
        e.preventDefault();
        setIsLoading(true);
        toast({title: `Updating ${un}`, status: "warning", position: "top-right"});
        if(checkValid())
        {
            const updatedUser = {...user, username: un}
            dispatch(updateUser({id: id, updatedUser: updatedUser})).then(()=>{
                toast({title: `${un} Updated`, status: "success", position: "top-right"});
                setIsLoading(false);
            });
            onClose();
        }
        return;
    }
    return (
        isEdit?<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <form onSubmit={(e) => {handleEdit(e);}}>
                <ModalHeader>
                    <div className='modal__header'>
                        <h1>Add a User</h1>
                        <strong className='header__strong'>* Indicates required question</strong>
                    </div>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className='inputContainer'>
                        <label htmlFor='name'>Name:<strong>*</strong></label>
                        <input name='name' id='name' type='text' onChange={handleOnChange} value={user.name} required/>
                        <span>minimun 3 characters</span>
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='username'>Username:<strong>*</strong></label>
                        <input name='username' id='username' type='text' value={un} disabled required/>
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='email'>Email:<strong>*</strong></label>
                        <input name='email' id='email' type='email' onChange={handleOnChange} value={user.email} required/>
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='phone'>Phone:<strong>*</strong></label>
                        <input name='phone' id='phone' type='text' onChange={handleOnChange} value={user.phone} required/>
                    </div>
                    <div className='input__outer'>
                        <h1>Address<strong>*</strong></h1>
                        <div className='inputContainer'>
                            <label htmlFor='street'>Street:</label>
                            <input name='street' id='street' type='text' onChange={handleOnChange} value={user.street} required/>
                        </div>
                        <div className='inputContainer'>
                            <label htmlFor='city'>City:</label>
                            <input name='city' id='city' type='text' onChange={handleOnChange} value={user.city} required/>
                        </div>
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='company'>Company:</label>
                        <input name='company' id='company' type='text' onChange={handleOnChange} value={user.company} />
                        <span>minimun 3 characters</span>
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='website'>Website:</label>
                        <input name='website' id='website' type='text' onChange={handleOnChange} value={user.website} />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button type='submit' className='form__btn'>Submit</button>
                </ModalFooter>
            </form>
        </ModalContent>
    </Modal>:<Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={(e) => {handleSubmit(e);}}>
                    <ModalHeader>
                        <div className='modal__header'>
                            <h1>Add a User</h1>
                            <strong className='header__strong'>* Indicates required question</strong>
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='inputContainer'>
                            <div className='input__inner'>
                                <label htmlFor='name'>Name:<strong>*</strong></label>
                                <span>{userError.name?userError.name:''}</span>
                            </div>
                            <input name='name' id='name' type='text' onChange={handleOnChange} value={user.name} required/>
                            <span>minimun 3 characters</span>
                        </div>
                        <div className='inputContainer'>
                            <div className='input__inner'>
                                <label htmlFor='username'>Username:<strong>*</strong></label>
                                <span>{userError.username?userError.username:''}</span>
                            </div>
                            <input name='username' id='username' type='text' value={user.username} disabled required/>
                        </div>
                        <div className='inputContainer'>
                            <div className='input__inner'>
                                <label htmlFor='email'>Email:<strong>*</strong></label>
                                <span>{userError.email?userError.email:''}</span>
                            </div>
                            <input name='email' id='email' type='email' onChange={handleOnChange} value={user.email} required/>
                        </div>
                        <div className='inputContainer'>
                            <div className='input__inner'>
                                <label htmlFor='phone'>Phone:<strong>*</strong></label>
                                <span>{userError.phone?userError.phone:''}</span>
                            </div>
                            <input name='phone' id='phone' type='text' onChange={handleOnChange} value={user.phone} required/>
                        </div>
                        <div className='input__outer'>
                            <h1>Address<strong>*</strong></h1>
                            <div className='inputContainer'>
                            <div className='input__inner'>
                                <label htmlFor='street'>Street:</label>
                                <span>{userError.street?userError.street:''}</span>
                            </div>
                                <input name='street' id='street' type='text' onChange={handleOnChange} value={user.street} required/>
                            </div>
                            <div className='inputContainer'>
                            <div className='input__inner'>
                                <label htmlFor='city'>City:</label>
                                <span>{userError.city?userError.city:''}</span>
                            </div>
                                <input name='city' id='city' type='text' onChange={handleOnChange} value={user.city} required/>
                            </div>
                        </div>
                        <div className='inputContainer'>
                        <div className='input__inner'>
                                <label htmlFor='company'>Company:</label>
                                <span>{userError.company?userError.company:''}</span>
                            </div>
                            <input name='company' id='company' type='text' onChange={handleOnChange} value={user.company} />
                            <span>minimun 3 characters</span>
                        </div>
                        <div className='inputContainer'>
                        <div className='input__inner'>
                                <label htmlFor='website'>Website:</label>
                                <span>{userError.website?userError.website:''}</span>
                            </div>
                            <input name='website' id='website' type='text' onChange={handleOnChange} value={user.website} />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button type='submit' className='form__btn'>Submit</button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default Adduser