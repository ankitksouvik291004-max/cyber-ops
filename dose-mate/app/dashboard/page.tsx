import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Plus,
  Calendar,
  Pill,
  Shield,
  TrendingUp,
  Phone,
  Mail,
} from "lucide-react"

export default function CaregiverDashboard() {
  // Mock data for demonstration
  const patients = [
    {
      id: 1,
      name: "Eleanor Johnson",
      age: 78,
      avatar: "/elderly-woman-knitting.png",
      adherence: 92,
      status: "good",
      lastDose: "2 hours ago",
      nextDose: "6:00 PM",
      medications: 4,
      alerts: 0,
    },
    {
      id: 2,
      name: "Robert Chen",
      age: 65,
      avatar: "/elderly-man-contemplative.png",
      adherence: 78,
      status: "warning",
      lastDose: "8 hours ago",
      nextDose: "Overdue",
      medications: 6,
      alerts: 2,
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      age: 82,
      avatar: "/elderly-woman-hispanic.jpg",
      adherence: 96,
      status: "excellent",
      lastDose: "30 minutes ago",
      nextDose: "Tomorrow 8:00 AM",
      medications: 3,
      alerts: 0,
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      patient: "Robert Chen",
      type: "missed_dose",
      medication: "Metformin 500mg",
      time: "2 hours ago",
      severity: "high",
    },
    {
      id: 2,
      patient: "Eleanor Johnson",
      type: "low_stock",
      medication: "Lisinopril 10mg",
      time: "4 hours ago",
      severity: "medium",
    },
    {
      id: 3,
      patient: "Robert Chen",
      type: "device_offline",
      medication: "Device disconnected",
      time: "6 hours ago",
      severity: "high",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Dose Mate</h1>
              <p className="text-xs text-muted-foreground">Caregiver Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Alerts (3)
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/caregiver.png" />
              <AvatarFallback>CG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Adherence</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">89%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doses Today</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12/15</div>
              <p className="text-xs text-muted-foreground">80% completion rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Patient Overview</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>

            <div className="grid gap-6">
              {patients.map((patient) => (
                <Card key={patient.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{patient.name}</CardTitle>
                          <CardDescription>
                            Age {patient.age} • {patient.medications} medications
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {patient.status === "excellent" && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Excellent
                          </Badge>
                        )}
                        {patient.status === "good" && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Good
                          </Badge>
                        )}
                        {patient.status === "warning" && (
                          <Badge variant="destructive">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Attention Needed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Adherence Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={patient.adherence} className="flex-1" />
                          <span className="text-sm font-medium">{patient.adherence}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Last Dose</p>
                        <p className="text-sm text-muted-foreground">{patient.lastDose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Next Dose</p>
                        <p
                          className={`text-sm ${patient.nextDose === "Overdue" ? "text-destructive font-medium" : "text-muted-foreground"}`}
                        >
                          {patient.nextDose}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Alerts</h2>
              <Button variant="outline">Mark All Read</Button>
            </div>

            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-destructive">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            alert.severity === "high" ? "bg-destructive/10" : "bg-yellow-100"
                          }`}
                        >
                          {alert.type === "missed_dose" && <XCircle className="w-5 h-5 text-destructive" />}
                          {alert.type === "low_stock" && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                          {alert.type === "device_offline" && <AlertTriangle className="w-5 h-5 text-destructive" />}
                        </div>
                        <div>
                          <p className="font-medium">{alert.patient}</p>
                          <p className="text-sm text-muted-foreground">{alert.medication}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                        <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Adherence Trends
                  </CardTitle>
                  <CardDescription>Weekly medication adherence rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    [Adherence Chart Placeholder]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medication Distribution</CardTitle>
                  <CardDescription>Most common medications across patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Metformin</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20" />
                        <span className="text-sm">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lisinopril</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-20" />
                        <span className="text-sm">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Atorvastatin</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard Settings</h2>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive alerts and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-muted-foreground">Urgent notifications via SMS</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Browser notifications</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Management</CardTitle>
                  <CardDescription>Manage connected Dose Mate devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Device #DM001</p>
                        <p className="text-sm text-muted-foreground">Eleanor Johnson's device</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Device #DM002</p>
                        <p className="text-sm text-muted-foreground">Robert Chen's device</p>
                      </div>
                      <Badge variant="destructive">Offline</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
