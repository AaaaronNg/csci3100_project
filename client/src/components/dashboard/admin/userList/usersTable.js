import React from "react"



const UsersTable = ({ userList, getUserId }) => {



    return <>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">UserId</th>
                    <th scope="col">Email</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    userList.map((item, i) => (
                        <tr key={item._id}>
                            <td class="align-middle">{item._id}</td>
                            <td class="align-middle">{item.email}</td>
                            <td class="align-middle">{item.firstname}</td>
                            <td class="align-middle">{item.lastname}</td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#changePWModal" onClick={() => getUserId(item._id)}>Edit</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
}

export default UsersTable