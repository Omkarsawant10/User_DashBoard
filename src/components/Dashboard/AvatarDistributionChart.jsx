import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Card from '../common/Card'


const COLORS = ['#34D399', '#FB7185']


export default function AvatarDistributionChart({ data }) {
    return (
        <Card className="h-72">
            <div className="mb-3 font-semibold">Avatar Distribution</div>
            <div className="h-56">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label />
                        {data.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}