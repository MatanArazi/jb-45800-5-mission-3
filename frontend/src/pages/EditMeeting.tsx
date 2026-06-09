import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3010'

export default function EditMeeting(){
    const { id } = useParams()
    const [groups, setGroups] = useState<{id:number,name:string}[]>([])
    const [form, setForm] = useState({groupId:'', start:'', end:'', description:'', room:''})
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{ fetch(`${API_BASE}/api/groups`).then(r=>r.json()).then(setGroups) },[])

    useEffect(()=>{
        if (!id) return
        fetch(`${API_BASE}/api/meetings/${id}`).then(r=>r.json()).then((m:any)=>{
            setForm({ groupId: String(m.groupId), start: m.start.slice(0,16), end: m.end.slice(0,16), description: m.description, room: m.room })
        })
    },[id])

    // pure validation for render-time checks
    function getValidationMessage(values = form){
        if (!values.groupId) return 'Group is required'
        if (!values.start || !values.end) return 'Start and end are required'
        const s = new Date(values.start)
        const e = new Date(values.end)
        if (s >= e) return 'Start must be before end'
        return null
    }

    async function submit(e:any){
        e.preventDefault()
        const v = getValidationMessage()
        if (v) { setError(v); return }
        const payload = { groupId: Number(form.groupId), start: new Date(form.start).toISOString(), end: new Date(form.end).toISOString(), description: form.description, room: form.room }
        const res = await fetch(`${API_BASE}/api/meetings/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
        if (res.ok) window.location.href='/'
        else {
            const text = await res.text()
            setError('Failed to update: '+text)
        }
    }

    return (
        <div>
            <h2>Edit Meeting</h2>
            <form onSubmit={submit}>
                <div>
                    <label>Group</label>
                    <select required value={form.groupId} onChange={e=>setForm({...form, groupId:e.target.value})}>
                        <option value="">--select--</option>
                        {groups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Start</label>
                    <input required type="datetime-local" value={form.start} onChange={e=>setForm({...form, start:e.target.value})} />
                </div>
                <div>
                    <label>End</label>
                    <input required type="datetime-local" value={form.end} onChange={e=>setForm({...form, end:e.target.value})} />
                </div>
                <div>
                    <label>Room</label>
                    <input required value={form.room} onChange={e=>setForm({...form, room:e.target.value})} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea required value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
                </div>
                {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
                <button type="submit" disabled={!!getValidationMessage()}>Update</button>
            </form>
        </div>
    )
}
