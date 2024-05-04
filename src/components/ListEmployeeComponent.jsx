
import React,{useEffect, useState} from 'react'
import { listEmployees,deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
const ListEmployeeComponent = () => {
// const dummyData=[{
//     "id":1,
//     "firstName":"Ramesh",
//     "lastName":"kumar",
//     "email":"ramesh@gmail.com"
// },
// {
//     "id":2,
//     "firstName":"Bhabesh",
//     "lastName":"kumar",
//     "email":"bhabesh@gmail.com"
// },
// {
//     "id":3,
//     "firstName":"Akash",
//     "lastName":"kumar",
//     "email":"akash@gmail.com"
// }
// ]
    
//Use StateHook to use statevariable in a functional interface

    const [employees,setEmployees] =useState([])

        useEffect(()=>{
            getAllEmployees();
        },[])

        function getAllEmployees(){
            listEmployees().then((response)=>{
                setEmployees(response.data);
            }).catch(error =>{
                console.error(error);
            })
        }
        const navigator=useNavigate();
      function addNewEmployee(){
            navigator('/add-employee')
      }  
      function updateEmployee(id){
        navigator(`/edit-employee/${id}`)

    }
    function removeEmployee(id){
        //console.log(id);
       
        deleteEmployee(id).then((response)=>{
            //console.log(response.data);
            getAllEmployees()
        }).catch((error)=>{
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <button type="button" className="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
        <table className='table  table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee=>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}
                                    style={{marginLeft: "10px"}}
                                >Delete</button>
                            </td>
                        </tr>
                    )
                }
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent