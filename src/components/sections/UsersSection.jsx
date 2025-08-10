import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { Building, Download, Globe, Loader2, Mail, MapPin, Phone, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from '../ui/Avatar';
import { Badge } from "../ui/Badge";
import Button from "../ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import { Input } from '../ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';


const UsersSection = () => {
  const [users, setUsers ] = useState([])
  const [filteredUsers, setFilteredUsers ] = useState([])
  const [searchTerm, setSearchTerm ] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError ] = useState(null)

  useEffect(() => {
    fetchUsers()
  },[])

  useEffect(()=>{
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
    setFilteredUsers(filtered)
  },[users, searchTerm])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("https://jsonplaceholder.typicode.com/users")

      if(!response.ok){
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    } catch (error) {
      console.error("Error fetching users:",error);
      setError("Failed to lod users. Please try again")
    }
    finally{
      setLoading(false)
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.setTextColor(40,40,40)
    doc.text("User Directory Report",20,20)

    doc.setFontSize(12)
    doc.setTextColor(100,100,100)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`,20,35)
    doc.text(`Total Users: ${filteredUsers.length}`,20,45)

    const tableData = filteredUsers.map(user => [
      user.name,
      user.email,
      user.phone.split(' ')[0],
      user.company.name,
      user.address.city,
      user.website
    ])

    autoTable(doc,{
      head: [['Name','Email','Phone','Company','City','Website']],
      body: tableData,
      startY: 55,
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'left'
      },
      headStyles: {
         fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 35 },
        4: { cellWidth: 20 },
        5: { cellWidth: 30 }
      }
    })

    doc.save(`users-directory-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if(loading){
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6" >
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if(error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchUsers}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4" >
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" >
            <div className="text-2xl font-bold">
              {new Set(users.map(u => u.address.city)).size}
            </div>
            <p className="text-sm text-muted-foreground">Cities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" >
            <div className="text-2xl font-bold">
              {new Set(users.map(u => u.company.name)).size}
            </div>
            <p className="text-sm text-muted-foreground">Companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" >
            <div className="text-2xl font-bold">
              {filteredUsers.length}
            </div>
            <p className="text-sm text-muted-foreground">Filtered Results</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Comprehensive user management system with search and export capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input 
                placeholder = "Search by name, company, city, email, or username ..."
                value = {searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={downloadPDF}
              className="flex items-center gap-2"
              disabled={filteredUsers.length===0}
            >
              <Download className='h-4 w-4'/>
              Export PDF
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden sm:table-cell">Company</TableHead>
                  <TableHead className="hidden sm:table-cell">Location</TableHead>
                  <TableHead className="hidden lg:table-cell">Website</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-medium" >
                             {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                          <div className="md:hidden text-sm text-muted-foreground mt-1">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell" >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className='h-3 w-3 text-muted-foreground'/>
                          <span className='truncate'>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className='h-3 w-3 text-muted-foreground'/>
                          <span>{user.phone.split(' ')[0]}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Building className='h-4 w-4 text-muted-foreground' />
                          {user.company.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.company.catchPhrase}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <MapPin className='h-4 w-4 text-muted-foreground'/>
                        <Badge variant="secondary" >{user.address.city}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {user.address.zipcode}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell" >
                      <div className="flex items-center gap-2">
                        <Globe className='h-4 w-4 text-muted-foreground' />
                        <a 
                          href={`http://${user.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {user.website}
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <Search className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
              <p className='text-muted-foreground'>No users found matching "{searchTerm}"</p>
              <p className='text-sm text-muted-foreground mt-1'>Try adjusting your search terms</p>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {filteredUsers.length} of {users.length} users</span>
            {searchTerm && (
              <Button 
                variant = "ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UsersSection