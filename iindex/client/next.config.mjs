const nextConfig = {
    images: {
        remotePatterns: [
            {
                port: "",
                protocol: "https",
                pathname: "/t/p/**",
                hostname: "image.tmdb.org",
            }
        ]
    }
}

export default nextConfig