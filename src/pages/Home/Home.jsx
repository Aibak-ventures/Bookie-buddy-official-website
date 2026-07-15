import { useEffect } from 'react';

const OG_IMAGE = 'https://i.postimg.cc/wvh88twP/Group-12.png';

const Home = () => {
  useEffect(() => {
    const setMeta = (property, content, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let tag = document.querySelector(`meta[${attr}="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
      return tag;
    };

    const tags = [
      setMeta('og:image', OG_IMAGE),
      setMeta('og:image:width', '1200'),
      setMeta('og:image:height', '627'),
      setMeta('twitter:image', OG_IMAGE, true),
    ];

    return () => tags.forEach((t) => t?.remove());
  }, []);

  return (
    <iframe
      src="/home/index.html"
      title="BookieBuddy"
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
    />
  );
};

export default Home;
