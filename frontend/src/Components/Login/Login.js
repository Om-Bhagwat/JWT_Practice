import React,{useState} from 'react';
import axios from 'axios';

const Login = (props)=>{


    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword
    } = props;
    
    const [flag,setFlag] = useState(true);

    const changeFlag=(e)=>{
        e.preventDefault();

        setFlag(!flag);
    }

    const signIn=async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3002/api/user/login',{
                email:email,
                password:password,
            },);

            console.log(response);
        }catch(error){
            console.log(error);
        }

        console.log(email);
        console.log(password);
        setPassword('');
        setEmail('');
    }

    const signUp = async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3002/api/user/register',{
                email:email,
                password:password,
                name:name,
            },);
            console.log(response);

        }catch(error){
            console.log(error);
        }

        console.log(email);
        console.log(password);
        console.log(name);
        setPassword('');
        setEmail('');
        setName('');
    }

    return(
        <div>
            {flag?(
                <>

                    <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email"  value={email } onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="email"  value={name } onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter Name"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your Name with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password"/>
                    </div>
                    <button type="submit" onClick={signUp} class="btn btn-primary">Submit</button>
                    <p>Already have an Account? </p><button onClick={changeFlag}>Sign in</button>
                    </form>
                </>
            ):(
                <>
                    <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email"  value={email } onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button type="submit" onClick={signIn} class="btn btn-primary">Submit</button>
                    <p>Dont't have an Account? </p><button onClick={changeFlag}>Sign up</button>
                    </form>
                </>
            )}
        </div>
    )
}

export default Login;