import React from 'react'
import DuckImage from '../../static/images/Duck.jpg'
import classes from './History.scss'
import Adv from '../Adv'
import moment from 'moment'
import { Pagination ,  Alert , Tag , Table} from 'antd';
import {i18n} from '../../util/i18n'
var currentLimit = 10;
// export const History = () => (
export class History extends React.Component {
  componentWillMount(){
    this.state = {
      type : 'withdrawals'
    }
    this._getData('withdrawals')
  }

  _getData (url , page , limit){
    const { getHistoryList } = this.props;
    let offset = page || 0;
    let pageSize = limit || 10
    currentLimit = pageSize;
    let param = '?offset=' + offset*currentLimit + '&limit=' + pageSize
		let type = null;
		if(url.indexOf('withdrawals')>=0){
			type = 'withdrawals'
		}
		if(url.indexOf('rewards')>=0){
			type = 'rewards'
		}
		if(url.indexOf('offerwalls')>=0){
			type = 'offerwalls'
		}
    getHistoryList(`/${url}${param}` , type)
  }

  _changePage (url,page , limit){
    // if(page==1) return;
    const { historyData } = this.props;
    this._getData(url , page , limit)
  }

  changeType(type){
    this.setState({
      type
    })
    if(type === 'withdrawals'){
      return this._getData('/withdrawals')
    }
    if(type === 'rewards'){
      return this._getData('/incomes/rewards')
    }
    if(type === 'offerwall'){
      return this._getData('/incomes/offerwalls')
    }
  }

  renderWithDrawals (){
    let { historyData} = this.props;
		historyData = historyData.withdrawals;
      const columns = [{
        title: i18n.t('common.time'),
        dataIndex: 'updated_at',
        render(text) {
          return <a href="#">{text}</a>;
        }
      }, {
        title: i18n.t('common.amount'),
        dataIndex: 'amount'
      }, {
        title: i18n.t('history.transaction'),
        dataIndex: 'tx'
      }, {
        title: i18n.t('history.status'),
        dataIndex: 'status'
      }];

      const data = [];

      historyData && historyData.rewardList &&
      historyData.rewardList.length && historyData.rewardList.map( (v, k) => {
          data.push({
            key: `${k}`,
            updated_at:moment(`${v.updated_at}`).format("YYYY-MM-DD HH:mm:ss"),
            amount:`${v.amount.toFixed(8)}`,
            tx: ( ()=>{
              if(!v.tx_url) return null;
              return  <a href={v.tx_url}>blockchain</a>
            })(),
            status: (() => {
              if(`${v.status}` == 2){
                return  <Tag color="green">{i18n.t('history.handle_end')}</Tag>
              }else if(`${v.status}` == 1){
                return  <Tag  color="yellow">{i18n.t('history.handle_ing')}</Tag>
              }else{
                return  <Tag  color="red">{i18n.t('history.wait_handle')}</Tag>
              }
            })()
          });
      })

      const that = this;
      const pagination = {
        total: historyData && historyData.count,
        showSizeChanger: true,
        onShowSizeChange(current, pageSize){
          that._changePage('withdrawals' ,current -1 ,pageSize);
        },
        onChange(current) {
          that._changePage('withdrawals' , current -1,currentLimit );
        },
        // showTotal(){
        //   return (<span>总条数：{historyData && historyData.count}</span>)
        // }
      };
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          bordered={true}
        />
      )
  }

  renderRewards (){
    let { historyData } = this.props;
		historyData = historyData.rewards;
      const columns = [{
        title: i18n.t('common.time'),
        dataIndex: 'created_at',
        render(text) {
          return <a href="#">{text}</a>;
        }
      }, {
        title: i18n.t('common.amount'),
        dataIndex: 'income'
      }
      // , {
      //   title: i18n.t('history.transaction'),
      //   dataIndex: 'tx'
      // }, {
      //   title: i18n.t('history.status'),
      //   dataIndex: 'status'
      // }
    ];

      const data = [];
      historyData && historyData.rewardList &&
      historyData.rewardList.length && historyData.rewardList.map( (v, k) => {
          data.push({
            key: `${k}`,
            created_at:moment(`${v.created_at}`).format("YYYY-MM-DD HH:mm:ss"),
            income:`${v.income}`,
          });
      })

      const that = this;
      const pagination = {
        total: historyData && historyData.count,
        showSizeChanger: true,
        onShowSizeChange(current, pageSize){
          that._changePage('/incomes/rewards' ,current -1 ,pageSize);
        },
        onChange(current) {
          that._changePage('/incomes/rewards',current -1,currentLimit );
        },
      };
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          bordered={true}
        />
      )
  }

  renderOfferwall (){
    let { historyData } = this.props;
		historyData = historyData.offerwalls;
      const columns = [{
        title: i18n.t('common.time'),
        dataIndex: 'created_at',
        render(text) {
          return <a href="#">{text}</a>;
        }
      }, {
        title: i18n.t('common.amount'),
        dataIndex: 'income'
      }
      , {
        title: 'Type',
        dataIndex: 'type'
      }
      // , {
      //   title: i18n.t('history.status'),
      //   dataIndex: 'status'
      // }
    ];

      const data = [];
      historyData && historyData.rewardList &&
      historyData.rewardList.length && historyData.rewardList.map( (v, k) => {
          data.push({
            key: `${k}`,
            created_at:moment(`${v.created_at}`).format("YYYY-MM-DD HH:mm:ss"),
            income:`${v.income.toFixed(8)}`,
            type:(() => {
              if(`${v.type}` == "personaly"){
                return  <Tag color="green">{v.type}</Tag>
              }else if(`${v.status}` == "superrewards"){
                return  <Tag  color="yellow">{v.type}</Tag>
              }else{
                return  <Tag  color="red">{v.type}</Tag>
              }
            })(),
          });
      })

      const that = this;
      const pagination = {
        total: historyData && historyData.count,
        showSizeChanger: true,
        onShowSizeChange(current, pageSize){
          that._changePage('/incomes/offerwall' ,current -1 ,pageSize);
        },
        onChange(current) {
          that._changePage('/incomes/offerwall',current -1,currentLimit );
        },
      };
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          bordered={true}
        />
      )
  }

  renderItem (){
    // let { user , lu , type} = this.props;
    let type = this.state.type;
    const itmes= [{
      type : 'withdrawals',
      name : 'Payment'
    },{
      type : 'rewards',
      name : 'Claim'
    },{
      type : 'offerwall',
      name : 'Offerwall'
    }]
    let itemsNodeArr = []
    itmes.map( (v,k)=>{
      let active = v.type == type ? classes.active : null
      itemsNodeArr.push(
        <li
          key={'itemNode' + k}
          onClick={ ()=> {this.changeType(v.type)}}
          className={active}
        >
          {v.name}
        </li>
      )
    })
    return itemsNodeArr;
  }

  renderBody(){
    if(this.state.type === 'withdrawals'){
      return this.renderWithDrawals()
    }
    if(this.state.type === 'rewards'){
      return this.renderRewards()
    }
    if(this.state.type === 'offerwall'){
      return this.renderOfferwall()
    }
  }
  render (){
    console.log(this.props)
    return (
      <div className={classes.history}>
        <div>
          <ul className={classes.tabs}>
            {this.renderItem()}
          </ul>
        </div>
        <div className={classes.bg}>
          {
            this.renderBody()
          }
        </div>
      </div>
    )
  }

// )
}

export default History;
