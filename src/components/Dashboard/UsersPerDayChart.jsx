import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../common/Card'


export default function UsersPerDayChart({ data }) {
    return (
        <Card className="h-72">
            <div className="mb-3 font-semibold">Users Created Per Day (Last 30 days)</div>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line dataKey="count" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}