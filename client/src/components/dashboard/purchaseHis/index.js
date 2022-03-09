import React from "react"
import DashboardLayout from "hoc/dashboardLayout"
import HistoryTable from "./historyTable"
import { useSelector } from "react-redux"

const PurchaseHis = () => {
    const history = useSelector(state => state.users.data.history)

    return <>
        <DashboardLayout>
            <div class="h1 fw-bold">Purchase History</div>

            <div class="bg-light">


                <HistoryTable history={history} />

            </div>
        </DashboardLayout>


    </>
}

export default PurchaseHis