import React,{useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import '../../loginStyles.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import {  useHistory } from "react-router-dom";
function Login() {
	let history = useHistory();
	const [user, setUser] = useState({name: '',password: ''});
	const [storedUser, setStoredUser] = useState([]);
	const { name, password } = user;
	const handleUser = (e)=>{
		setUser({...user,[e.target.name]: e.target.value})
	}
	useEffect(()=>{
		Axios.get(`http://localhost:4000/user`)
		.then(res => setStoredUser(res.data))
	},[])
	const onSubmit = () =>{
		if(name === storedUser[0].name){
			if(user.password === storedUser[0].password){
			    history.push('./employees')
			}else{
				alert('Wrong Password');
			}
		}else{
			alert('User not found');
		}
	}

    return (
		<Container  className='login'>
			<Form onSubmit={(e) =>onSubmit() }>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>User Name</Form.Label>
					<Form.Control value={name} name='name' type="text" placeholder="Username" onChange={e => handleUser(e)}/>
					<Form.Text className="text-muted">
					We'll never share your username with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control value={password} name='password' type="password" placeholder="Password" onChange={e => handleUser(e)}/>
				</Form.Group>
				<Form.Group controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
    )
}

export default Login
