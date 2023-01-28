import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";

const About = () => {

    // const navigate = useNavigate();
    const [userData, setUserData] = useState([])

    // useEffect(() => {
    //     fetch('/about').then(response => {
    //       setUserData(response.json())
    //     })
    //   }, [])

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
                // credentials: "include"
            })

            const data = await res.json()
            // console.log('data: ' + JSON.stringify(data));
            setUserData(data);
            console.log(JSON.stringify(userData))

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        callAboutPage();
    }, [setUserData])

    return (
        <>

            <div className="container">
                <h1>About</h1>

                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Room No.</th>
                            <th>Name</th>
                            <th>Roll No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((userData, index) => {
                                return (
                                    <tr key={index}>
                                        <td key={index}>{index + 1}</td>
                                        <td key={index}>{userData.roomNo}</td>
                                        <td key={index}>{userData.name}</td>
                                        <td key={index}>{userData.rollNo}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default About;