import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [values, setValues] = useState({});
  useEffect(() => {
    console.log(values);
  }, [values])

  let valid = Object.keys(values).length;

  return (
    <div className="App">
      <h1 style={{cursor: "pointer"}} onClick={() => setValues({})}>Travelopia</h1>
      {!valid && <FormInput setValues={setValues}/>}
      {valid !== 0 && <FormSuccess values={values}/>}
    </div>
  );
}

export default App;



const FormSuccess = ({values}) => {
  return (
    <div>
      <h3>Successfully Updated</h3>
      <p>Name: {values.name} </p>
      <p>Email: {values.email} </p>
      <p>Location: {values.location} </p>
      <p>Number of persons: {values.headCount} </p>
      <p>Budget per person: {values.budget} </p>
          
    </div>
  );
};



const FormInput = ({setValues}) => {
  const [focused, setFocused] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = Object.fromEntries(data.entries());
    console.log(Object.fromEntries(data.entries()));
    // setValues(Object.fromEntries(data.entries()));
    
    const setTrip = async () => {
      try {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL, obj);
        console.log(res);
        setValues(res.data);
        e.target.reset();
      } catch(err) {
        console.log(err);
        setErrors(err.response.data);
      }
    }
    setTrip();
  }

  console.log(process.env.SERVER_URL);

  return (
    <form className='formContainer' onSubmit={handleSubmit}>
      <label>Name</label>
      <input name="name" type="text" required pattern='^[A-Za-z0-9]{3,16}$' onBlur={() => setFocused(true)} focused={focused.toString()} />
      <span>Name should be 3 to 16 characters in length and cannot include any special characters</span>
      <label>Email</label>
      <input name="email" type="email" required />
      <label>Where do you want to go?
        <div className='dropMenu'>

          <select name="location" required>
            <option value="india">India</option>
            <option value="africa">Africa</option>
            <option value="europe">Europe</option>
          </select>
        </div>
      </label>
      <label>Number of travellers</label>
      <input name="headCount" type="number" required min="1" defaultValue="1" max="10" />
      <label>Budget per person</label>
      <input name="budget" type="number" required defaultValue="100" min="100" step="50" max="10000" />
      <button>Submit</button>
      <div className='error'>{errors.length > 0 && errors.map((error) => <div>{error.msg}</div>)}</div>
    </form>
  );
};
