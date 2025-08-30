import Card from '../common/Card'
import Avatar from '../common/Avatar'

export default function RecentUsersList({ users = [] }) {
  
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5); 

  return (
    <Card>
      <div className="mb-3 font-semibold">Recently Joined Users</div>

      {recentUsers.length === 0 ? (
        <div className="text-sm text-gray-400">No recent users found.</div>
      ) : (
        <ul className="flex gap-4 overflow-x-auto pb-2">
          {recentUsers.map((u) => (
            <li
              key={u.id}
              className="flex-shrink-0 w-48 bg-white/5 p-3 rounded-lg flex items-center gap-3"
            >
              <Avatar url={u.avatar} name={u.name} size={12} />
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-slate-300">
                  {new Date(u.createdAt).toLocaleDateString()}{" "}
                  {new Date(u.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
