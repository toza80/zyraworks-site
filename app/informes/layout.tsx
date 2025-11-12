import Script from "next/script";

export default function InformesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Tailwind SOLO para /informes */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script id="noindex" strategy="beforeInteractive">
        {`(function(){var m=document.createElement('meta');m.name='robots';m.content='noindex,nofollow,noarchive';document.head.appendChild(m);}())`}
      </Script>
      {children}
    </>
  );
}
