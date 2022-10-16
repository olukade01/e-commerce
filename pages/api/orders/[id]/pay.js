import axios from 'axios';
import nc from 'next-connect';
import { isAuth } from '../../../../lib/auth';

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
            id: req.query.id,
            set: {
              isPaid: true,
              paidAt: new Date().toISOString(),
              'paymentResult.id': req.body.id,
              'paymentResult.status': req.body.email_address,
              'paymentResult.email_address': req.body.id,
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

  res.send({ message: 'order paid' });
});

export default handler;
