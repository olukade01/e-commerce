import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { signToken } from '../../../lib/auth';
import { client } from '../../../lib/client';

const handler = nc();

handler.post(async (req, res) => {
  const projectId = 'gdnfh238';
  const dataset = 'production';
  const tokenWithWriteAccess = process.env.SANITY_TOKEN;
  const createMutations = [
    {
      create: {
        _type: 'user',
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
      },
    },
  ];
  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (existUser) {
    return res.status(401).send({ message: 'Email aleardy exists' });
  }
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  console.log(data);
  const userId = data.results[0].id;
  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };
  console.log(user);
  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
