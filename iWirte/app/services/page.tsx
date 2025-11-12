import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 'thesis',
      title: 'Thesis & Dissertation Writing',
      description: 'Comprehensive research and writing support for your academic journey. We help you craft well-structured, thoroughly researched theses that meet academic standards.',
      features: ['In-depth Research', 'Proper Citations', 'Multiple Revisions', 'Plagiarism-Free'],
      image: 'https://picsum.photos/600/400?random=10',
    },
    {
      id: 'projects',
      title: 'Project Work & Reports',
      description: 'Professional project documentation and reports that showcase your work effectively. From technical reports to business proposals.',
      features: ['Clear Structure', 'Data Analysis', 'Visual Presentations', 'Executive Summaries'],
      image: 'https://picsum.photos/600/400?random=11',
    },
    {
      id: 'copywriting',
      title: 'Professional Copywriting',
      description: "Compelling copy that drives action. Whether it's web content, marketing materials, or brand messaging, we make your words work.",
      features: ['SEO Optimized', 'Brand Voice', 'Conversion Focused', 'Engaging Content'],
      image: 'https://picsum.photos/600/400?random=12',
    },
    {
      id: 'synopsis',
      title: 'Synopsis Writing',
      description: 'Concise, engaging summaries that capture the essence of your content. Perfect for books, research papers, or business documents.',
      features: ['Key Points Highlighted', 'Clear & Concise', 'Engaging Format', 'Quick Turnaround'],
      image: 'https://picsum.photos/600/400?random=13',
    },
    {
      id: 'fiction',
      title: 'Fiction & Creative Writing',
      description: 'Stories that transport readers to new worlds. Our creative writers craft compelling narratives with memorable characters.',
      features: ['Original Stories', 'Character Development', 'Plot Structure', 'Genre Expertise'],
      image: 'https://picsum.photos/600/400?random=14',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-maroon to-light-blue py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive writing solutions tailored to your needs. Quality, creativity, and professionalism in every word.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="text-4xl font-bold text-maroon mb-4">{service.title}</h2>
                <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <svg className="w-5 h-5 text-maroon mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-block bg-maroon text-white px-8 py-3 rounded-lg font-semibold hover:bg-maroon-light transition-all"
                >
                  Get Started
                </Link>
              </div>

              <div className={`relative h-80 rounded-xl overflow-hidden shadow-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light-blue/20 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-maroon mb-6">Custom Solutions</h2>
          <p className="text-xl text-gray-700 mb-8">
            Don&apos;t see what you&apos;re looking for? We offer custom writing solutions tailored to your specific needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-maroon text-white px-10 py-4 rounded-lg font-semibold hover:bg-maroon-light transition-all"
          >
            Discuss Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
