import { usePageMeta } from '../../hooks/usePageMeta';

const OG_IMAGE = 'https://i.postimg.cc/wvh88twP/Group-12.png';

const Home = () => {
  usePageMeta({ image: OG_IMAGE });

  return (
    <iframe
      src="/home/index.html"
      title="BookieBuddy"
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
    />
  );
};

export default Home;
