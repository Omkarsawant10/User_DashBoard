import useUsers from '../hooks/useUsers'
import TotalUsersTile from '../components/Dashboard/TotalUsersTile'
import UsersPerDayChart from '../components/Dashboard/UsersPerDayChart'
import AvatarDistributionChart from '../components/Dashboard/AvatarDistributionChart'
import RecentUsersList from '../components/Dashboard/RecentUsersList'
import { useMemo } from 'react'


function getLastNDaysLabels(n) {
    const labels = []
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        labels.push(d.toISOString().slice(0, 10))
    }
    return labels
}


export default function DashboardPage() {
    const { users, loading } = useUsers()


    const total = users.length


    const usersPerDay = useMemo(() => {
        const labels = getLastNDaysLabels(30)
        const counts = Object.fromEntries(labels.map(d => [d, 0]))
        users.forEach(u => {
            const k = new Date(u.createdAt).toISOString().slice(0, 10)
            if (counts[k] !== undefined) counts[k]++
        })
        return labels.map(lbl => ({ date: lbl.slice(5), count: counts[lbl] }))
    }, [users])


    const avatarDist = useMemo(() => {
        let withA = 0, withoutA = 0
        users.forEach(u => u.avatar ? withA++ : withoutA++)
        return [{ name: 'With Avatar', value: withA }, { name: 'No Avatar', value: withoutA }]
    }, [users])


    


    if (loading) return <div className="p-6">Loading...</div>


    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>


            <div className="grid md:grid-cols-3 gap-4">
                <TotalUsersTile total={total} />
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <UsersPerDayChart data={usersPerDay} />
                    <AvatarDistributionChart data={avatarDist} />
                </div>
            </div>


            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    
                </div>
                <RecentUsersList users={users} />
            </div>
        </div>
    )
}