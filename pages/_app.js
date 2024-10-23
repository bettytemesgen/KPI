// // pages/_app.js

// import '../styles/global.css'; // Import global CSS
// import { useEffect } from 'react';
// import Head from 'next/head'; // Import Head component

// function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     // Optional: you can use this to run any JavaScript on page load
//   }, []);
  
//   return (
//     <>
//       <Head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//         <link 
//           href="https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap" 
//           rel="stylesheet" 
//         />
//       </Head>
//       <Component {...pageProps} />
//     </>
//   );
// }

// export default MyApp;
// _app.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Perform actions on route change
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Your App Title</title>
        {/* Add your meta tags, stylesheets, or scripts here */}
      </Head>
      <div id="portal-root"></div> {/* Ensure this element exists in the DOM */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
