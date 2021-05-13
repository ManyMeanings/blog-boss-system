import { Card, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  salesType: 'income' | 'from';
  salesPieData: API.VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="类别占比"
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="income">收入</Radio.Button>
            <Radio.Button value="from">用户来源</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>饼图</h4>
      <Pie
        hasLegend
        subTitle={salesType === 'income' ? '' : '用户数'}
        total={() => {
          const total = salesPieData.reduce((pre, now) => now.y + pre, 0);
          if (salesType === 'income') {
            return <Yuan>{total}</Yuan>;
          }
          return total;
        }}
        data={salesPieData}
        // eslint-disable-next-line consistent-return
        valueFormat={(value) => {
          if (salesType === 'income') return <Yuan>{value}</Yuan>;
          return value;
        }}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
);

export default ProportionSales;
