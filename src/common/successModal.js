import { Modal } from "antd";


export const showCustomSuccessModal = (message, autoCloseDelay = 2000) => {
    const modal = Modal.success({
      icon: null,
      content: (
        <>
          <div style={{ textAlign: 'center' }}>
            Good Job
          </div>
          <div style={{ marginTop: '16px' }}>{message}</div>
        </>
      ),
      footer: null
    });

    setTimeout(() => {
      modal.destroy(); 
    }, autoCloseDelay);
  };