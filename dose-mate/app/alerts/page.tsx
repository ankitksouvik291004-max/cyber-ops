"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Smartphone,
  Shield,
  XCircle,
  WifiOff,
  Settings,
} from "lucide-react"

export default function AlertsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: true,
    missedDose: true,
    deviceOffline: true,
    lowStock: true,
    overdose: true,
  })

  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: "missed_dose",
      severity: "high",
      patient: "Robert Chen",
      patientId: "2",
      medication: "Metformin 500mg",
      time: "2 minutes ago",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      message: "Missed scheduled dose at 2:00 PM",
      status: "unread",
      actions: ["Call Patient", "Send Reminder", "Mark Resolved"],
    },
    {
      id: 2,
      type: "device_offline",
      severity: "high",
      patient: "Robert Chen",
      patientId: "2",
      medication: "Device disconnected",
      time: "15 minutes ago",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      message: "Smart medicine box went offline",
      status: "unread",
      actions: ["Check Connection", "Call Patient", "Mark Resolved"],
    },
    {
      id: 3,
      type: "low_stock",
      severity: "medium",
      patient: "Eleanor Johnson",
      patientId: "1",
      medication: "Lisinopril 10mg",
      time: "1 hour ago",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      message: "Only 3 pills remaining",
      status: "read",
      actions: ["Order Refill", "Contact Pharmacy", "Mark Resolved"],
    },
    {
      id: 4,
      type: "dose_taken",
      severity: "info",
      patient: "Maria Rodriguez",
      patientId: "3",
      medication: "Vitamin D 1000 IU",
      time: "2 hours ago",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      message: "Successfully taken on schedule",
      status: "read",
      actions: ["View Details"],
    },
    {
      id: 5,
      type: "overdose_warning",
      severity: "critical",
      patient: "Eleanor Johnson",
      patientId: "1",
      medication: "Lisinopril 10mg",
      time: "3 hours ago",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      message: "Attempted to take medication too early",
      status: "resolved",
      actions: ["View Timeline", "Contact Doctor"],
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "missed_dose":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "device_offline":
        return <WifiOff className="w-5 h-5 text-red-500" />
      case "low_stock":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "dose_taken":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "overdose_warning":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-red-50 text-red-700 border-red-100"
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-100"
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "unread") return alert.status === "unread"
    if (selectedFilter === "high") return alert.severity === "high" || alert.severity === "critical"
    return alert.severity === selectedFilter
  })

  const unreadCount = alerts.filter((alert) => alert.status === "unread").length
  const highPriorityCount = alerts.filter((alert) => alert.severity === "high" || alert.severity === "critical").length

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
              <h1 className="text-lg font-bold">Alerts & Notifications</h1>
              <p className="text-xs text-muted-foreground">Real-time monitoring and alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="px-3 py-1">
              {unreadCount} Unread
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
              <p className="text-xs text-muted-foreground">Critical alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">2.3m</div>
              <p className="text-xs text-muted-foreground">Average response</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          </TabsList>

          {/* Active Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Alerts</h2>
              <div className="flex items-center gap-3">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Alerts</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Mark All Read</Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 transition-colors ${
                    alert.severity === "critical"
                      ? "border-l-red-600 bg-red-50/50"
                      : alert.severity === "high"
                        ? "border-l-red-400 bg-red-50/30"
                        : alert.severity === "medium"
                          ? "border-l-yellow-400 bg-yellow-50/30"
                          : "border-l-blue-400 bg-blue-50/30"
                  } ${alert.status === "unread" ? "shadow-md" : ""}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{alert.patient}</h3>
                            <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                            {alert.status === "unread" && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{alert.medication}</p>
                          <p className="font-medium mb-3">{alert.message}</p>
                          <div className="flex flex-wrap gap-2">
                            {alert.actions.map((action, index) => (
                              <Button key={index} variant="outline" size="sm" className="bg-transparent">
                                {action}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alert History Tab */}
          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold">Alert History</h2>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>All alerts from the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts
                    .filter((alert) => alert.status === "resolved")
                    .map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getAlertIcon(alert.type)}
                          <div>
                            <p className="font-medium">{alert.patient}</p>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{alert.time}</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Resolved
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Notification Settings</h2>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Choose how you want to receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, email: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">SMS Alerts</p>
                        <p className="text-sm text-muted-foreground">Critical alerts via text message</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.sms}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, sms: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Browser notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.push}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, push: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Types</CardTitle>
                  <CardDescription>Configure which types of alerts you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">Missed Dose Alerts</p>
                        <p className="text-sm text-muted-foreground">When patients miss scheduled medications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.missedDose}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, missedDose: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <WifiOff className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">Device Offline</p>
                        <p className="text-sm text-muted-foreground">When smart medicine boxes go offline</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.deviceOffline}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, deviceOffline: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Low Stock Warnings</p>
                        <p className="text-sm text-muted-foreground">When medication supplies are running low</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.lowStock}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, lowStock: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">Overdose Prevention</p>
                        <p className="text-sm text-muted-foreground">
                          When patients attempt to take medication too early
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.overdose}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, overdose: checked })
                      }
                    />
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
