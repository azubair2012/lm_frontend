'use client';

import { useEffect, useState } from 'react';
import { CONTENT_REGISTRY } from '@/lib/content-registry';

export default function ServicesPage() {
  const [servicesPageBody, setServicesPageBody] = useState(
    CONTENT_REGISTRY.servicesPageBody.defaultValue
  );

  useEffect(() => {
    const loadEditableContent = async () => {
      try {
        const response = await fetch(
          `/api/content?keys=${encodeURIComponent(CONTENT_REGISTRY.servicesPageBody.key)}`
        );
        const payload = (await response.json()) as {
          success: boolean;
          data?: Array<{ key: string; value: string }>;
        };
        if (!response.ok || !payload.success || !payload.data) {
          return;
        }

        const entry = payload.data.find(
          (item) => item.key === CONTENT_REGISTRY.servicesPageBody.key
        );
        if (entry?.value?.trim()) {
          setServicesPageBody(entry.value.trim());
        }
      } catch (error) {
        console.error('Error loading services editable content:', error);
      }
    };

    loadEditableContent();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <section className="mx-auto">
        <div className="absolute inset-0 -z-10 opacity-50 hidden md:block" style={{
        backgroundImage: "url('/bg1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
          
        </div>
        {/* Heading */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex flex-col md:mt-16 mt-6 md:items-end">
            <span
              className="text-[48px] sm:text-[64px] text-black uppercase md:text-[90px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
            >
              Services
            </span>
            <span
              className="absolute text-[48px] md:top-[85px] top-8 text-[#B87333] md:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              We Provide
            </span>
          </div>
        </div>

        <div
          className="mx-auto mt-10 px-4 flex max-w-4xl flex-col gap-8 text-sm text-[#383E42] sm:text-base text-center md:text-start [&_section]:flex [&_section]:flex-col [&_section]:gap-3 [&_h2]:m-0 [&_h2]:mb-1 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:text-[#111518] [&_h3]:m-0 [&_h3]:font-semibold [&_h3]:text-[#111518] [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-start [&_p]:m-0 [&_p]:text-start"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
          dangerouslySetInnerHTML={{ __html: servicesPageBody }}
        >
        </div>
      </section>
    </main>
  );
}
