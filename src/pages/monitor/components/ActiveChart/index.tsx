import React from 'react';

import { Statistic } from 'antd';
import { MiniArea } from '../Charts';
import styles from './index.less';

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

function getActiveData() {
  const activeData = [];
  for (let i = 0; i < 24; i += 1) {
    activeData.push({
      x: `${fixedZero(i)}:00`,
      y: Math.floor(Math.random() * 200) + i * 50,
    });
  }
  return activeData;
}

export default class ActiveChart extends React.Component {
  state = {
    activeData: getActiveData(),
  };

  timer: number | undefined = undefined;

  requestRef: number | undefined = undefined;

  componentDidMount() {
    this.loopData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    if (this.requestRef) {
      cancelAnimationFrame(this.requestRef);
    }
  }

  loopData = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = window.setTimeout(() => {
        this.setState(
          {
            activeData: getActiveData(),
          },
          () => {
            this.loopData();
          },
        );
      }, 5000);
    });
  };

  render() {
    const { activeData = [] } = this.state;

    return (
      <div className={styles.activeChart}>
        <Statistic title="目标评估" value="有望达到预期" />
        <div style={{ marginTop: 32 }}>
          <MiniArea
            animate={false}
            line
            borderWidth={2}
            height={84}
            scale={{
              y: {
                tickCount: 3,
              },
            }}
            yAxis={{
              tickLine: undefined,
              label: undefined,
              title: undefined,
              line: undefined,
            }}
            data={activeData}
          />
        </div>
        {activeData && (
          <div className={styles.activeChartLegend}>
            <span>00:00</span>
            <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
            <span>{activeData[activeData.length - 1].x}</span>
          </div>
        )}
      </div>
    );
  }
}
