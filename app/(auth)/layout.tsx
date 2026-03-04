export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF5E8] via-white to-[#FAF5E8] flex items-center justify-center p-4">
      {children}
    </div>
  )
}
