import {
  Table,
  Tag,
  Button,
  Modal,
  Popover,
  Popconfirm,
  message,
  Input,
} from "antd";
import {
  EditFilled,
  DeleteFilled,
  UserAddOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { typeJobServ } from "../../../services/serviceLoaiCongViec";
import {
  SUA_LOAI_CONG_VIEC_MODAL,
  THEM_LOAI_CONG_VIEC_MODAL,
} from "../constantAdmin";
import { userServ } from "../../../services/serviceNguoiDung";
import TrangThemCongViec from "../TrangQuanLyCongViec/TrangThemCongViec/TrangThemCongViec";
import TrangSuaCongViec from "../TrangQuanLyCongViec/TrangSuaCongViec/TrangSuaCongViec";
import TrangThemLoaiCongViec from "./TrangThemLoaiCongViec/TrangThemLoaiCongViec";
import TrangSuaLoaiCongViec from "./TrangSuaLoaiCongViec/TrangSuaLoaiCongViec";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../redux/actions/actionTrangLoading";

const { Search } = Input;

const TrangQuanLyLoaiCongViec = () => {
  const [dataTypeJob, setDataTypeJob] = useState(null);
  const [modalOpen, setModalOpen] = useState({ modalName: "", isOpen: false });
  const [infoTypeJob, setInfoTypeJob] = useState(null);

  const dispatch = useDispatch();

  const showModalThem = () => {
    setModalOpen({ modalName: THEM_LOAI_CONG_VIEC_MODAL, isOpen: true });
  };

  const showModalSua = (id) => {
    dispatch(setLoadingOnAction());

    typeJobServ
      .layLoaiCongViecTheoId(id)
      .then((res) => {
        setModalOpen({ modalName: SUA_LOAI_CONG_VIEC_MODAL, isOpen: true });
        setInfoTypeJob(res.data.content);
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  };

  const setModal = (nameModal) => {
    if (nameModal === THEM_LOAI_CONG_VIEC_MODAL) {
      return <TrangThemLoaiCongViec />;
    } else {
      return <TrangSuaLoaiCongViec infoTypeJob={infoTypeJob} />;
    }
  };

  const titleXoa = `B???n c?? ch???c mu???n xo???`;

  const handleXoaTypeJob = (id) => {
    dispatch(setLoadingOnAction());

    typeJobServ
      .xoaLoaiCongViec(id)
      .then(() => {
        message.success("Xo?? lo???i c??ng vi???c th??nh c??ng!");
        typeJobServ
          .layDsLoaiCongViec()
          .then((res) => {
            setDataTypeJob(res.data.content);
            dispatch(setLoadingOffAction());
          })
          .catch((err) => {
            console.log(err);
            dispatch(setLoadingOffAction());
          });
      })
      .catch((err) => {
        message.error(err.response?.data);
        dispatch(setLoadingOffAction());
      });
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onSearch = (value) => {
    dispatch(setLoadingOnAction());

    if (value.length > 0) {
      typeJobServ
        .searchLoaiCongViec(value)
        .then((res) => {
          setDataTypeJob(res.data.content.data);
          dispatch(setLoadingOffAction());
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoadingOffAction());
        });
    } else {
      typeJobServ
        .layDsLoaiCongViec()
        .then((res) => {
          setDataTypeJob(res.data.content);
          dispatch(setLoadingOffAction());
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoadingOffAction());
        });
    }
  };

  const columns = [
    {
      title: "M?? s???",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },

    {
      title: "T??n lo???i c??ng vi???c",
      dataIndex: "tenLoaiCongViec",
      key: "tenLoaiCongViec",
      width: "60%",
    },

    {
      title: <SettingOutlined className="text-xl" />,
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div className="text-2xl flex justify-center items-center">
          <Popover placement="top" content="S???a th??ng tin">
            <button
              className="flex mx-2"
              onClick={() => {
                showModalSua(id);
              }}
            >
              <EditFilled style={{ color: "#457b9d" }} />
            </button>
          </Popover>

          <Popconfirm
            placement="top"
            title={titleXoa}
            onConfirm={() => {
              handleXoaTypeJob(id);
            }}
            okText="Xo??"
            cancelText="Hu???"
          >
            <button className="flex mx-2">
              <DeleteFilled style={{ color: "#e63946" }} />
            </button>
          </Popconfirm>
        </div>
      ),
      with: "30%",
      align: "center",
    },
  ];

  useEffect(() => {
    dispatch(setLoadingOnAction());

    typeJobServ
      .layDsLoaiCongViec()
      .then((res) => {
        setDataTypeJob(res.data.content);
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  }, [modalOpen]);

  return (
    <div>
      <div className="flex items-center justify-between h-20">
        <span className="text-4xl text-left leading-none">
          Qu???n l?? lo???i c??ng vi???c
        </span>

        <div className="text-right">
          <Popover placement="left" content="Th??m lo???i c??ng vi???c">
            <Button
              icon={<FolderAddOutlined />}
              size="large"
              style={{
                backgroundColor: "#1d3557",
                color: "white",
              }}
              onClick={showModalThem}
            />
          </Popover>

          <Modal
            zIndex={45}
            centered
            open={modalOpen.isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {setModal(modalOpen.modalName)}
          </Modal>
        </div>
      </div>

      <Search
        className="w-full mb-4"
        size="large"
        placeholder="Nh???p t??n lo???i c??ng vi???c"
        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={dataTypeJob} />
    </div>
  );
};
export default TrangQuanLyLoaiCongViec;
