import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../features/posts/api/posts.api";
import { Modal, Alert } from "antd";

function NotificationsModal({ visible, setVisible }) {
  const { notifications } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications(user.id));
  }, []);

  console.log(notifications);

  return (
    <Modal
      title="Notifications"
      centered
      open={visible}
      width={600}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      {notifications?.map((notification, index) => {
        return (
          <div key={index} className="flex justify-between items-center">
            <Alert
              className="w-full mt-4"
              message={`${notification.user.firstName} ${
                notification.user.lastName
              } 
            ${
              notification.notificationType === "like"
                ? "liked"
                : "commented on"
            }   
            your post`}
              type="info"
            />
          </div>
        );
      })}
    </Modal>
  );
}

export default NotificationsModal;
