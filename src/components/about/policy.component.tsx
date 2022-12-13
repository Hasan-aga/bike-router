import { useEffect, useState } from "react";
import "./policy.style.scss";
import policy from "./policy.md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
export default function Policy() {
  const [post, setPost] = useState<string>();
  useEffect(() => {
    fetch(policy)
      .then((res) => res.text())
      .then((res) => setPost(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="policy">
      {post && <ReactMarkdown>{post}</ReactMarkdown>}
    </div>
  );
}
