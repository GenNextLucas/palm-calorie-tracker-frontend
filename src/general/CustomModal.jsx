import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../App.css'

export const CustomModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if(!dialog) return;

        if(isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current;
        
        const handleCancel = (e) => {
            e.preventDefault();
            onCancel();
        };

        dialog?.addEventListener('cancel', handleCancel);
        return () => dialog?.removeEventListener('cancel', handleCancel)
    },[onCancel])

    if (!isOpen) return null;

    return createPortal (
        <dialog ref={dialogRef} className='custom-modal-dialog'>
            <div className='modal-container'>
                <h3 className='modal-title'>{title}</h3>
                <p className="modal-text">{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="btn-secondary">Cancel</button>
                    <button onClick={onConfirm} className="btn-danger">Delete</button>
                </div>
          </div>
        </dialog>,
        document.body
    );
};

