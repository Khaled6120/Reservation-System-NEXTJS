"use client"
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../../hooks/useAuth';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function LoginModal({ isSignin }: { isSignin: boolean }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { signin } = useAuth()
    const renderContent = (signinContent: string, signupContent: string) => {
        return isSignin ? signinContent : signupContent;
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
    })

    const [disabled, setDisabled] = useState(true);
    useEffect(() => {

        if (isSignin) {
            if (inputs.password && inputs.email && inputs.firstName && inputs.lastName && inputs.phone && inputs.city) {
                return setDisabled(false)
            }
        } else {
            if (inputs.password || inputs.email) {
                return setDisabled(false)
            }
        }
        setDisabled(true)

    }, [inputs])


    const handleClick = () => {
        if (!isSignin) {
            signin({ email: inputs.email, password: inputs.password })
        }
    }

    return (
        <div>
            <button
                className={`${renderContent("bg-blue-400 text-white", "")} border p-1 px-4 rounded mr-3`}
                onClick={handleOpen}
            >
                {renderContent( "Sign up","Sign in")}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="p-2 h-[600px]">
                        <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                            {renderContent("Sign In", "Create Account")}
                        </div>
                        <div className='m-auto  '>
                            <h2 className="text-2xl font-light text-center text-blue-800">
                                {renderContent("Log Into Your Account", "Create Your OpenTable Account")}
                            </h2>
                            <AuthModalInputs inputs={inputs} handleChangeInput={handleChangeInput} isSignin={isSignin} />
                            <button onClick={handleClick} className='uppercase bg-red-600 w-full text-white rounded text-sm p-3 mb-10 disabled:bg-gray-300' disabled={disabled}>
                                {renderContent( "Create Account","Sign In")}
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}