import React, { useEffect, useState } from 'react';
import { Timeline, Card, Typography, Button, Modal, Spin } from 'antd';
import { apiClient } from '@/lib/api';
import { DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

type ContractDocument = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  status: '확인완료' | '미확인';
  fileUrl: string;
};

export default function ContractDocuments() {
  const [documents, setDocuments] = useState<ContractDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<ContractDocument | null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient.get('/ess/contracts').then(() => {
      // Mock 데이터
      const mockDocs: ContractDocument[] = [
        {
          id: 'c202401',
          title: '근로계약서 2024년 갱신',
          date: '2024-01-15',
          status: '확인완료',
          fileUrl: '/files/contracts/c202401.pdf',
        },
        {
          id: 'c202312',
          title: '근로계약서 2023년',
          date: '2023-12-10',
          status: '미확인',
          fileUrl: '/files/contracts/c202312.pdf',
        },
      ];
      setDocuments(mockDocs);
      setLoading(false);
    });
  }, []);

  function onDownload(url: string) {
    // 실제 다운로드는 API 및 서버에서 처리되어야 하나,
    // 여기서는 새탭 오픈 mock
    window.open(url, '_blank', 'noopener');
  }

  return (
    <Card
      title={<Title level={4} style={{ margin: 0, color: '#007AFF' }}>전자계약 문서</Title>}
      bordered={false}
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: '16px' }}
    >
      {loading ? (
        <Spin tip="로딩 중..." />
      ) : documents.length === 0 ? (
        <Paragraph>확인 가능한 전자계약 문서가 없습니다.</Paragraph>
      ) : (
        <Timeline mode="left">
          {documents.map((doc) => (
            <Timeline.Item
              key={doc.id}
              label={doc.date}
              color={doc.status === '확인완료' ? '#007AFF' : '#FF9500'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Title level={5} style={{ margin: 0 }}>
                    {doc.title}
                  </Title>
                  <Paragraph style={{ margin: 0, color: doc.status === '확인완료' ? '#007AFF' : '#FF9500' }}>
                    상태: {doc.status}
                  </Paragraph>
                </div>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size="small"
                  onClick={() => onDownload(doc.fileUrl)}
                  style={{ borderRadius: 6 }}
                >
                  다운로드
                </Button>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      )}
      <Modal
        visible={modalVisible}
        title={selectedDoc?.title}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={720}
        destroyOnClose
      >
        {/* 필요시 전자계약 상세 뷰 제공 가능 */}
      </Modal>
    </Card>
  );
}
