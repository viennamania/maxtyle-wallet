/** @type {import('next').NextConfig} */


/*
Error: Invalid src prop (/logo-mkc.png.png) on `next/image`, hostname "cryptologos.cc" is not configured under images in your `next.config.js`
*/

const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  images: {
    domains: [
      "cryptologos.cc",
      "vzrcy5vcsuuocnf3.public.blob.vercel-storage.com",
      "9qpodunbvkfhds59.public.blob.vercel-storage.com",

      "fal.media",
      "owinwallet.com",
      "res.cloudinary.com",

      "replicate.delivery",
      "replicate.com",
 
      "t0gqytzvlsa2lapo.public.blob.vercel-storage.com",

    ],
  },



  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['grammy'],
  },



  async redirects() {
    return [
      {
        source: '/',
        destination: '/ko/bsc',
        permanent: true,
      },
    ]
  },



  /*
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            //value: 'https://gpgpu-lac.vercel.app', // Allow requests from this origin
            
            //value: '*', // Allow requests from this origin
            //https://vienna-mania.vercel.app, http://localhost:3000

            ///value: 'https://vienna-mania.vercel.app, http://localhost:3000', // Allow requests from this origin

            value: 'https://vienna-mania.vercel.app', // Allow requests from this origin




          },
       
        ],
      },
    ];
  },
  */
  

  
};

export default nextConfig;
