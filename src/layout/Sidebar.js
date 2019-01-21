import logo200Image from '../assets/img/logo/logo_200.png';
import sidebarBgImage from '../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../components/SourceLink';
import React from 'react';
import FaGithub from 'react-icons/lib/fa/github';
import {
  MdDashboard,
  MdInsertChart,
  MdWeb,
  MdWidgets,
} from 'react-icons/lib/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const navItems = [
  { to: '/dashboard', name: 'PENDING INVITATION', exact: true, Icon: MdDashboard },
  { to: '/dashboard', name: 'UPLOAD', exact: false, Icon: MdWeb },
  { to: '/dashboard', name: 'STATISTICS', exact: false, Icon: MdWeb },
  { to: '/account', name: 'ACCOUNT INFO', exact: false, Icon: MdInsertChart },
  { to: '/dashboard', name: 'LOGOUT', exact: false, Icon: MdWidgets },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Nav>
             <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                Negotiation <FaGithub />
              </span>
            </SourceLink>
       
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}
               onClick={(e)=>this.props.pageDetail(e,index)}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                  
                  >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}


          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
