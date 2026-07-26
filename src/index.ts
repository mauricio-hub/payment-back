import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Error handler must be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
