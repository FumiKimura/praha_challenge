export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/facebook/react');
  const repo = await res.json();
  // Pass data to the page via props
  return { props: { repo } };
};

export default function SSR({ repo }) {
  return (
    <div>
      <h3>Welcome to Next.js 12.3!</h3>
      <div>
        <p>{repo.stargazers_count}</p>
      </div>
    </div>
  );
}
