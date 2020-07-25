import React,{ Component } from 'react';
import { Button,Modal,ModalBody,ModalHeader,Label } from 'reactstrap';
import { Control , LocalForm,Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }   
    render(){
        return(
            <div>
                <div>
                <Button outline onClick={this.toggleModal} ><i class="fa fa-pencil" aria-hidden="true"></i>Submit Comment</Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.Modal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment
                    </ModalHeader> 
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)} >
                            <div className="form-group">
                                <Label htmlFor="rating" className="bol">Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </Control.select>
                                </div >
                            <div className="form-group">
                                <Label htmFor="author" className="bol">Your Name</Label>
                                <Control.text model=".author" placeholder="Your Name" name="author" className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </div>
                            <div className="form-group">
                    
                    <Label htmlFor="comment" className="bol">Comment</Label>
                    
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="6"
                            className="form-control"/>
                    
                    </div>
                           
                            <Button type="submit" value="sumbit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}


export default CommentForm;