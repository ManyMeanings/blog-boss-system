import { Col, Row } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import type { Dispatch } from 'umi';
import { connect } from 'umi';

import { getTimeDistance } from './utils/utils';
import styles from './style.less';

import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';
// import OfflineData from './components/OfflineData';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

interface AnalysisProps {
  dashboardAndanalysis: API.AnalysisData;
  dispatch: Dispatch;
  loading: boolean;
}

interface AnalysisState {
  salesType: 'income' | 'from';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    salesType: 'income',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAndanalysis/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndanalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    // const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    // dispatch({
    //   type: 'dashboardAndanalysis/fetchSalesData',
    // });
  };

  selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    // const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    // dispatch({
    //   type: 'dashboardAndanalysis/fetchSalesData',
    // });
  };

  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    const { rangePickerValue } = this.state;
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType } = this.state;
    const { dashboardAndanalysis, loading } = this.props;
    const { visitData2, salesData, searchData, typeData1, typeData2 } = dashboardAndanalysis;
    const visitData = [
      {
        x: '2021-05-13',
        y: 8846,
      },
      {
        x: '2021-05-14',
        y: 8875,
      },
      {
        x: '2021-05-15',
        y: 10211,
      },
      {
        x: '2021-05-16',
        y: 5679,
      },
      {
        x: '2021-05-17',
        y: 7756,
      },
      {
        x: '2021-05-18',
        y: 9998,
      },
      {
        x: '2021-05-19',
        y: 8798,
      },
      {
        x: '2021-05-20',
        y: 7788,
      },
      {
        x: '2021-05-21',
        y: 7654,
      },
      {
        x: '2021-05-22',
        y: 6543,
      },
      {
        x: '2021-05-23',
        y: 6189,
      },
      {
        x: '2021-05-24',
        y: 6122,
      },
      {
        x: '2021-05-25',
        y: 7875,
      },
      {
        x: '2021-05-26',
        y: 5345,
      },
      {
        x: '2021-05-27',
        y: 8876,
      },
    ];
    let salesPieData;
    if (salesType === 'income') {
      salesPieData = typeData1;
    } else {
      salesPieData = typeData2;
    }

    return (
      <GridContent>
        <React.Fragment>
          <IntroduceRow loading={loading} visitData={visitData} />
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            selectDate={this.selectDate}
          />
          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <TopSearch loading={loading} visitData2={visitData2} searchData={searchData} />
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <ProportionSales
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData}
                handleChangeSalesType={this.handleChangeSalesType}
              />
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardAndanalysis,
    loading,
  }: {
    dashboardAndanalysis: any;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dashboardAndanalysis,
    loading: loading.effects['dashboardAndanalysis/fetch'],
  }),
)(Analysis);
