import { useEffect, useState } from 'react'
import './MeetingsPage.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3010'

type Group = { id: number; name: string }
type Meeting = { id: number; groupId: number; start: string; end: string; description: string; room: string }

function duration(start: string, end: string){
    const s = new Date(start)
    const e = new Date(end)
    const mins = Math.round((e.getTime()-s.getTime())/60000)
    const h = Math.floor(mins/60)
    const m = mins%60
    return `${h}h ${m}m`
}

export default function MeetingsPage(){
    const [groups, setGroups] = useState<Group[]>([])
    const [selected, setSelected] = useState<number | null>(null)
    const [meetings, setMeetings] = useState<Meeting[]>([])

    useEffect(()=>{ fetch(`${API_BASE}/api/groups`).then(r=>r.json()).then(setGroups) },[])

    useEffect(()=>{
        if (selected==null) return setMeetings([])
        fetch(`${API_BASE}/api/meetings/group/${selected}`).then(r=>r.json()).then(setMeetings)
    },[selected])

    async function del(id:number){
        await fetch(`${API_BASE}/api/meetings/${id}`, { method: 'DELETE' })
        setMeetings(m=>m.filter(x=>x.id!==id))
    }

    // group meetings by local date (YYYY-MM-DD)
    const grouped: Record<string, Meeting[]> = meetings.reduce((acc, m) => {
        const key = new Date(m.start).toISOString().slice(0,10)
        ;(acc[key] ||= []).push(m)
        return acc
    }, {} as Record<string, Meeting[]>)

    const sortedDates = Object.keys(grouped).sort((a,b) => new Date(a).getTime() - new Date(b).getTime())

    return (
        <div className="MeetingsPage">
            <h2>Meetings</h2>
            <div className="controls">
                <label>Group: </label>
                <select value={selected ?? ''} onChange={e=>setSelected(e.target.value?Number(e.target.value):null)}>
                    <option value="">-- choose group --</option>
                    {groups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
                <button className="add-btn" onClick={()=>window.location.href='/add'}>Add Meeting</button>
            </div>

            {meetings.length===0 && <p>No meetings</p>}

            {sortedDates.map(dateKey => (
                <div className="date-group" key={dateKey}>
                    <h3>{new Date(dateKey).toLocaleDateString()}</h3>
                    <div className="cards">
                        {grouped[dateKey].sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime()).map(m=>{
                            const isFuture = new Date(m.start) > new Date()
                            return (
                                <div key={m.id} className={`card ${isFuture? 'future' : 'past'}`}>
                                    <div className="card-top">
                                        <div className="card-title"><strong>{m.room}</strong></div>
                                        <div className="card-duration">{duration(m.start, m.end)}</div>
                                    </div>
                                    <div className="card-time">{new Date(m.start).toLocaleTimeString()} → {new Date(m.end).toLocaleTimeString()}</div>
                                    <p className="card-desc">{m.description}</p>
                                    <div className="card-actions">
                                        <button onClick={()=>window.location.href = `/edit/${m.id}`}>Edit</button>
                                        <button onClick={()=>del(m.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
