export default function Card({ children, className = '' }) {
    return (
        <div className={`p-5 rounded-2xl bg-white/5 border border-white/10 shadow-sm ${className}`}>
            {children}
        </div>
    )
}