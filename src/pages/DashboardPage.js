import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import Page from '../components/Page';

import { NumberWidget } from '../components/Widget';

 class DashboardPage extends React.Component {

  
  
  componentDidMount() {
    
   window.scrollTo(0, 0);
  }

  render() {
    return (
     
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}>
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
             <NumberWidget
              title="Total Profit"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            /> 
          </Col>
          </Row>
          </Page>
    );
  }
 }
export default DashboardPage;
