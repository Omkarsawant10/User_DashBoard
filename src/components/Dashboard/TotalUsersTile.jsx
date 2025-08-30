
import Card from '../common/Card'
import { FiUsers } from 'react-icons/fi'


export default function TotalUsersTile({ total }) {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm text-slate-300">Total Users</div>
                    <div className="text-3xl font-extrabold">{total}</div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-white/10 grid place-items-center">
                    <FiUsers />
                </div>
            </div>
        </Card>
    )
}