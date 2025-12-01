import projectDholera from '@/assets/project-dholera.jpg';
import projectItcNarmada from '@/assets/project-itc-narmada.jpg';
import projectSayaji from '@/assets/project-sayaji.jpg';
import projectReliance from '@/assets/project-reliance.jpg';
import projectVillas from '@/assets/project-villas.jpg';
import projectFarmhouse from '@/assets/project-farmhouse.jpg';

const projects = [
  {
    name: 'Dholera Smart City',
    client: 'L&T Construction',
    image: projectDholera,
  },
  {
    name: 'ITC Narmada Hotel',
    client: 'Ahmedabad',
    image: projectItcNarmada,
  },
  {
    name: 'Sayaji Hotel',
    client: 'Vadodara',
    image: projectSayaji,
  },
  {
    name: 'Reliance Corporate Park',
    client: 'Ahmedabad',
    image: projectReliance,
  },
  {
    name: 'Luxury Villa Projects',
    client: '50+ Completed',
    image: projectVillas,
  },
  {
    name: 'Premium Farmhouses',
    client: 'Across Gujarat',
    image: projectFarmhouse,
  },
];

const TrustedProjects = () => {
  return (
    <section className="py-24 bg-charcoal text-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <p className="text-primary font-medium tracking-widest text-sm mb-3">OUR WORK</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Trusted by Leading Projects
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Our premium SS & glass railings grace Gujarat's finest hotels, commercial spaces, and luxury residences
          </p>
        </div>
      </div>

      {/* Scrolling Gallery */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left">
          {[...projects, ...projects].map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 group"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-white mb-0.5">
                    {project.name}
                  </h3>
                  <p className="text-white/60 text-sm">{project.client}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedProjects;
