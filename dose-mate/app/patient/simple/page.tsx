import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Pill, CheckCircle, Phone, Clock, Heart } from "lucide-react"

export default function SimplePatientView() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Large Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-6xl font-bold mb-4">Hello Eleanor!</h1>
        <p className="text-3xl text-muted-foreground">Time for your medicine</p>
      </div>

      {/* Next Medication - Large Card */}
      <Card className="mb-12 border-4 border-primary bg-primary/5">
        <CardHeader className="text-center pb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Pill className="w-12 h-12 text-primary-foreground" />
          </div>
          <CardTitle className="text-5xl font-bold text-primary mb-4">Atorvastatin</CardTitle>
          <p className="text-3xl text-muted-foreground">20mg - Take now</p>
        </CardHeader>
        <CardContent className="text-center">
          <Button size="lg" className="text-3xl px-16 py-8 h-auto">
            <CheckCircle className="w-8 h-8 mr-4" />I Took My Medicine
          </Button>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="border-2">
          <CardHeader className="text-center">
            <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl text-green-600">Great Job!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">2</div>
            <p className="text-2xl text-muted-foreground">Medicines taken today</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="text-center">
            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <CardTitle className="text-3xl text-blue-600">Next Medicine</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-2">8:00 PM</div>
            <p className="text-2xl text-muted-foreground">Vitamin D</p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Button */}
      <Card className="border-4 border-red-200 bg-red-50">
        <CardContent className="p-8">
          <Button
            variant="destructive"
            size="lg"
            className="w-full text-4xl px-8 py-12 h-auto bg-red-600 hover:bg-red-700"
          >
            <Phone className="w-10 h-10 mr-6" />
            Call for Help: (555) 987-6543
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
