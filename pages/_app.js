import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex min-h-screen min-w-full justify-center bg-splash bg-no-repeat bg-cover">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
