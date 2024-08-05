import { useState } from 'react';
import { Button } from 'antd';
import styles from './index.module.less';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.wrap}>
      <div className={styles.count}>{count}</div>
      <Button
        type='primary'
        onClick={() => {
          setCount(count + 1);
        }}
      >
        按钮
      </Button>
    </div>
  );
}
