
import React,{Component} from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class Layout extends Component{
    
    state = {
        showSideDrawer:false
    }


    SideDrawerClosedHandler = () =>{
      this.setState({showSideDrawer:false})
    }

    SideDrawerToggleHandler = () =>{
         this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
         })
    }

    render(){

        return(
            <Aux>
                <div>
                    <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.SideDrawerToggleHandler}/>
                    <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
               </div>
               <main className={classes.Content}>
                     {this.props.children}
              </main>
           </Aux>
        );
    }

} 

const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.token !== null
    };
}


export default connect(mapStateToProps)(Layout);