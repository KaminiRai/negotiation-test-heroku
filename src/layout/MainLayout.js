import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import Sidebar from './Sidebar';
import {Redirect } from 'react-router-dom';

import React from 'react';
import {
  MdImportantDevices
} from 'react-icons/lib/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from '../utils/constants';

class MainLayout extends React.Component {

  state={
    isAccountPage:true,
    islogout:false
  }

  componentWillMount(){
   // alert(this.state.isAccountPage)
  }

  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdImportantDevices />,
        message: 'Welome to Negotition!',
        level: 'info',
      });
    }, 1500);
  }

    pageDetail=(e,index)=>{
        if(index===4){
        localStorage.clear();
          this.setState({
            islogout:true,
          })
      }
    }
    

  // close sidebar when
  handleContentClick = event => {
 //  alert("handleAlert")
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {

    if(this.state.islogout){
      return <Redirect to={{
        pathname: "/login",
      }} />;
    }   

    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        
        <Sidebar
        pageDetail={this.pageDetail} 
        />

        <Content fluid onClick={this.handleContentClick}>

          <Header />
          {children}
          <Footer />
        </Content>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </main>
    );
  }
}

export default MainLayout;
