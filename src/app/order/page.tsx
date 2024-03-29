import React from 'react';
import OrderScreen from '@/containers/HomePage/OrderScreen';
import MenuBar from "@/components/Menu";
import SearchScreen from "@/containers/HomePage/SearchScreen";
import OrderModal from "@/components/Modal/OrderModal";
import CartModal from "@/components/Modal/CartModal";
import {LiveChatWidgetProvider} from "@/contexts/liveChatWidgetContext";
interface PageProps {

};

function Page({}: PageProps) {
    return (
        <>
            <LiveChatWidgetProvider>
                <MenuBar/>
                <OrderScreen />
                <OrderModal/>
                <CartModal/>
            </LiveChatWidgetProvider>
        </>
    );
}

export default Page;