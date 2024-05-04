import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
function EmployeeComponent() {

    //Use StateHook to use statevariable in a functional interface
    const[firstname,setFirstName] =useState('')
    const[lastname,setLirstName] =useState('')
    const[email,setEmail] =useState('')

    const {id}=useParams();

    //for validation..
    const [errors,setErrors]=useState({
        firstname:'',
        lastname:'',
        email:''
    })


    const navigator=useNavigate();
   
    //used for get the employee with id  
    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                console.log(response.data);
                setFirstName(response.data.firstname);
                setLirstName(response.data.lastname);
                setEmail(response.data.email);
            }).catch((error)=>{
                console.log();
            })
        }
    },[id])

    

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee={firstname,lastname,email};
            if(id){
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees')
                }).catch((error)=>{
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees')
                }).catch((error)=>{
                    console.error(error);
                })
            }
        }
        
    }
   
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    function handelFirstName(e){
        setFirstName(e.target.value);
    }
    function handelLastName(e){
        setLirstName(e.target.value);
    }
    function handelEmail(e){
        setEmail(e.target.value);
    }

    function validateForm(){
        let valid=true;

        const errorsCopy={... errors}//Spread Operator.. to copy state object to another object..

        if(firstname.trim()){
            errorsCopy.firstname='';
        }else{
            errorsCopy.firstname='First name is required'
            valid=false;
        }

        if(lastname.trim()){
            errorsCopy.lastname='';
        }else{
            errorsCopy.lastname='last name is required'
            valid=false;
        }

        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email='email is required'
            valid=false;
        }
        setErrors(errorsCopy);
        return valid;
    }
   
  return (
    <div className='container'>
        <br />
        <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3 '>
                    {
                        pageTitle()
                    }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First name</label>
                            <input type="text" 
                                   placeholder='Enter Employee first Name'
                                   name='firstname'
                                   value={firstname}
                                   className={`form-control ${ errors.firstname ? 'is-invalid':''}`}
                                   onChange={handelFirstName}
                            />
                            {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                        </div>
                        <div className='form-group bm-2'>
                            <label className='form-label'>Last name</label>
                            <input type="text" 
                                   placeholder='Enter Employee Last Name'
                                   name='lastname'
                                   value={lastname}
                                   className={`form-control ${ errors.lastname ? 'is-invalid':''}`}
                                   onChange={handelLastName}
                            />
                            {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                        </div>
                        <div className='form-group bm-2'>
                            <label className='form-label'>Email</label>
                            <input type="email" 
                                   placeholder='Enter Employee Email'
                                   name='email'
                                   value={email}
                                   className={`form-control ${ errors.email ? 'is-invalid':''}`}
                                   onChange={handelEmail}
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <br />
                        <br />
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent