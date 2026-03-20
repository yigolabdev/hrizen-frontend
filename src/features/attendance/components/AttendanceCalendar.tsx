import React, { useEffect, useState } from 'react';
import { Calendar, Badge } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { apiClient } from '@/lib/api';

interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: '출근' | '결근' | '지각' | '연차' | '휴가';
  note?: string;
}

function getListData(value: Dayjs, records: AttendanceRecord[]) {
  const dateStr = value.format('YYYY-MM-DD');
  return records.filter((record) => record.date === dateStr);
}

export default function AttendanceCalendar() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    async function fetchAttendance() {
      // Mock fetching data
      await new Promise((r) => setTimeout(r, 300));
      const mockData: AttendanceRecord[] = [
        { date: dayjs().format('YYYY-MM-DD'), status: '출근' },
        { date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), status: '지각', note: '교통 지연' },
        { date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), status: '연차' },
        { date: dayjs().subtract(5, 'day').format('YYYY-MM-DD'), status: '휴가' },
        { date: dayjs().subtract(7, 'day').format('YYYY-MM-DD'), status: '결근' },
      ];
      setRecords(mockData);
    }
    fetchAttendance();
  }, []);

  function dateCellRender(value: Dayjs) {
    const listData = getListData(value, records);

    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {listData.map((item, i) => {
          let color = '';
          switch (item.status) {
            case '출근':
              color = 'green';
              break;
            case '결근':
              color = 'red';
              break;
            case '지각':
              color = 'orange';
              break;
            case '연차':
              color = '#007AFF'; // 메인블루
              break;
            case '휴가':
              color = 'blue';
              break;
            default:
              color = 'gray';
          }
          return (
            <li key={i}>
              <Badge color={color} text={item.status} />
            </li>
          );
        })}
      </ul>
    );
  }

  return <Calendar dateCellRender={dateCellRender} fullscreen={false} />;
}
