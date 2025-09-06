import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Shield, Clock, Pill, CheckCircle, Phone, Wifi, WifiOff, Battery, Calendar, Heart } from "lucide-react"

export default function PatientMonitoringPage() {
  // Mock patient data
  const patient = {
    name: "Eleanor Johnson",
    age: 78,
    avatar: "/elderly-woman-knitting.png",
    deviceConnected: true,
    batteryLevel: 85,
  }

  const todaysMedications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      time: "8:00 AM",
      taken: true,
      takenAt: "8:15 AM",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      time: "12:00 PM",
      taken: true,
      takenAt: "12:05 PM",
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      time: "6:00 PM",
      taken: false,
      upcoming: true,
    },
    {
      id: 4,
      name: "Vitamin D",
      dosage: "1000 IU",
      time: "8:00 PM",
      taken: false,
      upcoming: false,
    },
  ]

  const emergencyContacts = [
    { name: "Dr. Sarah Wilson", phone: "(555) 123-4567", type: "Primary Doctor" },
    { name: "John Johnson", phone: "(555) 987-6543", type: "Son" },
    { name: "Emergency Services", phone: "911", type: "Emergency" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hello, {patient.name.split(" ")[0]}</h1>
                <p className="text-muted-foreground">Your medication companion</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {patient.deviceConnected ? (
                  <Wifi className="w-6 h-6 text-primary" />
                ) : (
                  <WifiOff className="w-6 h-6 text-destructive" />
                )}
                <Battery className="w-6 h-6 text-muted-foreground" />
                <span className="text-lg font-medium">{patient.batteryLevel}%</span>
              </div>
              <Avatar className="w-12 h-12">
                <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                <AvatarFallback>EJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Current Status Card */}
        <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">You're doing great!</CardTitle>
            <CardDescription className="text-lg">
              You've taken 2 out of 4 medications today. Next dose at 6:00 PM.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">2</div>
                <p className="text-muted-foreground">Taken Today</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-muted-foreground">2</div>
                <p className="text-muted-foreground">Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Medications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Calendar className="w-7 h-7 text-primary" />
              Today's Medications
            </CardTitle>
            <CardDescription className="text-lg">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysMedications.map((med) => (
              <div
                key={med.id}
                className={`p-6 rounded-xl border-2 transition-colors ${
                  med.taken
                    ? "bg-green-50 border-green-200"
                    : med.upcoming
                      ? "bg-blue-50 border-blue-200 border-dashed"
                      : "bg-muted border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        med.taken ? "bg-green-500" : med.upcoming ? "bg-blue-500" : "bg-muted-foreground"
                      }`}
                    >
                      {med.taken ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Pill className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{med.name}</h3>
                      <p className="text-lg text-muted-foreground">{med.dosage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{med.time}</div>
                    {med.taken && <p className="text-green-600 font-medium">Taken at {med.takenAt}</p>}
                    {med.upcoming && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-base px-3 py-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Next Up
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Shield className="w-7 h-7 text-primary" />
              Device Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <Wifi className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-green-800">Connected</p>
                <p className="text-sm text-green-600">Device is online</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                <Battery className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-blue-800">{patient.batteryLevel}% Battery</p>
                <p className="text-sm text-blue-600">Good battery level</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-primary">All Systems OK</p>
                <p className="text-sm text-primary/80">Everything working</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Phone className="w-7 h-7 text-primary" />
              Emergency Contacts
            </CardTitle>
            <CardDescription className="text-lg">Tap to call if you need help</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-auto p-6 justify-start text-left hover:bg-primary/5 hover:border-primary/50 bg-transparent"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{contact.name}</p>
                    <p className="text-muted-foreground">{contact.type}</p>
                  </div>
                  <div className="text-xl font-mono font-bold text-primary">{contact.phone}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-primary" />
              This Week's Progress
            </CardTitle>
            <CardDescription className="text-lg">You're doing excellent with your medications!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">Medication Adherence</span>
                <span className="text-2xl font-bold text-primary">92%</span>
              </div>
              <Progress value={92} className="h-3" />
              <p className="text-muted-foreground">
                You've taken 26 out of 28 scheduled medications this week. Keep up the great work!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
