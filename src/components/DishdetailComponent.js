import { FadeTransform,Fade,Stagger} from 'react-animation-components';
import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle,BreadcrumbItem,Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';
import  {Loading} from './LoadingComponent'
import CommentForm  from './CommentFormComponent';
import { baseUrl } from '../shared/baseUrl';
function RenderComments({comments ,postComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        return (
            <div className='col-12 col-md-6 m-2'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform in 
            transformProps={{
                exitTransform:'scale(0.5) translateY(-50%)'}
            }>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            
                        </CardBody>
                    </Card> 
              </FadeTransform>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const Dishdetail=(props)=>{
        console.log('Dishdetail Componment render invoked')
        
        const dish = props.dish
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        if (dish == null) {
            return (<div></div>)
        }
       else
        return (
            <div className="container">
                
                   <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        
                        <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                   
                </div>
            </div>
        );
    }


export default Dishdetail;
