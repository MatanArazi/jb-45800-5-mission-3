import './Home.css'

export default function Home() {
    return (
        <div className="Home">
            <h1>Meetings Manager</h1>
            <p>Manage development team meetings — create, edit and delete meetings.</p>
            <img src="/assets/meeting.png" alt="meetings" style={{maxWidth: '400px'}} />
        </div>
    )
}
