import type { Metadata } from 'next'

import { Check, Shield, Zap, Image, Award, Users, Fingerprint, BookImage, AudioLines } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Detector from '@/components/Detector'
import Faq from '@/components/Faq'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Footer from '@/components/Footer'


export default function Home() {


  return (
    <>
      <Navbar />
      <main className="flex flex-col pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-24 pb-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center text-center">
              <Badge variant="outline" className="mb-4">
                <span className="mr-1 text-xs font-medium text-primary">New</span> 30x Faster Detection Engine
              </Badge>
              
              <h1 className="mt-4 text-balance text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl xl:[line-height:1.1]">
                Detect Fake & Tampered <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Images</span> Instantly
              </h1>
              
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
                Our free fake image detector helps you identify forged, tampered, altered images, and photoshopped pictures with industry-leading accuracy. Perform fake image detection easily - no signup required, just upload and analyze. Your go-to image fake checker.
                </p>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/${i}.jpg`} />
                    </Avatar>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Used by <strong>10,000+</strong> people worldwide</span>
              </div>
            </div>
          </div>
          
          {/* Visual element: animated gradient blob */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-50 blur-3xl"></div>
        </section>
        
        {/* Detector Section with improved visual treatment */}
        <section id="analyze" className='bg-muted/30 py-10'>
        <div className="relative mx-auto w-full mt-9 max-w-4xl overflow-x-hidden">
          <div className="mb-10 text-center mx-5">
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Analyze Your Image - Fake Image Detection</h2>
            <p className="text-muted-foreground">Upload any suspicious image to check if it's been subject to <strong className="text-foreground">photo manipulation</strong> or forgery using our advanced <strong className="text-foreground">fake image detector</strong>.</p>
          </div>
          <Detector />
        </div>
        </section>
        
        {/* How It Works Section */}
        <section id="howitworks" className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-4">Simple Process</Badge>
            <h2 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">How Our Image Fake Checker Works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Our free tool analyzes images for signs of manipulation, like <strong className="text-foreground">photoshop manipulation</strong>, in three simple steps. Similar to <strong className="text-foreground">fotoforensics</strong> but faster and easier.</p>
          </div>

          <img 
            src="/howto.jpeg" 
            alt="How It Works" 
            className="select-none mx-auto mb-10 w-full max-w-2xl rounded-lg shadow-lg dark:hidden" 
          />
          <img 
            src="/howtodark.jpeg"
            alt="How It Works" 
            className="select-none mx-auto mb-10 w-full max-w-2xl rounded-lg shadow-lg hidden dark:block" 
          />
        </section>
        
        {/* Features Section */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-4">Advanced Technology</Badge>
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Why Choose Our Fake Image Detector</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Our state-of-the-art technology identifies manipulated, <strong className="text-foreground">altered images</strong>, and <strong className="text-foreground">photoshopped</strong> pictures with precision and speed.</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Zap className="size-10 text-primary" />,
                title: "Lightning Fast Detection",
                description: "Get results in milliseconds with our optimized <strong class='text-foreground'>fake image detection</strong> engine."
              },
              {
                icon: <Shield className="size-10 text-primary" />,
                title: "Highly Accurate",
                description: "99.7% accuracy rate in detecting <strong class='text-foreground'>photo manipulation</strong> and forgeries."
              },
              {
                icon: <Image className="size-10 text-primary" />,
                title: "Multiple Detection Methods",
                description: "Detects editing, masking, <strong class='text-foreground'>photoshop manipulation</strong>, and other tampering techniques including AI manipulation on <strong class='text-foreground'>altered images</strong>."
              },
              {
                icon: <Check className="size-10 text-primary" />,
                title: "Easy to Use",
                description: "Simple drag & drop interface with detailed analysis reports"
              },
              {
                icon: <Award className="size-10 text-primary" />,
                title: "Completely Free",
                description: "No account creation, no hidden fees, just upload and analyze"
              },
              {
                icon: <Users className="size-10 text-primary" />,
                title: "Privacy Focused",
                description: "Your images are analyzed privately and never stored on our servers"
              }
            ].map((feature, i) => (
              <Card key={i} className="border-muted/30">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Detection Techniques with Tabs */}
        <section className="mx-auto max-w-7xl px-6 pt-10">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-4">Technology</Badge>
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Our Fake Image Detection Methods</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">We employ multiple techniques, similar to <strong className="text-foreground">fotoforensics</strong>, to achieve high accuracy in forgery and <strong className="text-foreground">photo manipulation</strong> detection.</p>
          </div>
          
          <Tabs defaultValue="patterns" className="mx-auto max-w-4xl">
          <div className="relative rounded-sm overflow-x-scroll h-10 bg-muted">

            <TabsList className="absolute flex flex-row justify-stretch w-full">
              <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
              <TabsTrigger value="metadata">Metadata Inspection</TabsTrigger>
              <TabsTrigger value="noise">Noise Analysis</TabsTrigger>
            </TabsList>
        
        </div>
            <TabsContent value="patterns" className="mt-6 rounded-lg border border-muted/30 p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-2/3">
                  <h3 className="mb-2 text-xl font-semibold">Manipulation Pattern Recognition</h3>
                  <p className="mb-4 text-muted-foreground">
                    Our system analyzes subtle patterns in images that are characteristic of manipulation. These include 
                    unnatural textures, inconsistent lighting, and peculiar artifacts that human eyes might miss but our 
                    algorithms can detect.
                  </p>
                  <ul className="space-y-2">
                    {["Detects repetitive patterns", "Identifies inconsistent shadows", "Recognizes unusual textures"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="size-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-muted/20 p-4 md:w-1/3">
                  <div className="aspect-square rounded bg-muted/50">
                    <Fingerprint className='w-full h-full p-10' />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="metadata" className="mt-6 rounded-lg border border-muted/30 p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-2/3">
                  <h3 className="mb-2 text-xl font-semibold">Metadata Analysis</h3>
                  <p className="mb-4 text-muted-foreground">
                    Every photo contains hidden metadata that can reveal its origins. Our tool extracts and analyzes this 
                    data, looking for signs of manipulation or editing in the image's digital fingerprint.
                  </p>
                  <ul className="space-y-2">
                    {["EXIF data extraction", "Software signature detection", "Creation timestamp analysis"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="size-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-muted/20 p-4 md:w-1/3">
                  <div className="aspect-square rounded bg-muted/50">
                  <BookImage className="w-full h-full p-10" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="noise" className="mt-6 rounded-lg border border-muted/30 p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-2/3">
                  <h3 className="mb-2 text-xl font-semibold">Image Noise Analysis</h3>
                  <p className="mb-4 text-muted-foreground">
                    Manipulated images often have distinctive noise patterns that differ from authentic photos. Our algorithms 
                    analyze these noise signatures to identify edited and synthetic images with high precision.
                  </p>
                  <ul className="space-y-2">
                    {["Error Level Analysis (ELA)", "Noise inconsistency detection", "Frequency domain analysis"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="size-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-muted/20 p-4 md:w-1/3">
                  <div className="aspect-square rounded bg-muted/50">
                  <AudioLines className="w-full h-full p-10" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Testimonials */}
        <section className="bg-muted/30 py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-4">Community</Badge>
              <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Used and Trusted Fake Image Detector</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">See what professionals say about our <strong className="text-foreground">fake image detection</strong> technology for identifying <strong className="text-foreground">altered images</strong>.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote: "This tool has become essential in our newsroom for verifying the authenticity of images before publication.",
                  name: "Sarah Johnson",
                  role: "Senior Editor, News Daily"
                },
                {
                  quote: "As a content moderator, I've tried many tools, but this detector is by far the most accurate and fastest I've used.",
                  name: "Michael Chen",
                  role: "Content Safety Manager"
                },
                {
                  quote: "The detailed analysis helps us understand exactly why an image has been flagged as manipulated or edited.",
                  name: "Priya Patel",
                  role: "Digital Forensics Researcher"
                }
              ].map((testimonial, i) => (
                <Card key={i} className="border-muted/30">
                  <CardHeader className="gap-4">
                    <div className="text-lg italic">"{testimonial.quote}"</div>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 rounded-xl border border-muted/30 p-8 md:grid-cols-3">
            {[
              { value: "99.7%", label: "Detection Accuracy" },
              { value: "10M+", label: "Images Analyzed" },
              { value: "200ms", label: "Average Detection Time" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
        
        <Faq />
        <Footer />
      </main>
    </>
  )
}


export const metadata: Metadata = {
  title: 'Fake Image Detector Online - Detect Photoshopped & Altered Images',
  description: 'Free fake image detector to check for photoshopped, altered images, and photo manipulation. Advanced image fake checker & fotoforensics tool. Upload now!',
  keywords: ['fake image detector', 'fake image detection', 'fotoforensics', 'altered image', 'photoshopped', 'photo manipulation', 'photoshop manipulation', 'image fake checker', 'image forensics', 'image manipulation detection', 'image authentication', 'image analysis'],
  authors: [{ name: 'Ankit Chaurasiya' }], // Keep or update as needed
  alternates: {
    canonical: 'https://fakeimagedetector.online',
  },
  openGraph: {
    title: 'Fake Image Detector Online - Detect Photoshopped & Altered Images',
    description: 'Free fake image detector & image fake checker. Identify photoshopped, altered images, and photo manipulation instantly.',
    url: 'https://fakeimagedetector.online',
    siteName: 'Fake Image Detector Online', // Updated site name
    images: [
      {
        url: 'https://fakeimagedetector.online/featured.jpg', // Assuming image is hosted at the new domain root
        width: 1200,
        height: 630,
        alt: 'Fake Image Detector Online Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fake Image Detector Online - Detect Photoshopped & Altered Images',
    description: 'Check for photoshopped or altered images with this free fake image detector tool. Fast and accurate image fake checker.',
    images: ['https://fakeimagedetector.online/featured.jpg'], // Assuming image is hosted at the new domain root
  },
  icons: {
    icon: '/favicon.svg', // Keep relative path if favicon is in /public
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}