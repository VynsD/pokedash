import React from 'react';
import * as ANTD from 'antd';

function Loading() {
  return (
    <div className="grid-onlyElement">
      <ANTD.Spin tip="Loading..." />
    </div>
  );
}

export default Loading;
