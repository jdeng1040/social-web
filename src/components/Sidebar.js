import React from 'react'
import SidebarOption from "./SidebarOption"
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarOption Icon={AccountBoxIcon} text="Profile" active={true} />
            <SidebarOption Icon={ImportContactsOutlinedIcon} text="Feed" active={true} />
        </div>
    )
}

export default Sidebar

