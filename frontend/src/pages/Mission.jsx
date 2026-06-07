import { Target, Compass } from 'lucide-react';

export default function Mission() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Mission & Vision</h1>
          <p className="text-slate-600 text-lg">Guiding principles of the Ajmer Municipal Corporation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="h-3 bg-saffron-500"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-saffron-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-saffron-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-saffron-500 mt-2 shrink-0"></span>
                  <p>To provide efficient, effective, and equitable civic services to all residents of Ajmer.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-saffron-500 mt-2 shrink-0"></span>
                  <p>To ensure sustainable urban development through participatory planning and resource mobilization.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-saffron-500 mt-2 shrink-0"></span>
                  <p>To promote cleanliness, greenery, and public health initiatives aligned with national missions.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-saffron-500 mt-2 shrink-0"></span>
                  <p>To adopt modern technology for transparent e-governance and swift grievance redressal.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="h-3 bg-blue-500"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Compass className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
                "To transform Ajmer into a world-class smart city that is clean, green, economically vibrant, and culturally rich, offering a high quality of life to all its citizens."
              </p>
              <p className="text-slate-600">
                We envision a future where urban infrastructure is resilient, governance is citizen-centric, and the heritage of Ajmer is preserved while embracing modern innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
