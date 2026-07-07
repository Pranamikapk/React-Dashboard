import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { AlertTriangle, Building2, Download, Globe, Loader2, Mail, MapPin, Phone, Search, Users as UsersIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Avatar, AvatarFallback } from '../ui/Avatar'
import Button from "../ui/Button"
import { Input } from '../ui/Input'
import PageHeader from "../dashboard/PageHeader"
import StatsCard from "../dashboard/StatsCard"

const AVATAR_PALETTE = [
  "bg-blue-500/10 text-blue-600",
  "bg-purple-500/10 text-purple-600",
  "bg-emerald-500/10 text-emerald-600",
  "bg-amber-500/10 text-amber-600",
  "bg-rose-500/10 text-rose-600",
  "bg-cyan-500/10 text-cyan-600",
]

const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase()
const getAvatarStyle = (name) => AVATAR_PALETTE[name.charCodeAt(0) % AVATAR_PALETTE.length]

const UsersSection = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users. Please try again")
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.company.name.toLowerCase().includes(term) ||
      user.address.city.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.setTextColor(40, 40, 40)
    doc.text("User Directory Report", 20, 20)
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)
    doc.text(`Total Users: ${filteredUsers.length}`, 20, 45)

    const tableData = filteredUsers.map(user => [
      user.name, user.email, user.phone.split(' ')[0], user.company.name, user.address.city, user.website
    ])

    autoTable(doc, {
      head: [['Name', 'Email', 'Phone', 'Company', 'City', 'Website']],
      body: tableData,
      startY: 55,
      styles: { fontSize: 9, cellPadding: 3, overflow: 'linebreak', halign: 'left' },
      headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 40 }, 2: { cellWidth: 25 }, 3: { cellWidth: 35 }, 4: { cellWidth: 20 }, 5: { cellWidth: 30 } }
    })

    doc.save(`users-directory-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-red-500" />
          <p className="mb-4 font-medium text-red-600">{error}</p>
          <Button onClick={fetchUsers}>Try Again</Button>
        </div>
      </div>
    )
  }

  const stats = [
    { title: "Total Users", value: users.length, icon: UsersIcon, accent: "blue" },
    { title: "Cities", value: new Set(users.map(u => u.address.city)).size, icon: MapPin, accent: "purple" },
    { title: "Companies", value: new Set(users.map(u => u.company.name)).size, icon: Building2, accent: "amber" },
    { title: "Showing", value: filteredUsers.length, icon: Search, accent: "emerald" },
  ]

  return (
    <div className="space-y-8">
      <style>{`
        @keyframes dashboardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-fade-in {
          opacity: 0;
          animation: dashboardFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <PageHeader
        title="Users"
        subtitle="Browse, search, and export your user directory."
        actions={
          <Button onClick={downloadPDF} disabled={filteredUsers.length === 0} className="gap-2 shadow-sm">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} delay={index * 60} />
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm shadow-black/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, company, city, email, or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredUsers.length} visible users
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user, index) => (
          <div
            key={user.id}
            className="dashboard-fade-in group rounded-2xl border border-border/60 bg-card p-5 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-lg hover:shadow-black/10"
            style={{ animationDelay: `${index * 35}ms` }}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-11 w-11">
                <AvatarFallback className={`font-semibold ${getAvatarStyle(user.name)}`}>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold leading-tight">{user.name}</div>
                <div className="truncate text-sm text-muted-foreground">@{user.username}</div>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{user.phone.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{user.company.name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{user.address.city}</span>
              </div>
            </div>

            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-200 hover:underline group-hover:opacity-100"
            >
              <Globe className="h-3.5 w-3.5" />
              {user.website}
            </a>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && searchTerm && (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/70 py-16 text-center shadow-sm shadow-black/5">
          <Search className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-muted-foreground">No users found matching "{searchTerm}"</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search terms</p>
          <Button variant="ghost" size="sm" className="mt-3" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}

export default UsersSection