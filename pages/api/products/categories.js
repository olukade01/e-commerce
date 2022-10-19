import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['Shirts', 'Speakers', 'Headphones', 'Wrist Watch'];
  res.send(categories);
});

export default handler;
