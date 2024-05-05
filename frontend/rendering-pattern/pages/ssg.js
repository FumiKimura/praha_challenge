export async function getStaticProps(context) {
  const res = await fetch('https://api.github.com/repos/facebook/react');
  const repo = await res.json();
  return { props: { repo } };
}

export default function SSG({ repo }) {
  return (
    <div>
      <h3>Welcome to Next.js 12.3!</h3>
      <div>
        <p>{repo.stargazers_count}</p>
      </div>
    </div>
  );
}
