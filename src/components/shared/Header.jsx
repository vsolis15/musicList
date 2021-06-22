import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => <NavLink tag={Link} to="/account/login">Log In</NavLink>;
const renderRegister = () => <NavLink tag={Link} to="/account/register">Register</NavLink>;
// const renderRegistered = () => <span>Thank You for being with MusicList!</span>
// const renderGreeting = name => <span>Welcome, {name}</span>

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logOutClick = this.logOutClick.bind(this);
    this.renderGreeting = this.renderGreeting.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  logOutClick(e) {
    e.preventDefault();
    const { logUserOutFunction } = this.props;
    logUserOutFunction();
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderGreeting(name) {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          Welcome, {name} | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
        </NavItem>
      </Nav>
    );
  }

  render() {
    const { isLoggedIn, firstName } = this.props.authentication;
    return (
      <header className="wrapper">
        <Navbar color="faded" light toggleable={1}>
          <NavbarToggler right={1} onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">MusicList</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            { isLoggedIn ? this.renderGreeting(firstName) : renderLogin() }
            { renderRegister() }
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

// export default function Header(props) {
//   const { username } = props;
//   return (
//       <header>
//         <h1>MusicList</h1>
//         <div className="user-menu">
//           <h2>Welcome { username }</h2>
//           <nav>
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/account/profile/cwbuecheler">Profile</Link></li>
//             </ul>
//           </nav>
//         </div>    
//       </header>
//   );
// }
