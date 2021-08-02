import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';
import { userService } from 'services';
import { Nav } from 'components';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // run auth check on initial load
        authCheck(router.asPath);

        // run auth check on route change
        router.events.on('routeChangeComplete', authCheck)
        return () => router.events.off('routeChangeComplete', authCheck);
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Next.js 11 - JWT Authentication Example</title>

                {/* bootstrap css */}
                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            </Head>

            <div className="app-container bg-light">
                {authorized &&
                    <>
                        <Nav />
                        <div className="container pt-4 pb-4">
                            <Component {...pageProps} />
                        </div>
                    </>
                }
            </div>

            {/* credits */}
            <div className="text-center mt-4">
                <p>
                    <a href="https://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                </p>
            </div>
        </>
    );
}
