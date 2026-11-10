import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./global.css";

export const meta = () => [{ title: "NumFOCUS Jobs Board" }];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const Page = ({ children }) => (
  <div className="page">
    <div className="content">
      <div className="header">
        <Link to="/">
          <h1>NumFOCUS Jobs Board</h1>
        </Link>
      </div>
      {children}
    </div>
  </div>
);

export default function App() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <Page>
      <p>{notFound ? "Page not found." : "Something went wrong."}</p>
      Return to <Link to="/">jobs listing</Link>.
    </Page>
  );
}

