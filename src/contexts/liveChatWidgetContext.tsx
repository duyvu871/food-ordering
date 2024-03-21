"use client";
import React, {useContext, createContext, useEffect, useLayoutEffect, useRef} from "react";
import AppConfig from "@/configs/app.config";
import {global} from "styled-jsx/css";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import {useUserData} from "@/hooks/useUserData";
import useMediaQuery from "@/hooks/useMediaQuery";
import {tw} from "@/ultis/tailwind.ultis";
import {timeout} from "@/helpers/delayAction";

export interface LivechatWidgetContextType {
    openWidget: (liveChatWidget?: any) => void;
    closeWidget: (liveChatWidget?: any) => void;
    isWidgetOpen: boolean;
}

export const LivechatWidgetContext = createContext<LivechatWidgetContextType>({
    openWidget: (liveChatWidget?: any) => {},
    closeWidget: (liveChatWidget?: any) => {},
    isWidgetOpen: false,
});

export const LiveChatWidgetProvider = ({children}: {children: React.ReactNode}) => {
    const isMobile = useMediaQuery(400);
    const {userData} = useUserData();
    const [isWidgetOpen, setIsWidgetOpen] = React.useState<boolean>(false);
    const [isLiveChatLoaded, setIsLiveChatLoaded] = React.useState<boolean>(false);
    const livechatRef = useRef<any>();
    const convertTawkUrl = (originalUrl: string): string => {
        const parts = originalUrl.split('/');
        return `https://embed.tawk.to/${parts[4]}/${parts[5]}`;
    }

    const openWidget = (liveChatWidget?: any) => {
        setIsWidgetOpen(true);
        //@ts-ignore
        if (livechatRef.current) {
            //@ts-ignore
            livechatRef.current.maximize();
        } else {
            //@ts-ignore
            // LC_API.open_chat_window()
        }
    }

    const closeWidget = (liveChatWidget?: any) => {
        setIsWidgetOpen(false);
        //@ts-ignore
        if (livechatRef.current) {
            //@ts-ignore
            livechatRef.current.minimize();
            livechatRef.current.hideWidget();

        } else {
            //@ts-ignore
            // LC_API.hide_chat_window()
        }
    }

    const onload = () => {
        livechatRef.current.visitor({
            name: userData.fullName||"anonymous",
            email: userData.email||"email@email.com"
        });
    }

    const loadScript = async (url: string) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.async = true;
            script.src = url;
            script.charset = "UTF-8"
            script.setAttribute('crossorigin', "*")
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                reject(false);
            }
            document.body.appendChild(script);
        })
    }

    useEffect(() => {
        //@ts-ignore
        window.Tawk_API = window.Tawk_API || {};
        //@ts-ignore
        window.Tawk_LoadStart = new Date();
        //@ts-ignore
        const loadLiveChat = async () => {
            try {
                await loadScript(convertTawkUrl(AppConfig.liveChat.linkLiveChat)).then(() => {
                    console.log("loaded live chat");
                    timeout(1000).then(() => {
                        // @ts-ignore
                        window.Tawk_API.hideWidget();
                    })
                });
                //@ts-ignore
                closeWidget();
            } catch (e) {
                console.log(e);
            }
        }
        loadLiveChat()
    }, []);

    return (
        <LivechatWidgetContext.Provider value={{
            openWidget,
            closeWidget,
            isWidgetOpen,
        }}>
            {children}
            <div className={tw(isWidgetOpen ? "": "hidden")}>
                <TawkMessengerReact
                    ref={livechatRef}
                    onload={onload}
                    className={"text-red"}
                    propertyId={AppConfig.liveChat.license}
                    widgetId="livechat-widget"
                    customStyle={{
                        visibility : {
                            desktop : {
                                xOffset : '15',
                                yOffset : '15',
                                position : 'cr'
                            },

                            mobile : {
                                xOffset : 10,
                                yOffset : 70,
                                position : 'br',

                            }
                        }
                    }}
                />
            </div>
        </LivechatWidgetContext.Provider>
    )
}