"use client"
import React, {useEffect, useLayoutEffect} from 'react';
import TableBody from "./TableBody";
import {Pagination} from "@nextui-org/react";
import {UserInterface} from "types/userInterface";
import {formatCurrency} from "@/ultis/currency-format";
import store from "@/adminRedux/store";
import {updateUsers} from "@/adminRedux/action/userData";
import {RootState} from "@/adminRedux/reducers";
import {useSelector} from "react-redux";
import {openModal} from "@/adminRedux/action/OpenModal";
import {TimeRange} from "@/ultis/timeFormat.ultis";

interface TableProps {

};

const headerTable = [
    {
        title: "STT",
        key: "index"
    },
    {
        title: "Tên người dùng",
        key: "fullName"
    },
    {
        title: "Email",
        key: "email"
    },
    {
        title: "Số điện thoại",
        key: "phone"
    },
    {
        title: "Số dư",
        key: "balance",
        action: 'formatCurrency'
    },
    {
        title: "Số đơn",
        key: "orders"
    },
    {
        title: "Doanh thu",
        key: "revenue",
        action: 'formatCurrency'
    },
    {
        title: "loại khách hàng",
        key: "isLoyalCustomer"
    },
    {
        title: "Trạng thái",
        key: "status"
    },
    {
        title: "Action",
        key: "action"
    }
];

function Table({}: TableProps) {
    const [data, setData] = React.useState<Record<string, UserInterface[]>>({});
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPage, setTotalPage] = React.useState<number>(1);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {users} = useSelector((state: RootState) => state.users);

    const fetchData = async () => {
        fetch('/api/v1/admin/user/get-users-by-paginate?page=' + currentPage + '&limit=' + 10).then(async (res) => {
            if (res.status !== 200) {
                return;
            }
            const data = await res.json();
            setData((prev) => ({...prev, ['user-data'+currentPage]: data.data}));
            store.dispatch(updateUsers(data.data));
            setTotalPage(Math.ceil(data.count / 10));
            setIsLoading(false);
            // window.localStorage.setItem('temp-user-data', JSON.stringify(data.data));
        });
    }

    useLayoutEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        setIsLoading(true);

        // if (data['user-data'+currentPage]) {
        //     setIsLoading(false);
        //     return;
        // }
        // let count = 0;
        // const interval = setInterval(() => {
        //     count++;
        //     if (currentPage === 1) {
        //         // if () {
        //         //     fetchData(currentPage);
        //         // }
        //         fetchData();
        //     } else {
        //         clearInterval(interval);
        //     }
        //     console.log(count)
        // }, 15000);
        //
        //
        // return () => {
        //     clearInterval(interval);
        // }
    }, [currentPage]);

    const generateXLSX = async () => {
        const response = await fetch('/api/v1/admin/finalization/export-user?range='+"all")
        const fileBlob = await response.blob()

        // this works and prompts for download
        var link = document.createElement('a')  // once we have the file buffer BLOB from the post request we simply need to send a GET request to retrieve the file data
        link.href = window.URL.createObjectURL(fileBlob)
        link.download = 'thongtindonhang-'+ "tatca" +'.xlsb'
        link.click()
        link.remove();
    }

    return (
        <div className={"p-6 min-h-[calc(100vh-146px)] w-full"}>
            <div className={"flex flex-row justify-between items-center py-4"}>
                <h1 className={"text-2xl font-bold"}>Quản lý khách hàng</h1>
                <div className={"flex justify-end items-center gap-4"}>
                    <button
                        className={"bg-primary text-white rounded-md px-4 py-2"}
                        onClick={() => {
                            // @ts-ignore
                            store.dispatch(openModal("oke", "create-user"))
                        }}
                    >Thêm khách hàng
                    </button>
                    <button className={"bg-primary text-white rounded-md px-4 py-2"} onClick={generateXLSX}>Xuất file
                    </button>
                </div>
            </div>
            <div className={"grid grid-cols-1"}>
                <div className={"border rounded-lg border-default-200 bg-gray-100"}>
                    <div className={"px-6 py-4 overflow-hidden flex flex-row justify-between items-center"}>
                        <div className={"flex flex-row justify-between items-center"}>
                            Danh sách khách hàng
                        </div>
                        <Pagination
                            showControls
                            total={totalPage}
                            // initialPage={1}
                            classNames={{
                                forwardIcon: "text-white",
                                item: "bg-white text-black",
                                prev: "bg-white text-black",
                                next: "bg-white text-black",
                                cursor: "bg-blue-500 text-white",
                            }}
                            page={currentPage}
                            onChange={(page) => {
                                console.log(page);
                                setCurrentPage(page);
                            }}
                        />
                    </div>
                    <div className={"relative overflow-x-auto"}>
                        <div className={"min-w-full inline-block align-middle"}>
                            <div className={"overflow-hidden"}>
                                <table className={"min-w-full divide-y divide-default-200"}>
                                    <thead className={"bg-white"}>
                                        <tr className={"text-start"}>
                                            {headerTable.map((item, index) => (
                                                <th key={index} className={"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"}>
                                                    {item.title}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    {isLoading ? <div>Loading...</div> :  <TableBody
                                        keys={headerTable.map(item => item.key)}
                                        actions={headerTable.map(item => item.action)}
                                        page={currentPage - 1}
                                        rowsPerPage={10}
                                        data={users || []}
                                    />}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;