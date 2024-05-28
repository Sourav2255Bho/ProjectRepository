import './App.css';
import { EmployeeData } from './EmployeeData';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [data, setdata] = useState([]);
  const [formdetails, setFormDetails] = useState({id:"", firstName:"", lastName:"", age:""})
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(()=>{
    setdata(EmployeeData)
  },[])

  const handleEdit =(id)=> {
    var emp = data.filter(ob => ob.id === id)
    if(emp !== undefined){
      setIsUpdate(true);
      setFormDetails(emp[0]);
    }
  }

  const handleDelete =(id)=> {
    if(id > 0){
      if(window.confirm("Are you sure to delete this Employee Data ? ")){
        const dt = data.filter(ob => ob.id !== parseInt(id))
        setdata(dt);
      }
     
    }
  }

  const handleSave=(event)=>{
    event.preventDefault();
    if(formdetails.firstName!=="" || formdetails.lastName!== "" || formdetails.age!==""){
      var dt = [...data];
      var newData = {id : EmployeeData.length+1, firstName:formdetails.firstName, lastName: formdetails.lastName, age:parseInt(formdetails.age)}
      dt.push(newData);
      setdata(dt);
      handleClear();
    }
  }

  const handleClear=()=>{
    setFormDetails({firstName:"", lastName:"", age:""})
    setIsUpdate(false);
  }

  const handleUdate=()=>{
      var index = data.map((item, key)=>{
        return item.id;
      }).indexOf(formdetails.id);
      if(index!== -1){
        var dt = [...data]
        dt.splice(index, 1, formdetails)
        setdata(dt);
        handleClear();
      }
  }

  const handleFname=(event)=>{
    setFormDetails({...formdetails, firstName:event.target.value})
  }

  const handleLname=(event)=>{
    setFormDetails({...formdetails, lastName:event.target.value})
  }

  const handleAge=(event)=>{
    setFormDetails({...formdetails, age:event.target.value})
  }

  return (
    <div className="App">

      <div className='container-fluid' style={{marginTop:"20px", marginBottom:"30px"}}>
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <label>First Name : 
              <input type="text" placeholder='First Name' name="firstName" id="firstName" value={formdetails.firstName} onChange={handleFname}/>
            </label>
          </div>
          <div className='col-sm-12 col-md-3'>
            <label>Last Name : 
              <input type="text" placeholder='Last Name' name="lastName" id="lastName" value={formdetails.lastName} onChange={handleLname} />
            </label>
          </div>
          <div className='col-sm-12 col-md-3'>
            <label>Age : 
              <input type="number" placeholder='Age' name="age" value={formdetails.age} onChange={handleAge}/>
            </label>
          </div>
          <div className='col-sm-12 col-md-3'>

            {
              !isUpdate ? <button className='btn btn-success' onClick={(e)=>{handleSave(e)}}>Save</button> : <button className='btn btn-primary' onClick={()=>{handleUdate()}}>Update</button>
            }
            &nbsp;&nbsp;
            <button className='btn btn-danger'onClick={()=>{handleClear()}}>Clear</button>&nbsp;
          </div>
        </div>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>
                      <button className='btn btn-primary' onClick={()=>{handleEdit(item.id)}}>Edit</button>&nbsp;
                      <button className='btn btn-danger'onClick={()=>{handleDelete(item.id)}}>Delete</button>&nbsp;
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
    </div>
  );
}

export default App;
