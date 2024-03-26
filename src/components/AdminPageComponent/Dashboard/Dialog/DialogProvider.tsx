"use client";
import React from 'react';
import store from "@/adminRedux/store";
// import {closeOrderModal} from "@/redux/action/openOrderModal";
import {Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
// import {isNumber} from "@/ultis/validate.ultis";
// import {Textarea} from "@nextui-org/input";
import {closeModal} from "@/adminRedux/action/OpenModal";
import {useSelector} from "react-redux";
import {RootState} from "@/adminRedux/reducers";
import UserManagement from "@/components/AdminPageComponent/Dashboard/Dialog/UserManagement";

interface DialogProviderProps {
    children: React.ReactNode
};

const modalContent = {
    'user-management': UserManagement,
}

function DialogProvider({children}: DialogProviderProps) {
    const {_id, isModalOpen, type} = useSelector((state: RootState) => state.modal);
    // const [isSaveActive, setIsSaveActive] = React.useState<boolean>(false);
    // const [isDeleteActive, setIsDeleteActive] = React.useState<boolean>(false);
    const CurrentModal = modalContent[type];
    return (
        <>
            {children}
            <Modal
                isOpen={isModalOpen}
                onClose={() => store.dispatch(closeModal('', "user-management"))}
                placement={'auto'}
                onOpenChange={() => {}}
                className={"z-[999]"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className={"flex flex-col gap-1"}>

                            </ModalHeader>
                            <ModalBody className={"flex flex-col gap-1"}>
                                <CurrentModal _id={_id}/>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default DialogProvider;