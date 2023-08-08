import { Route, Routes } from "react-router-dom"
import { Button } from "reactstrap"
import { logout } from "./managers/UserManager"
import { GroupPage } from "./groups/GroupPage"


export const ApplicationViews = () => {
    return(
        <Routes>
            <Route path="/" element={<GroupPage />} />
        </Routes>
    )
}