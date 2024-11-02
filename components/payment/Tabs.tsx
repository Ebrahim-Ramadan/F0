import { useState } from 'react';

export  function Tabs() {
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <div className="inline-flex w-full justify-center  backdrop-blur-3xl">
      <button
        onClick={() => setActiveTab('monthly')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'monthly'
            ? 'bg-neutral-800 text-neutral-400 shadow-sm'
            : 'text-neutral-500 hover:text-neutral-400'
        }`}
      >
        Bill Monthly
      </button>
      <button
        onClick={() => setActiveTab('yearly')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'yearly'
            ? 'bg-neutral-800 text-neutral-400 shadow-sm'
            : 'text-neutral-500 hover:text-neutral-400'
        }`}
      >
        Bill Yearly
      </button>
    </div>
  );
}
export default Tabs;