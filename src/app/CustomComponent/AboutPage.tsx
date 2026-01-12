import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To revolutionize the real estate experience by providing exceptional service, innovative technology, and personalized solutions for every client.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the most trusted and innovative real estate platform, empowering people to achieve their property dreams with confidence and ease.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Integrity, transparency, and client satisfaction are at the core of everything we do. We build lasting relationships based on trust and results.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "15+ years of real estate experience",
    },
    {
      name: "Michael Chen",
      role: "Head of Sales",
      bio: "Top-performing agent for 5 consecutive years",
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      bio: "Expert in commercial and residential properties",
    },
    {
      name: "David Thompson",
      role: "Senior Agent",
      bio: "Specializing in luxury real estate",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">About EstateHub</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property. We combine cutting-edge technology
            with personalized service to deliver exceptional real estate experiences.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl mb-2">1,000+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl mb-2">15+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl mb-2">$2B+</h3>
              <p className="text-gray-600">Property Value</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">What Drives Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence and innovation sets us apart in the real estate industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-700 space-y-4">
              <p>
                Founded in 2009, EstateHub began with a simple mission: to make real estate
                transactions easier, more transparent, and more successful for everyone involved. What
                started as a small local agency has grown into one of the most trusted names in real
                estate.
              </p>
              <p>
                Over the years, we&apos;ve helped thousands of families find their dream homes, investors
                discover lucrative opportunities, and sellers achieve record-breaking sales. Our success
                is built on a foundation of integrity, expertise, and an unwavering commitment to our
                clients.
              </p>
              <p>
                Today, EstateHub combines traditional real estate expertise with cutting-edge
                technology to provide a seamless experience from search to sale. Our team of dedicated
                professionals brings together decades of combined experience, ensuring that every
                transaction is handled with the utmost care and professionalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to helping you achieve your real estate goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-linear-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
