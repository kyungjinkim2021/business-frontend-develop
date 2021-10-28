import { memo } from 'react';
import { Modal } from 'antd';
import DaumPostcode from 'react-daum-postcode';

interface IDaumPostcode {
  onComplete: (data: any) => void;
  onToggle: () => void;
  visible: boolean;
}

function DaumPostModal({ onComplete, onToggle, visible }: IDaumPostcode) {
  return (
    <Modal
      title="주소 찾기"
      visible={visible}
      onOk={onToggle}
      onCancel={onToggle}
      okText="확인"
      cancelText="취소"
      width={550}
      destroyOnClose
    >
      <DaumPostcode onComplete={onComplete} style={{ height: 395 }} />
    </Modal>
  );
}

export default memo(DaumPostModal);
