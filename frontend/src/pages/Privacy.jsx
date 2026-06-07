export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
        <p>
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <p>
          The Ajmer Municipal Corporation ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Important Information and Who We Are</h2>
        <p>
          This website is the official portal of the Nagar Palika Ajmer. It is designed to provide information about our services, public tenders, and allow citizens to verify certificates digitally.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. The Data We Collect About You</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier when you interact with our services.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers (if provided for grievances or queries).</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          <li><strong>Verification Data:</strong> includes certificate registration numbers and dates of birth/death entered solely for verification purposes. This data is not stored by the frontend during verification.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. Data entered for certificate verification is transmitted securely to our servers.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Contact Details</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
          <br /><br />
          <strong>Email:</strong> privacy@ajmermunicipal.in<br />
          <strong>Address:</strong> Nagar Palika Office, Main City Center, Ajmer, Rajasthan 305001
        </p>
      </div>
    </div>
  );
}
