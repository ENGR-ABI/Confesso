export default function FeatureSection() {
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-blue-600">1</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Create Your Content</h3>
          <p className="text-gray-600">Add your animated content and static elements to the container. Customize as needed.</p>
        </div>
        
        {/* Step 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-indigo-600">2</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Convert with One Click</h3>
          <p className="text-gray-600">Click the convert button to capture your container's content and convert it to a GIF file.</p>
        </div>
        
        {/* Step 3 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-green-600">3</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Download and Share</h3>
          <p className="text-gray-600">Download your generated GIF and share it anywhere. It's that simple!</p>
        </div>
      </div>
    </div>
  );
}
