import React from "react"
import Moment from "react-moment"

const HistoryTable = ({ history }) => {

    history.map((item) => {
        console.log(item[0])
    })
    return <>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Amount Paid</th>
                    <th scope="col">Order ID</th>
                </tr>
            </thead>
            <tbody>
                {history.slice(0).reverse().map((item, i) => (
                    <tr key={i}>
                        <td class="align-middle"><Moment to={item[0].date}></Moment></td>
                        <td class="align-middle">${item[0].amount}</td>
                        <td class="align-middle">{item[0].orderID}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default HistoryTable