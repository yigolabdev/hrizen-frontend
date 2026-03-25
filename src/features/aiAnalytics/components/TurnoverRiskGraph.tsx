import React, { useState } from 'react';
import { Card, Tag, Table, Progress, Select, Tooltip as AntTooltip, Space, Typography } from 'antd';
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
} from 'recharts';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

interface EmployeeRisk {
  key: string;
  name: string;
  department: string;
  tenure: number;
  satisfaction: number;
  riskScore: number;
  riskLevel: '높음' | '보통' | '낮음';
  factors: string[];
}

const employeeRiskData: EmployeeRisk[] = [
  { key: '1', name: '김민준', department: '개발팀', tenure: 3.2, satisfaction: 45, riskScore: 87, riskLevel: '높음', factors: ['급여 불만족', '야근 과다', '승진 정체'] },
  { key: '2', name: '이서연', department: '마케팄팀', tenure: 1.5, satisfaction: 52, riskScore: 78, riskLevel: '높음', factors: ['업문 과분하', '팀 갈등'] },
  { key: '3', name: '박지호', department: '영업팀', tenure: 5.1, satisfaction: 61, riskScore: 65, riskLevel: '보통', factors: ['경력 정체', '급여 불만족'] },
  { key: '4', name: '최수빈', department: '인사팀', tenure: 2.8, satisfaction: 58, riskScore: 62, riskLevel: '뷴통', factors: ['업무 환경', '성장 기회 부족'] },
  { key: '5', name: '젔유진', department: '개발팀', tenure: 4.3, satisfaction: 72, riskScore: 41, riskLevel: '낮음', factors: ['경미한 불만'] },
  { key: '6', name: '한도윤', department: '디자인팀', tenure: 0.8, satisfaction: 38, riskScore: 91, riskLevel: '높음', factors: ['적쑉 실�('��Ɉ����h����˙�r�~����z��h��x��u����Ӱ��6��7BvWE&�6�6���"���WfVâ7G&��r��7G&��r����7v�F6���WfV��66R~�i.�(�s�&WGW&�r4dc4#3s��66R~�;N�k�s�&WGW&�r4dc�Ss��66R~�*����s�&WGW&�r33D3sS�s��FVfV�C�&WGW&�r3�S�S�2s��ЧӰ��6��7B6��V��3�6��V��5G�S�V����VU&�6������F�F�S�~��N�hBr�FF��FW��v��Rr��W��v��Rr�v�GF������F�F�S�~�h�I�r�FF��FW��vFW'F�V�Br��W��vFW'F�V�Br�v�GF�������F�F�S�~��N�y��	ȉ�r��FF��FW��w&�6�66�&Rr���W��w&�6�66�&Rr��v�GF��S��&V�FW#��66�&S��V�&W"�&V6�&C�V����VU&�6�������&�w&W70�W&6V�C׷66�&WТ6��S�'6��� �7G&��T6���#׶vWE&�6�6���"�&V6�&B�&�6��WfVТ�����6�'FW#���"����&�6�66�&R�"�&�6�66�&R�������F�F�S�~�Ȏ�y��;���r��FF��FW��w&�6��WfV�r���W��w&�6��WfV�r��v�GF����&V�FW#���WfVâ7G&��r����Fr6���#׶vWE&�6�6���"��WfV���WfV����Fs��������F�F�S�~Ɉ�ˊɩN�ۂr��FF��FW��vf7F�'2r���W��vf7F�'2r��&V�FW#��f7F�'3�7G&��u�Ғ�����76R6��S׳G�w&��f7F�'2����b��������Fr�W�׶��7G��S׷�f��E6��S����g���Fs���Т��76S�������Ӱ��W��'BFVfV�BgV�7F���GW&��fW%&�6�w&�����6��7B�f�Wr�6WEf�Wu��W6U7FFS�v6�'Br�wF&�Rs�v6�'Br����6��7B66GFW$FF�V����VU&�6�FF����R��������R�6F�6f7F�������R�&�6�66�&R����R�FV�W&R�����S�R���R��&�6��WfVâR�&�6��WfV���Ғ����&WGW&����6&@�&�&FW&VC׶f�6WТ7G��S׷�&�&FW%&F�W3�"�&6�w&�V�D6���#�r4dddddbr�ТF�F�Sװ��76S��v&��t�WFƖ�VB7G��S׷�6���#�r4dc4#3r�����7�7G��S׷�f��EvV�v�C�s�����N�xɸ���N�y��hN�I���7����76S�ТW�G&װ��6V�V7@�f�VS׷f�WwТ��6��vSײ��璒��6WEf�Wr��Т�F���3׵���f�VS�v6�'Br��&Vâ~�
�ث�r����f�VS�wF&�Rr��&Vâ~�X���N��Br����Т7G��S׷�v�GF���Т6��S�'6��� ���Т��f�Wr���v6�'Br����F�b7G��S׷�v�GF��sRr��V�v�C�3S����&W7��6�fT6��F��W"v�GF��#R"�V�v�C�#R#��66GFW$6�'B�&v��׷�F��#�&�v�C�#�&�GF�Ӣ#��VgC�#����6'FW6��w&�B7G&��TF6�'&��#22"7G&��S�"6ccc"��ń��2G�S�&�V�&W""FF�W��'�"��S�.�x����B"F�6�׷�f��E6��S�"����Ŕ��2G�S�&�V�&W""FF�W��'�"��S�.��N�y��	ȉ�"F�6�׷�f��E6��S�"����Ť��2G�S�&�V�&W""FF�W��'�"&�vS׵�c�#�����F���F����66GFW"FF׷66GFW$FF���66GFW$FF����V�G'����FW�������6V���W�׶��FW��f���׶vWE&�6�6���"�V�G'��&�6��WfV�����Т��66GFW#���66GFW$6�'C���&W7��6�fT6��F��W#���F�c������F&�P�FF6�W&6S׶V����VU&�6�FFТ6��V��3׶6��V��7Тv��F���׶f�6WТ6��S�'6��� �67&���׷���c�Т���Т��6&C����Р