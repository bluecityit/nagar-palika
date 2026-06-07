export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">About Us</h1>
      
      <div className="prose prose-lg text-slate-700">
        <p className="mb-6">
          The <strong>Ajmer Municipal Corporation</strong> (Nagar Palika Ajmer) is the governing body of the city of Ajmer in Rajasthan, India. We are responsible for the civic infrastructure and administration of the city, working tirelessly to provide a better quality of life for our citizens.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our History</h2>
        <p className="mb-6">
          Ajmer has a rich historical and cultural heritage. The Municipal Corporation has evolved over the decades from a small committee to a full-fledged corporation, keeping pace with the rapid urbanization and growing needs of the population.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Core Responsibilities</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Urban planning and town development</li>
          <li>Regulation of land-use and construction of buildings</li>
          <li>Water supply for domestic, industrial, and commercial purposes</li>
          <li>Public health, sanitation, conservancy, and solid waste management</li>
          <li>Slum improvement and upgradation</li>
          <li>Provision of urban amenities and facilities such as parks, gardens, and playgrounds</li>
          <li>Burials and burial grounds, cremations, and cremation grounds</li>
          <li>Vital statistics including registration of births and deaths</li>
        </ul>

        <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-8 mt-10">
          <h3 className="text-2xl font-bold text-saffron-900 mb-6 border-b border-saffron-200 pb-4">Message from the Chairperson</h3>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="shrink-0">
              <img 
                src="/images/ajmer_chairperson_1779727306239.png" 
                alt="Chairperson of Nagar Palika Ajmer" 
                className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div>
              <p className="italic text-slate-700 text-lg leading-relaxed mb-4">
                "Our focus is on smart, sustainable, and inclusive development. We aim to leverage technology to bring governance to the fingertips of every citizen, ensuring transparency and accountability in all our operations."
              </p>
              <p className="font-bold text-saffron-900">Hon'ble Chairperson</p>
              <p className="text-sm text-saffron-700">Nagar Palika Ajmer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
