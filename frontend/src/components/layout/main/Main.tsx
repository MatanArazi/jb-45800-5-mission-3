import { Routes, Route } from "react-router-dom";
import Home from '../../../pages/Home'
import About from '../../../pages/About'
import MeetingsPage from '../../../pages/MeetingsPage'
import AddMeeting from '../../../pages/AddMeeting'
import EditMeeting from '../../../pages/EditMeeting'

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<MeetingsPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<AddMeeting />} />
            <Route path="/edit/:id" element={<EditMeeting />} />
        </Routes>
    )
}