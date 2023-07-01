import React from 'react';

const NotificationModal = ({ noticeForModal, setNoticeForModal }) => {
    return (
        <div>
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        onClick={() => setNoticeForModal(undefined)}
                        htmlFor="my-modal-10" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{noticeForModal?.title}</h3>
                    <p className="py-4">{noticeForModal?.body}</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;