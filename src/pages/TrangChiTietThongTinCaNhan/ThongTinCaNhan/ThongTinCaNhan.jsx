import {
  EditOutlined,
  UserOutlined,
  MailFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { Avatar, Card, Tag, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { userServ } from "../../../services/serviceNguoiDung";
import { THEM_MODAL } from "../../TrangAdmin/constantAdmin";
import TrangSuaUser from "../../TrangAdmin/TrangQuanLyUser/TrangSuaUser/TrangSuaUser";
import TrangThemUser from "../../TrangAdmin/TrangQuanLyUser/TrangThemUser/TrangThemUser";
const ThongTinCaNhan = () => {
  console.log("Render");

  const [info, setInfo] = useState({});
  const [modalOpen, setModalOpen] = useState({ modalName: "", isOpen: false });

  useEffect(() => {
    userServ
      .layNguoiDungTheoId(1497)
      .then((res) => {
        setInfo(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modalOpen]);

  const showModalThem = () => {
    setModalOpen({ modalName: THEM_MODAL, isOpen: true });
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const renderSkillCertification = (name) => {
    if (name) {
      return name.map((item) => (
        <Tag style={{ fontSize: 14, marginBottom: 8 }}>{item}</Tag>
      ));
    }
  };

  return (
    <Card
      style={{
        borderColor: "#e5e7eb",
        width: 400,
      }}
    >
      <Avatar size={120} icon={<UserOutlined />} src={info.avatar} />

      <div className="text-xl">{info.name}</div>

      <div className="border-t-2 w-full my-5"></div>

      <div className="flex justify-between text-base mb-2">
        <span className="flex items-center">
          <MailFilled />
          <span className="ml-1">Email</span>
        </span>

        <span className="font-medium">{info.email}</span>
      </div>

      <div className="flex justify-between text-base">
        <span className="flex items-center">
          <PhoneFilled />
          <span className="ml-1">Phone</span>
        </span>

        <span className="font-medium">{info.phone}</span>
      </div>

      <div className="border-t-2 w-full my-5"></div>

      <div className="mb-4">
        <div className="font-medium text-lg mb-1">Skill</div>

        <div className="text-left">{renderSkillCertification(info.skill)}</div>
      </div>

      <div>
        <span className="font-medium text-lg mb-1">Certification</span>

        <div className="text-left">
          {renderSkillCertification(info.certification)}
        </div>
      </div>

      <button
        onClick={showModalThem}
        className="text-gray-500 hover:text-gray-700 mt-4"
      >
        <EditOutlined className="text-2xl" />
      </button>

      <Modal
        centered
        open={modalOpen.isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <TrangSuaUser infoUser={info} />
      </Modal>
    </Card>
  );
};
export default ThongTinCaNhan;
