import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getStars = async () => {
  const response = await axios.get(
    'https://api.github.com/repos/facebook/react'
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return response.data.stargazers_count ?? 'データがありませんでした';
};

const FetchComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getStars'],
    queryFn: getStars,
  });

  if (isLoading) return <div>downloading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <p>ここにReactのGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{data}個のスターでした。</p>
    </div>
  );
};

export default FetchComponent;
