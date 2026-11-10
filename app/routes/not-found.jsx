import { Link } from "react-router";

export const meta = () => [{ title: "Page not found | NumFOCUS Jobs Board" }];

export default function NotFound() {
  return (
    <>
      <p>Page not found.</p>
      Return to <Link to="/">jobs listing</Link>.
    </>
  );
}
