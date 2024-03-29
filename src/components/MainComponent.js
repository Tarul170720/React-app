import {  TransitionGroup,CSSTransition } from 'react-transition-group';
import React, { Component } from 'react';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FootterComponent';
import Menu from './MenuComponents';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {postFeedback,postComment,fetchDishes, fetchComments, fetchPromos ,fetchLeaders} from '../redux/ActionCreator';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message,id)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message,id)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments:()=>{dispatch(fetchComments())},
  fetchPromos:()=>{dispatch(fetchPromos())},
  fetchLeaders:()=>{dispatch(fetchLeaders())},

});


class Main extends Component {

componentDidMount(){
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
  this.props.fetchLeaders();
}
  
  render() {
    const HomePage = () => {
      return(
              <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.dishesLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commetsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    };
    return (
      <div>
        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
              <Route path='/home' component={HomePage} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} />} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route 
              exact path='/contactus' component={()=><Contact
                resetFeedbackForm={this.props.resetFeedbackForm} 
                postFeedback={this.props.postFeedback}                 
              />} />
              <Redirect to="/home" />
          </Switch>
        </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
