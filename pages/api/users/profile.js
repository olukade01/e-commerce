import axios from 'axios';
import nc from 'next-connect';
import { signToken, isAuth } from '../../../lib/auth';

const handler = nc();

handler.use(isAuth);
handler.put(async (req, res) => {
  const tokenWithWriteAccess =
    'sksL4WviOaerW8GOM59MVENpi7uu4pHNv1sLdIaalQFwMX1oA4pzc49oUi34cJ1xodx2xksR5bP11tARSlNlYLIjfNvVZABARLKdp2V1gTzNAC5b9M6AX0FdeWExOkNvTriUGylLN42TFkBAoC06XW37S2cypdj1ilF8cUQyagbF1YqAgSva';
  await axios.post(
    `https://gdnfh238.api.sanity.io/v1/data/mutate/production`,
    {
      mutations: [
        {
          patch: {
            id: req.user._id,
            set: {
              name: req.body.name,
              email: req.body.email,
            },
          },
        },
      ],
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );

  const user = {
    _id: req.user._id,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };
  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
