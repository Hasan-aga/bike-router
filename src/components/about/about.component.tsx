import "./about.style.scss";
export default function About() {
  return (
    <div className="about">
      <h1>Welcome to this app</h1>
      <p>
        {" "}
        This app was designed by <a href="http://blog.hasan.one/">Hasan Aga</a>
      </p>
      <span />
      <p>
        View our <a href="/policy">privacy policy</a>
      </p>
    </div>
  );
}
