"use client";

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig, App } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#5ca25a',
    borderRadius: 12,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    colorLink: '#5ca25a',
  },
  components: {
    Button: {
      borderRadius: 10,
      controlHeight: 40,
      fontWeight: 600,
    },
    Table: {
      borderRadius: 16,
      headerBg: '#f8fafc',
      headerColor: '#64748b',
    },
    Input: {
      borderRadius: 10,
      controlHeight: 42,
    },
  },
};

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <App className="flex flex-col min-h-screen flex-1 w-full">
          {children}
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
