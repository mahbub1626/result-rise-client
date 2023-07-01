import { useState } from 'react';
import NotificationModal from '../../../../components/modals/NotificationModal/NotificationModal';
import ShowNotification from "../../../../components/ShowNotification/ShowNotification";
import Layout from "../../../../Layout/Layout";




const index = () => {
  const [noticeForModal, setNoticeForModal] = useState({})
  return (
    <div>
      <Layout>
        <div className='bg-gray-200 min-h-screen'>
          <div className='p-4  overflow-scroll mx-auto'>
            <ShowNotification
              setNoticeForModal={setNoticeForModal}
            />
            {/* <label htmlFor="my-modal-10" className="btn">open modal</label> */}
          </div>
        </div>
      </Layout>
      <NotificationModal
        noticeForModal={noticeForModal}
        setNoticeForModal={setNoticeForModal}
      ></NotificationModal>
    </div>
  );
};

export default index;