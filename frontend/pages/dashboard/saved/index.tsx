import type { NextPage } from "next";
import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getSaved, resetSaved } from "redux/reducers/saved";

import DashboardLayout from "layouts/DashboardLayout";
import { Table, Pagination } from "components";
import { Filters } from "components/UserDashboard";
import { ChatbotItem } from "components/Chatbot";

import img1 from "assets/img/saved/img1.png";

const columns: any = [
  {
    key: "id",
    name: "#",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "created",
    name: "Created",
  },
  {
    key: "documents",
    name: "Documents",
  },
  {
    key: "status",
    name: "Status",
  },
  {
    key: "action",
    name: "",
  },
];

const MenuRow = ({ id }: { id: any }) => {
  const router = useRouter();

  const handleAction = (key: string) => {
    if (key === "edit") {
      router.push(`/chat/${id}`);
    }
  };

  const menus = [
    {
      key: "edit",
      name: "Edit",
    },
    {
      key: "share",
      name: "Share",
    },
    {
      key: "settings",
      name: "Settings",
    },
    {
      key: "analytics",
      name: "Analytics",
    },
  ];

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex text-sm text-left bg-gray-800 p-1 border border-[#A7ADC1] rounded-lg text-[#A7ADC1] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-auto py-4 px-5 mt-2 origin-top-right bg-white dark:bg-[#454545] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menus &&
            menus.map((item, i) => (
              <Menu.Item key={i}>
                <a
                  onClick={() => handleAction(item.key)}
                  className="block text-[#263238] dark:text-white font-medium text-sm capitalize w-[70px] font-Satoshi mb-2 dark:hover:text-[#DDDDDD] hover:text-[#48545A] hover:no-underline cursor-pointer"
                >
                  {item.name}
                </a>
              </Menu.Item>
            ))}
          <Menu.Item>
            <a
              href="#"
              className="block text-[#FF4646] font-medium text-sm capitalize w-[70px] font-Satoshi hover:text-[#DD2424] hover:no-underline cursor-pointer"
            >
              Delete
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Status = ({ status }: { status: string }) => {
  return (
    <span className="bg-[#1F8A70] rounded-[34px] px-[19px] py-[4px] text-white text-sm font-medium capitalize inline-flex items-center justify-center">
      {status}
    </span>
  );
};

const Saved: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { saved } = useAppSelector((state) => state.saved);

  const [isList, setIsList] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any>([]);
  const total = 5;
  const limit = 10;

  const handleDelete = (id: any) => {
    console.log("delete: ", id)
  }

  const initListData = () => {
    let results: any = [];
    for (let i = 1; i < total + 1; i++) {
      const obj = {
        id: i,
        name: "Lorem ipsum dolor sit, consectetur adipiscing elit.",
        description: "Chatbot name goes here, Lorem ipsum dolor sit amet",
        created: "28 mar, 2023",
        documents: Math.floor(Math.random() * 100),
        status: <Status status="open" />,
        action: <MenuRow id={i} />,
      };
      results.push(obj);
    }
    setData(results);
  };

  const renderGrid = () => {
    let results: any = [];
    for (let i = 1; i < total; i++) {
      results.push(
        <ChatbotItem
          id={i}
          status="Open"
          image={img1}
          title="Lorem ipsum dolor sit"
          // description=""
          createdAt="28 mar, 2023"
          documents={41}
          onDelete={handleDelete}
        />
      );
    }

    return results;
  };

  useEffect(() => {
    if (saved && saved.results) {
      let results = [];
      for (let i = 0; i < saved.results.length; i++) {
        const el: any = saved.results[i];
        let obj = {
          id: el.id,
          name: el.name,
          created: moment(el.created_at).format("DD MMM, YYYY"),
          documents: el.documents ? el.documents.length : 0,
          status: <Status status="open" />,
          action: <MenuRow id={el.id} />,
        };
        results.push(obj);
      }
      setData(results);
    }
  }, [saved]);

  useEffect(() => {
    dispatch(getSaved());
    return () => {
      dispatch(resetSaved())
    };
  }, [])

  const handleLayout = () => {
    setIsList(!isList);
  };

  const handlePage = (index: number) => {
    setPage(index);
  };

  const handleNextPage = () => {
    if (page < Math.ceil(total / limit)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="box-border w-full p-4 sm:p-6 min-h-chatbot">
        <Filters
          title="All Saved Chats"
          isList={isList}
          onLayout={handleLayout}
        />

        {isList ? (
          <Table columns={columns} data={data} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[21px]">
            {data.length > 0 &&
              data.map((item: any, i: number) => (
                <ChatbotItem
                  key={i}
                  id={item.id}
                  status="Open"
                  image={img1}
                  title={item.name}
                  // description=""
                  createdAt={
                    item.created_at
                      ? moment(item.created_at).format("DD MMM, YYYY")
                      : ""
                  }
                  documents={item.documents.length || 0}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        )}

        {data.length > limit && (
          <Pagination
            page={page}
            total={total}
            limit={limit}
            onPage={handlePage}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Saved;
