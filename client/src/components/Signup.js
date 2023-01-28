import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        roomNo:"" , name:"" , rollNo:"" , phone:"" , startDate:"" , endDate:"" 
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { roomNo, name, rollNo, phone, startDate, endDate } = user;

        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomNo, name, rollNo, phone, startDate, endDate
            })
        });

        const data = await res.json();

        if (data.status === 422 || !data) {
            window.alert("Invalid Registration"); 
            console.log("Invalid Registration");
        } else {
            window.alert(" Registration Successful"); 
            console.log("Successful Registration");
            // navigate("/login");
        }
    }

        return (
            <>
                <div className="container">
                    <h1>Mess Link</h1>
                    <form method='POST'>
                        <div className="form-group">
                            <label htmlFor="usr">roomNo</label>
                            <input type="text" name='roomNo' className="form-control" id="usr1" value={user.roomNo} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">name</label>
                            <input type="text" name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.name} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">rollNo</label>
                            <input type="Number" name='rollNo' className="form-control" id="usr3" value={user.rollNo} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Phone No.</label>
                            <input type="Number" name='phone' className="form-control" id="usr2" value={user.phone} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">startDate</label>
                            <input type="text" name='startDate' className="form-control" id="exampleInputPassword1" value={user.startDate} onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">endDate</label>
                            <input type="text" name='endDate' className="form-control" id="exampleInputPassword2" value={user.endDate} onChange={handleInputs} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={PostData}>Submit</button>
                    </form>
                </div>

            </>
        )
    }

    export default Signup;