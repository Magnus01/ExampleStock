import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

import { incrementCounter,
			 	 decrementCounter,
				 emailExist,
			   createStudents} from '../../actions/student'

import SideBar from '../Nav/side-bar'
import ProgressBar from './Nav/progress-bar'


class CreateStudent extends Component {

	constructor(props) {
		super(props)

		this.state = {
			redirectTo : false,
			redirectBack : false,
			correctionData : []
		}
	}

	componentWillMount = () => {
		let correctionData = this.state.correctionData
		correctionData.push({ email : ''})
  }

	componentDidMount = () => {
		console.log('----------------- Classroom: ' + JSON.stringify(this.props.classroom.item))
	}

  redirectBack = () => {
		this.setState({
			redirectBack : true
		})
	}

	//add new Student UI
	studentUi = () => {
		let uiItems = []
		for(let i = 0; i < this.props.student.counter; i++) {
                uiItems.push(
				<div className="row_adding_addstudent w-row" key={i}>
					<div className="column_insertingstudent_addstudent w-col w-col-9 w-col-medium-9 w-col-small-9 w-col-tiny-9">
						<div className="selectName_lable_div">
							<label htmlFor="name" className="field-label-2">Student Name</label>
							<input type="text" value={ this.state.correctionData[i].email } className="enter_student_name w-input" maxLength="256" name="name" data-name="Name" placeholder="Enter Student Name" id="name"
																  onChange={ (e) => {this.handleChange(i, e)} } />
						</div>
					</div>
					<div className="column_deletebutton_addstudent w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
						<a href="#" className="remove_student w-button" onClick={ () => { this.removeStudent(i) } }>‍</a>
					</div>
				</div>
			)
		}
		return uiItems || null
	}

	//call addNewStudent function to append the new student textbox to the dom
	addStudent = () => {
		let correctionData = this.state.correctionData
		correctionData.push({ email : ''})

		this.props.incrementCounter()
	}

	removeStudent = (i) => {
		let newCorrectionData = this.state.correctionData.slice()
		newCorrectionData.splice(i, 1)

		this.props.decrementCounter()

		//Studet data
		this.setState({
			correctionData : newCorrectionData
		})
	}

	handleChange = (i, e) => {
		let correctionData = this.state.correctionData.slice()
		correctionData[i].email = e.target.value

		//Student data
		this.setState({correctionData})
	}


	postStudents = (e) => {
		e.preventDefault()
		for(let i = 0; i < this.state.correctionData.length; i++) {
			if(!this.state.correctionData[i].email) {
				this.state.correctionData.splice(i, 1)
			}
		}

		let json = {
			"studentInvitation" : this.state.correctionData
		}

		if(json.studentInvitation.length > 0) {
			this.props.createStudents(json, this.props.classroom.classroom_id)
			this.setState({ redirectTo : true })
		}


		//this.props.emailExist()

			this.setState({
				redirectTo : true
			})
	}



	render() {

		if(this.state.redirectBack) {
			return <Redirect push to ='/classroom-add'/>
		}
		else if(this.state.redirectTo) {
			return <Redirect push to={'/classroom/instructions/' + this.props.classroom.item.name + '/' + this.props.classroom.item.description } />
		}

		return(
			<div className="body-5">
				<SideBar/>
				<div className="background_color_addstudent_div">

					<ProgressBar pathname={this.props.location.pathname}/>

					<div className="section_addstudent">
						<div className="section_deatail_div_addstudent">
							<div className="headingandbutton_div">

								<div className="row_heading_addstudent w-row">
									<div className="column_heading_addstudent w-col w-col-9 w-col-medium-9 w-col-small-9 w-col-tiny-9">
										<h3 className="heading_addstudent">Add Student</h3>
									</div>
									<div className="column_addbutton_addstudent w-clearfix w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
										<a href="#" className="addbutton_addstudent w-button" onClick={this.addStudent}>‍</a>
									</div>
								</div>

							</div>

							<div className="divform_addstudent w-form">
								<form id="email-form" name="email-form" data-name="Email Form" className="form-3">

									{ this.studentUi() }

									<div className="backnext_button_div_addstudent">
										<input type="submit" data-wait="Please wait..." value=" " className="back_button w-button" onClick={this.redirectBack}/>
										<input type="submit" data-wait="Please wait..." value=" " className="next_button-copy w-button" onClick={this.postStudents}/>
									</div>
								</form>
								<div className="w-form-done">
									<div>Thank you! Your submission has been received!</div>
								</div>
								<div className="w-form-fail">
									<div>Oops! Something went wrong while submitting the form.</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	student : state.student,
	classroom : state.classroom
})

export default withRouter(connect( mapStateToProps,
																	 { incrementCounter,
																     decrementCounter,
																		 emailExist,
																	   createStudents })(CreateStudent))
